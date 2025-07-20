from flask import Flask, request, jsonify, render_template, send_file
from flask_cors import CORS
from yoruba_proverb_quiz_service import generate_quiz, check_answer, QuizType, get_grade
import uuid
import csv
from typing import List, Dict
from datetime import datetime
import sys
import io
import pandas as pd
import logging
import os
import csv
from io import StringIO
from datetime import datetime
import markdown

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_chroma import Chroma
import os


# Load the models
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

base_dir = "."
persist_directory = os.path.join(base_dir, "chroma_db")
vectordb = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
retriever = vectordb.as_retriever(search_kwargs={"k": 5})

#Create the retrieval chain
template="""
You are a wise Yoruba cultural assistant. You are given a collection of Yoruba proverbs with translations and explanations.

Use the following context to answer the user's question:
{context}
Ensure there's at least two proverbs in your response even if it's not completely relevant.
Now, answer this question clearly, respectfully and as concise as possible with a mixture of both Yoruba and English texts:
{input}
"""

prompt = PromptTemplate.from_template(template)
combine_docs_chain = create_stuff_documents_chain(llm, prompt)
retrieval_chain = create_retrieval_chain(retriever, combine_docs_chain)

# Ensure UTF-8 output for terminal
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for API routes
app.config['JSON_AS_ASCII'] = False  # Prevent Unicode escaping in JSON responses

df = pd.read_csv("./processed_data.csv")
proverbs = df['proverb'].unique().tolist()
used_proverb_to_scenario_pairs = set()
used_scenario_to_proverb_pairs = set()


quiz_storage = {}

def match_proverb_to_scenario(scenario: str) -> str:
    """
    Match a user-provided scenario to the most relevant proverb based on wisdom.
    """
    #Invoke the retrieval chain
    response=retrieval_chain.invoke({"input":scenario})

    #Print the answer to the question
    return({"response":markdown.markdown(response["answer"])})

@app.route('/match_scenario', methods=['POST'])
def match_scenario():
    data = request.json
    scenario = data.get('scenario')
    if not scenario:
        return jsonify({'error': 'Scenario is required'}), 400
    result = match_proverb_to_scenario(scenario)
    response = jsonify(result or {'error': 'No proverb matched'})
    return response

@app.route('/create_quiz', methods=['POST'])
def create_quiz():
    data = request.json
    num_questions = data.get('num_questions')
    quiz_type = data.get('quiz_type')
    user_name = data.get('user_name', 'Anonymous')
    
    if not isinstance(num_questions, int) or num_questions < 1 or num_questions > 20:
        return jsonify({'error': 'Number of questions must be between 1 and 20'}), 400
    
    try:
        quiz_type = QuizType(quiz_type.lower())
    except ValueError:
        return jsonify({'error': 'Invalid quiz type. Use "proverb_to_scenario", "scenario_to_proverb", or "mixture"'}), 400
    
    quiz = generate_quiz(df, num_questions, quiz_type)
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