import random
import csv
from typing import List, Dict
from enum import Enum
from datetime import datetime
import pandas as pd

# Ensure the Google Gemini API is configured correctly
df = pd.read_csv("./processed_data.csv")
# Quiz type enumeration
class QuizType(Enum):
    PROVERB_TO_SCENARIO = "proverb_to_scenario"
    SCENARIO_TO_PROVERB = "scenario_to_proverb"
    MIXTURE = "mixture"


def generate_proverb_to_scenario_question(df):
    """
    Generates a proverb-to-scenario quiz question.

    Args:
        df: pandas DataFrame with 'proverb', 'translation', and 'scenario' columns.

    Returns:
        A dictionary containing the quiz question details.
    """
    # Select a random row to get the correct proverb and scenario
    selected_row = df.sample(n=1).iloc[0]
    selected_proverb = {'proverb': selected_row['proverb'], 'translation': selected_row['translation'], 'wisdom': selected_row['wisdom']}
    context = selected_row['scenario']

    # Select 3 other random proverbs with their translations
    other_proverbs_rows = df[df['proverb'] != selected_proverb['proverb']].sample(n=3)
    other_proverbs = [{'proverb': row['proverb'], 'translation': row['translation']} for index, row in other_proverbs_rows.iterrows()]

    # Create options for the quiz
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

def generate_scenario_to_proverb_question(df):
    """
    Generates a scenario-to-proverb quiz question.

    Args:
        df: pandas DataFrame with 'proverb', 'translation', and 'scenario' columns.

    Returns:
        A dictionary containing the quiz question details.
    """
    # Select a random row to get the correct proverb and scenario
    selected_row = df.sample(n=1).iloc[0]
    selected_proverb = {'proverb': selected_row['proverb'], 'translation': selected_row['translation'], 'wisdom': selected_row['wisdom']}
    context = selected_row['scenario']

    # Select 3 other random scenarios
    other_scenarios_rows = df[df['scenario'] != selected_row['scenario']].sample(n=3)
    other_scenarios = [row['scenario'] for index, row in other_scenarios_rows.iterrows()]

    # Create options for the quiz
    options = [
        {'context': selected_row['scenario'], 'is_correct': True},
        {'context': other_scenarios[0], 'is_correct': False},
        {'context': other_scenarios[1], 'is_correct': False},
        {'context': other_scenarios[2], 'is_correct': False}
    ]
    random.shuffle(options)
    return {
        'type': QuizType.SCENARIO_TO_PROVERB.value,
        'proverb': selected_proverb,
        'options': options,
        'correct_context': context
    }

def generate_quiz(df, num_questions: int, quiz_type: QuizType) -> List[Dict]:
    """
    Generate a quiz with the specified number of questions and quiz type.
    """
    quiz = []
    if quiz_type == QuizType.MIXTURE:
        for _ in range(num_questions):
            if random.choice([True, False]):
                quiz.append(generate_proverb_to_scenario_question(df))
            else:
                quiz.append(generate_scenario_to_proverb_question(df))
    elif quiz_type == QuizType.PROVERB_TO_SCENARIO:
        for _ in range(num_questions):
            quiz.append(generate_proverb_to_scenario_question(df))
    else:  # SCENARIO_TO_PROVERB
        for _ in range(num_questions):
            quiz.append(generate_scenario_to_proverb_question(df))
    
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

def run_quiz():
    """
    Run a customizable quiz with enhanced grading.
    """
    print("\nYoruba Proverb Quiz Creator")
    
    # Get number of questions
    while True:
        try:
            num_questions = int(input("Enter the number of questions (1-20): "))
            if 1 <= num_questions <= 20:
                break
            print("Please enter a number between 1 and 20.")
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
        print("Invalid choice. Please select one of 1, 2, or 3.")
    
    # Generate quiz
    quiz = generate_quiz(df, num_questions, quiz_type)
    
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
    
    while True:
        print("\nYoruba Proverb Service")
        print("1. Create a custom quiz")
        print("2. Exit")
        choice = input("Select an option (1-2): ")
        
        if choice == '1':
            run_quiz()
        elif choice == '2':
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
