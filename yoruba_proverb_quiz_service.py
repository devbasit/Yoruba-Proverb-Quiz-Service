import random
import re
import csv
from typing import List, Dict
from enum import Enum
from datetime import datetime
import google.generativeai as genai
import json
# Ensure the Google Gemini API is configured correctly

# Quiz type enumeration
class QuizType(Enum):
    PROVERB_TO_SCENARIO = "proverb_to_scenario"
    SCENARIO_TO_PROVERB = "scenario_to_proverb"
    MIXTURE = "mixture"

# Initialize Gemini API
def initialize_gemini():
    """
    Initialize the Google Gemini API by reading the API key from a text file.
    """
    try:
        with open('gemini_api_key.txt', 'r') as file:
            api_key = file.read().strip()
        genai.configure(api_key=api_key)
    except FileNotFoundError:
        raise Exception("gemini_api_key.txt not found. Please create it with your API key.")
    except Exception as e:
        raise Exception(f"Failed to initialize Gemini API: {str(e)}")

# Global model initialization

model = genai.GenerativeModel(
            model_name="gemini-2.0-flash",
            generation_config={
                "temperature": 0.9,
                "top_p": 1,
                "top_k": 1,
                "max_output_tokens": 500
            }
        )

def call_llm(prompt: str) -> str:
    """
    Generate text using Google Gemini API for the given prompt.
    """
    global model
    if model is None:
        initialize_gemini()
        model = genai.GenerativeModel(
            model_name="gemini-1.5-pro",
            generation_config={
                "temperature": 0.9,
                "top_p": 1,
                "top_k": 1,
                "max_output_tokens": 100
            }
        )
    
    instruction = (
        f"Given the following wisdom, generate a brief scenario (2-3 sentences) that reflects its context. "
        f"Be sure to consider cultural nuances and the essence of the wisdom."
        f"Yoruba names should be given more priority over other names."
        f"Ensure the scenario is clear, concise, and culturally neutral unless specified. "
        f"Wisdom: {prompt}\nScenario:"
    )
    
    try:
        response = model.generate_content(instruction)
        scenario = response.text.strip()
        if scenario.startswith("Scenario:"):
            scenario = scenario[len("Scenario:"):].strip()
        return scenario
    except Exception as e:
        print(f"Error calling Gemini API: {str(e)}")
        return "Failed to generate scenario due to API error."
    
def call_llm_sc_to_pro(prompt: str) -> str:
    """
    Generate text using Google Gemini API for the given prompt.
    """
    global model
    if model is None:
        initialize_gemini()
        model = genai.GenerativeModel(
            model_name="gemini-1.5-pro",
            generation_config={
                "temperature": 0.9,
                "top_p": 1,
                "top_k": 1,
                "max_output_tokens": 100
            }
        )
    
    instruction = (
        prompt
    )
    
    try:
        response = model.generate_content(instruction)
        scenario = response.text.strip()
        if scenario.startswith("Scenario:"):
            scenario = scenario[len("Scenario:"):].strip()
        return scenario
    except Exception as e:
        print(f"Error calling Gemini API: {str(e)}")
        return "Failed to generate scenario due to API error."

def parse_proverbs(file_path: str) -> List[Dict[str, str]]:
    """
    Parse the proverb file into a list of dictionaries with proverb, translation, and wisdom.
    """
    proverbs = []
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read().splitlines()
    
    for line in content:
        if not line.strip():
            continue
        match = re.match(r'^(.*?)\.?Translation:(.*?)\.?Wisdom:(.*)$', line.strip())
        if match:
            proverb, translation, wisdom = match.groups()
            proverbs.append({
                'proverb': proverb.strip(),
                'translation': translation.strip(),
                'wisdom': wisdom.strip()
            })
        else:
            print(f"Skipping malformed line: {line[:50]}...")
    
    return proverbs

def match_proverb_to_scenario(scenario: str, proverbs: List[Dict[str, str]]) -> Dict[str, str]:
    """
    Match a user-provided scenario to the most relevant proverb based on wisdom.
    """
    prompt = f"""
    Given the following scenario: "{scenario}"
    And a list of Yoruba proverbs with their wisdom:
    {json.dumps([{ 'proverb': p['proverb'], 'wisdom': p['wisdom'] } for p in proverbs], indent=2)}
    
    Identify the proverb whose wisdom best matches the context of the scenario.
    Return the just the proverb, its translation, and wisdom in JSON format.
    """
    llm_response = call_llm_sc_to_pro(prompt)
    # Parse LLM response (assuming it returns JSON)
    try:
        result = json.loads(llm_response)
        # Find the matching proverb
        for proverb in proverbs:
            if proverb['proverb'] == result.get('proverb'):
                return proverb
    except json.JSONDecodeError:
        # Fallback: Simple keyword matching if LLM fails
        for proverb in proverbs:
            if any(word.lower() in proverb['wisdom'].lower() for word in scenario.lower().split()):
                return proverb
    return random.choice(proverbs)  # Fallback to random if no match

def generate_proverb_to_scenario_question(proverbs: List[Dict[str, str]]) -> Dict:
    """
    Generate a question where the user chooses the correct proverb for a given scenario.
    """
    selected_proverb = random.choice(proverbs)
    wisdom = selected_proverb['wisdom']
    
    prompt = f"{wisdom}"
    context = call_llm(prompt).strip()
    
    other_proverbs = random.sample([p for p in proverbs if p['proverb'] != selected_proverb['proverb']], 3)
    options = [
        {'proverb': selected_proverb['proverb'], 'translation': selected_proverb['translation'], 'is_correct': True},
        {'proverb': other_proverbs[0]['proverb'], 'translation': other_proverbs[0]['translation'], 'is_correct': False},
        {'proverb': other_proverbs[1]['proverb'], 'translation': other_proverbs[1]['translation'], 'is_correct': False},
        {'proverb': other_proverbs[2]['proverb'], 'translation': other_proverbs[2]['translation'], 'is_correct': False}
    ]
    random.shuffle(options)
    
    return {
        'type': QuizType.PROVERB_TO_SCENARIO.value,
        'context': context,
        'options': options,
        'correct_proverb': selected_proverb
    }

def generate_scenario_to_proverb_question(proverbs: List[Dict[str, str]]) -> Dict:
    """
    Generate a question where the user chooses the correct scenario for a given proverb.
    """
    selected_proverb = random.choice(proverbs)
    wisdom = selected_proverb['wisdom']
    
    prompt = f"{wisdom}"
    correct_context = call_llm(prompt).strip()
    
    other_proverbs = random.sample([p for p in proverbs if p['proverb'] != selected_proverb['proverb']], 3)
    incorrect_contexts = []
    for other in other_proverbs:
        prompt_incorrect = f"{other['wisdom']}"
        incorrect_contexts.append(call_llm(prompt_incorrect).strip())
    
    options = [
        {'context': correct_context, 'is_correct': True},
        {'context': incorrect_contexts[0], 'is_correct': False},
        {'context': incorrect_contexts[1], 'is_correct': False},
        {'context': incorrect_contexts[2], 'is_correct': False}
    ]
    random.shuffle(options)
    
    return {
        'type': QuizType.SCENARIO_TO_PROVERB.value,
        'proverb': selected_proverb,
        'options': options,
        'correct_context': correct_context
    }

def generate_quiz(proverbs: List[Dict[str, str]], num_questions: int, quiz_type: QuizType) -> List[Dict]:
    """
    Generate a quiz with the specified number of questions and quiz type.
    """
    quiz = []
    if quiz_type == QuizType.MIXTURE:
        for _ in range(num_questions):
            if random.choice([True, False]):
                quiz.append(generate_proverb_to_scenario_question(proverbs))
            else:
                quiz.append(generate_scenario_to_proverb_question(proverbs))
    elif quiz_type == QuizType.PROVERB_TO_SCENARIO:
        for _ in range(num_questions):
            quiz.append(generate_proverb_to_scenario_question(proverbs))
    else:  # SCENARIO_TO_PROVERB
        for _ in range(num_questions):
            quiz.append(generate_scenario_to_proverb_question(proverbs))
    
    return quiz

def check_answer(question: Dict, user_choice: int) -> Dict:
    """
    Check the user's answer for a quiz question and provide feedback.
    """
    if question['type'] == QuizType.PROVERB_TO_SCENARIO.value:
        selected_option = question['options'][user_choice]
        return {
            'correct': selected_option['is_correct'],
            'message': (
                "Correct! This proverb matches the context."
                if selected_option['is_correct']
                else f"Wrong. The selected proverb '{selected_option['proverb']}' does not match the context. "
                     f"The correct proverb is '{question['correct_proverb']['proverb']}' "
                     f"because its wisdom '{question['correct_proverb']['wisdom']}' aligns with the scenario."
            ),
            'selected': selected_option['proverb'],
            'correct_answer': question['correct_proverb']['proverb']
        }
    else:  # SCENARIO_TO_PROVERB
        selected_option = question['options'][user_choice]
        return {
            'correct': selected_option['is_correct'],
            'message': (
                "Correct! This context matches the proverb."
                if selected_option['is_correct']
                else f"Wrong. The selected context does not match the proverb '{question['proverb']['proverb']}'. "
                     f"The correct context is '{question['correct_context']}' "
                     f"because it aligns with the wisdom '{question['proverb']['wisdom']}'."
            ),
            'selected': selected_option['context'],
            'correct_answer': question['correct_context']
        }

def get_grade(percentage: float) -> str:
    """
    Assign a letter grade based on percentage score.
    """
    if percentage >= 90:
        return "A"
    elif percentage >= 80:
        return "B"
    elif percentage >= 70:
        return "C"
    elif percentage >= 60:
        return "D"
    else:
        return "F"

def save_quiz_results(results: List[Dict], score: int, num_questions: int, filename: str):
    """
    Save quiz results to a CSV file.
    """
    with open(filename, 'w', encoding='utf-8', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Question', 'Type', 'Correct', 'Selected Answer', 'Correct Answer', 'Feedback'])
        for i, result in enumerate(results, 1):
            writer.writerow([
                i,
                result['type'],
                result['correct'],
                result['selected'],
                result['correct_answer'],
                result['message']
            ])
        percentage = (score / num_questions * 100) if num_questions > 0 else 0
        writer.writerow(['', '', '', '', 'Final Score', f'{score}/{num_questions} ({percentage:.1f}%)'])
        writer.writerow(['', '', '', '', 'Grade', get_grade(percentage)])

def run_quiz(proverbs: List[Dict[str, str]]):
    """
    Run a customizable quiz with enhanced grading.
    """
    print("\nYoruba Proverb Quiz Creator")
    
    # Get number of questions
    while True:
        try:
            num_questions = int(input("Enter the number of questions (1-10): "))
            if 1 <= num_questions <= 10:
                break
            print("Please enter a number between 1 and 10.")
        except ValueError:
            print("Please enter a valid number.")
    
    # Get quiz type
    print("\nQuiz Types:")
    print("1. Proverb to Scenario (Choose the proverb that matches a given scenario)")
    print("2. Scenario to Proverb (Choose the scenario that matches a given proverb)")
    print("3. Mixture (Mix of both types)")
    while True:
        choice = input("Select quiz type (1-3): ")
        if choice == '1':
            quiz_type = QuizType.PROVERB_TO_SCENARIO
            break
        elif choice == '2':
            quiz_type = QuizType.SCENARIO_TO_PROVERB
            break
        elif choice == '3':
            quiz_type = QuizType.MIXTURE
            break
        print("Invalid choice. Please select 1, 2, or 3.")
    
    # Generate quiz
    quiz = generate_quiz(proverbs, num_questions, quiz_type)
    
    # Run quiz and track results
    score = 0
    results = []
    type_counts = {QuizType.PROVERB_TO_SCENARIO.value: {'total': 0, 'correct': 0},
                   QuizType.SCENARIO_TO_PROVERB.value: {'total': 0, 'correct': 0}}
    
    for i, question in enumerate(quiz, 1):
        print(f"\nQuestion {i}/{num_questions}")
        if question['type'] == QuizType.PROVERB_TO_SCENARIO.value:
            print("Context:", question['context'])
            print("Choose the proverb that best matches the context:")
            for j, option in enumerate(question['options']):
                print(f"{j+1}. {option['proverb']} ({option['translation']})")
        else:
            print("Proverb:", question['proverb']['proverb'])
            print("Translation:", question['proverb']['translation'])
            print("Choose the context that best matches the proverb:")
            for j, option in enumerate(question['options']):
                print(f"{j+1}. {option['context']}")
        
        # Get user answer
        while True:
            try:
                user_choice = int(input("Enter your choice (1-4): ")) - 1
                if 0 <= user_choice <= 3:
                    break
                print("Please enter a number between 1 and 4.")
            except ValueError:
                print("Please enter a valid number.")
        
        # Check answer
        result = check_answer(question, user_choice)
        print(result['message'])
        results.append({
            'type': question['type'],
            'correct': result['correct'],
            'selected': result['selected'],
            'correct_answer': result['correct_answer'],
            'message': result['message']
        })
        if result['correct']:
            score += 1
        type_counts[question['type']]['total'] += 1
        if result['correct']:
            type_counts[question['type']]['correct'] += 1
    
    # Display detailed results
    percentage = (score / num_questions * 100) if num_questions > 0 else 0
    grade = get_grade(percentage)
    print(f"\nQuiz Complete!")
    print(f"Final Score: {score}/{num_questions} ({percentage:.1f}%)")
    print(f"Grade: {grade}")
    print("\nScore Breakdown by Type:")
    for qtype, stats in type_counts.items():
        if stats['total'] > 0:
            type_percentage = (stats['correct'] / stats['total'] * 100) if stats['total'] > 0 else 0
            print(f"{qtype.replace('_', ' ').title()}: {stats['correct']}/{stats['total']} ({type_percentage:.1f}%)")
    
    print("\nQuestion-by-Question Results:")
    for i, result in enumerate(results, 1):
        status = "Correct" if result['correct'] else "Incorrect"
        print(f"Question {i} ({result['type'].replace('_', ' ').title()}): {status}")
    
    # Save results to CSV
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"quiz_results_{timestamp}.csv"
    save_quiz_results(results, score, num_questions, filename)
    print(f"\nResults saved to {filename}")

def main():
    """
    Main function to run the proverb quiz service via CLI.
    """
    file_path = 'extracted_div_texts_modded.txt'
    proverbs = parse_proverbs(file_path)
    
    while True:
        print("\nYoruba Proverb Service")
        print("1. Create a custom quiz")
        print("2. Exit")
        choice = input("Select an option (1-2): ")
        
        if choice == '1':
            run_quiz(proverbs)
        elif choice == '2':
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()