from flask import Flask, request, jsonify, render_template, send_file
from flask_cors import CORS
from yoruba_proverb_quiz_service import parse_proverbs, generate_quiz, check_answer, QuizType, get_grade, call_llm
import uuid
import random
import csv
import json
from typing import List, Dict
from datetime import datetime
import sys
import io
import logging
import os

# Ensure UTF-8 output for terminal
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for API routes
app.config['JSON_AS_ASCII'] = False  # Prevent Unicode escaping in JSON responses
proverbs = parse_proverbs('extracted_div_texts_modded.txt')
quiz_storage = {}

def match_proverb_to_scenario(scenario: str, proverbs: List[Dict[str, str]]) -> Dict[str, str]:
    """
    Match a user-provided scenario to the most relevant proverb based on wisdom.
    """
    # Revised prompt to return only JSON
    prompt = f"""
    You are an expert in Yoruba proverbs and their meanings. Your task is to match a user-provided scenario to the most relevant Yoruba proverb based on its wisdom.

    Scenario: "{scenario}"

    Below is a list of Yoruba proverbs with their wisdom:
    {json.dumps([{ 'proverb': p['proverb'], 'wisdom': p['wisdom'], 'translation': p.get('translation', 'N/A')} for p in proverbs], indent=2, ensure_ascii=False)}

    Steps:
    1. Analyze the scenario and identify its core theme or lesson (e.g., generosity, betrayal, caution).
    2. Compare the scenario's theme to the wisdom of each proverb.
    3. Select the proverb whose wisdom most closely aligns with the scenario's lesson.
    4. Return ONLY the JSON object with the fields: 'proverb', 'translation', and 'wisdom'. Do not include any explanatory text, comments, or additional formatting.

    Example output:
    {{"proverb": "sample proverb", "translation": "sample translation", "wisdom": "sample wisdom"}}
    """
    logger.info(f"Calling LLM with scenario: {scenario}")
    llm_response = call_llm(prompt)
    logger.info(f"LLM response: {llm_response}")

    # Clean the LLM response by removing Markdown formatting and extra text
    cleaned_response = llm_response.strip()
    if cleaned_response.startswith('```json'):
        cleaned_response = cleaned_response[len('```json'):].lstrip()
    if cleaned_response.endswith('```'):
        cleaned_response = cleaned_response[:-len('```')].rstrip()
    # Remove any leading/trailing text before and after JSON
    start_idx = cleaned_response.find('{')
    end_idx = cleaned_response.rfind('}') + 1
    if start_idx != -1 and end_idx != -1:
        cleaned_response = cleaned_response[start_idx:end_idx]

    try:
        result = json.loads(cleaned_response)
        llm_proverb = result.get('proverb', '').strip().strip('"')  # Normalize: strip quotes and whitespace
        logger.info(f"LLM selected proverb: {llm_proverb}")
        for proverb in proverbs:
            db_proverb = proverb['proverb'].strip()  # Normalize database proverb
            logger.debug(f"Comparing LLM proverb '{llm_proverb}' with database proverb '{db_proverb}'")
            if llm_proverb == db_proverb:
                logger.info(f"Matched proverb via LLM: {proverb['proverb']}")
                return {
                    'proverb': proverb['proverb'],
                    'translation': proverb.get('translation', 'N/A'),
                    'wisdom': proverb['wisdom']
                }
        # If no match is found, return the LLM's proverb with its translation and wisdom
        logger.warning(f"No exact match found for LLM proverb '{llm_proverb}' in database")
        return {
            'proverb': llm_proverb,
            'translation': result.get('translation', 'N/A'),
            'wisdom': result.get('wisdom', 'N/A')
        }
    except json.JSONDecodeError as e:
        logger.error(f"LLM response JSON parsing failed: {e}, cleaned response: {cleaned_response}")
        # Fallback to keyword matching with weighted scoring
        scenario_words = scenario.lower().split()
        best_match = None
        best_score = 0

        for proverb in proverbs:
            wisdom = proverb['wisdom'].lower()
            # Count how many scenario words appear in the wisdom
            matches = sum(1 for word in scenario_words if word in wisdom)
            # Add a small bonus for longer matches to prioritize more specific wisdom
            score = matches + (len(wisdom.split()) * 0.1)
            if score > best_score:
                best_score = score
                best_match = proverb

        if best_match:
            logger.info(f"Fallback matched proverb: {best_match['proverb']} with score: {best_score}")
            return {
                'proverb': best_match['proverb'],
                'translation': best_match.get('translation', 'N/A'),
                'wisdom': best_match['wisdom']
            }
        else:
            # Last resort: random choice (avoid repeated selection by shuffling)
            selected_proverb = random.choice(proverbs)
            logger.info(f"No keyword match found, randomly selected: {selected_proverb['proverb']}")
            return {
                'proverb': selected_proverb['proverb'],
                'translation': selected_proverb.get('translation', 'N/A'),
                'wisdom': selected_proverb['wisdom']
            }

@app.route('/match_scenario', methods=['POST'])
def match_scenario():
    data = request.json
    scenario = data.get('scenario')
    if not scenario:
        return jsonify({'error': 'Scenario is required'}), 400
    result = match_proverb_to_scenario(scenario, proverbs)
    logger.info(f"Before jsonify - Response: {result}")
    response = jsonify(result or {'error': 'No proverb matched'})
    logger.info(f"After jsonify - Response data: {response.get_data(as_text=True)}")
    return response

@app.route('/create_quiz', methods=['POST'])
def create_quiz():
    data = request.json
    num_questions = data.get('num_questions')
    quiz_type = data.get('quiz_type')
    user_name = data.get('user_name', 'Anonymous')
    
    if not isinstance(num_questions, int) or num_questions < 1 or num_questions > 50:
        return jsonify({'error': 'Number of questions must be between 1 and 50'}), 400
    
    try:
        quiz_type = QuizType(quiz_type.lower())
    except ValueError:
        return jsonify({'error': 'Invalid quiz type. Use "proverb_to_scenario", "scenario_to_proverb", or "mixture"'}), 400
    
    quiz = generate_quiz(proverbs, num_questions, quiz_type)
    quiz_id = str(uuid.uuid4())
    quiz_storage[quiz_id] = quiz
    
    quiz_response = []
    for i, q in enumerate(quiz):
        if q['type'] == QuizType.PROVERB_TO_SCENARIO.value:
            quiz_response.append({
                'question_id': i,
                'type': q['type'],
                'context': q['context'],
                'options': [{'index': j, 'proverb': opt['proverb'], 'translation': opt['translation']} for j, opt in enumerate(q['options'])]
            })
        else:
            quiz_response.append({
                'question_id': i,
                'type': q['type'],
                'proverb': q['proverb']['proverb'],
                'translation': q['proverb']['translation'],
                'options': [{'index': j, 'context': opt['context']} for j, opt in enumerate(q['options'])]
            })
    
    return jsonify({'quiz_id': quiz_id, 'quiz': quiz_response})

@app.route('/check_answer', methods=['POST'])
def check_answer_endpoint():
    data = request.json
    quiz_id = data.get('quiz_id')
    question_id = data.get('question_id')
    user_choice = data.get('choice')
    
    if quiz_id not in quiz_storage:
        return jsonify({'error': 'Invalid or expired quiz_id'}), 400
    if not isinstance(question_id, int) or not isinstance(user_choice, int):
        return jsonify({'error': 'Invalid question_id or choice'}), 400
    quiz = quiz_storage[quiz_id]
    if question_id >= len(quiz):
        return jsonify({'error': 'Invalid question_id'}), 400
    
    result = check_answer(quiz[question_id], user_choice)
    return jsonify({
        'correct': result['correct'],
        'message': result['message'],
        'selected': result['selected'],
        'correct_answer': result['correct_answer']
    })

from flask import Response
import csv
from io import StringIO
from datetime import datetime

@app.route('/submit_quiz', methods=['POST'])
def submit_quiz():
    data = request.json
    quiz_id = data.get('quiz_id')
    answers = data.get('answers')
    user_name = data.get('user_name', 'Anonymous')
    
    if quiz_id not in quiz_storage:
        return jsonify({'error': 'Invalid or expired quiz_id'}), 400
    if not isinstance(answers, list):
        return jsonify({'error': 'Answers must be a list'}), 400
    
    quiz = quiz_storage[quiz_id]
    score = 0
    results = []
    type_counts = {QuizType.PROVERB_TO_SCENARIO.value: {'total': 0, 'correct': 0},
                   QuizType.SCENARIO_TO_PROVERB.value: {'total': 0, 'correct': 0}}
    
    for answer in answers:
        question_id = answer.get('question_id')
        user_choice = answer.get('choice')
        if not isinstance(question_id, int) or not isinstance(user_choice, int) or question_id >= len(quiz):
            continue
        result = check_answer(quiz[question_id], user_choice)
        results.append({
            'question_id': question_id,
            'type': quiz[question_id]['type'],
            'correct': result['correct'],
            'selected': result['selected'],
            'correct_answer': result['correct_answer'],
            'message': result['message']
        })
        if result['correct']:
            score += 1
        type_counts[quiz[question_id]['type']]['total'] += 1
        if result['correct']:
            type_counts[quiz[question_id]['type']]['correct'] += 1
    
    num_questions = len(quiz)
    percentage = (score / num_questions * 100) if num_questions > 0 else 0
    grade = get_grade(percentage)
    
    # Generate CSV content in memory
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"quiz_results_{user_name}_{timestamp}.csv"
    csv_buffer = StringIO()
    writer = csv.writer(csv_buffer)
    writer.writerow(['Question ID', 'Type', 'Correct', 'Selected Answer', 'Correct Answer', 'Feedback'])
    for result in results:
        writer.writerow([
            result['question_id'],
            result['type'],
            result['correct'],
            result['selected'],
            result['correct_answer'],
            result['message']
        ])
    writer.writerow(['', '', '', '', 'Final Score', f'{score}/{num_questions} ({percentage:.1f}%)'])
    writer.writerow(['', '', '', '', 'Grade', grade])
    
    csv_content = csv_buffer.getvalue()
    csv_buffer.close()
    
    del quiz_storage[quiz_id]
    
    return jsonify({
        'score': score,
        'total': num_questions,
        'percentage': percentage,
        'grade': grade,
        'breakdown': {
            qtype: {
                'correct': stats['correct'],
                'total': stats['total'],
                'percentage': (stats['correct'] / stats['total'] * 100) if stats['total'] > 0 else 0
            } for qtype, stats in type_counts.items() if stats['total'] > 0
        },
        'results': results,
        'results_file': filename,
        'csv_content': csv_content  # Add CSV content to the response
    })
    
    return jsonify({
        'score': score,
        'total': num_questions,
        'percentage': percentage,
        'grade': grade,
        'breakdown': {
            qtype: {
                'correct': stats['correct'],
                'total': stats['total'],
                'percentage': (stats['correct'] / stats['total'] * 100) if stats['total'] > 0 else 0
            } for qtype, stats in type_counts.items() if stats['total'] > 0
        },
        'results': results,
        'results_file': filename  # Ensure this matches the filename used
    })

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    try:
        return send_file(filename, as_attachment=True)
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)