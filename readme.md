# Yoruba Proverb Quiz Service

## Description

The Yoruba Proverb Quiz Service is a web application that helps users learn, match, and test their knowledge of Yoruba proverbs and their meanings. Users can match scenarios to proverbs, take interactive quizzes, and receive instant feedback and results. The app leverages AI for proverb matching and provides a modern React-based frontend with a Flask backend.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
- [API-Routes](#api-routes)
- [Deployed Services](#deployed-services)
- [License](#license)

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/devbasit/Yoruba-Proverb-Quiz-Service.git
   cd yoruba-proverb-quiz-service
   ```

2. **Install Python dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

3. **Install Node.js dependencies (OPTIONAL):**
   ```sh
   npm install
   ```

4. **Prepare your data:**
   - Ensure `processed_data.csv`-which contains Povebs, Tanslation, Wisdom and Scenarios and `All provebs.csv` which should contain Simila fields (Scenario is optional here) are present in the root directory.

5. **Set up environment variables (if needed):**
   - For Google Gemini API and ChromaDB, configure your API keys as required.
   **`GOOGLE_API_KEY`, `AI...`** can be gotten from GoogleAI studio

---

## Usage

1. **Start the Flask backend:**
   ```sh
   python app.py
   ```

2. **Access the app:**
   - Open your browser and go to `http://localhost:5000`

3. **Frontend:**
   - The React app is loaded via CDN in `templates/index.html`.
   - No separate build step is required unless you want to customize the frontend.

---

## Features

- **Scenario to Proverb Matching:** Enter a scenario and get relevant Yoruba proverbs using AI.
- **Interactive Quiz:** Take quizzes with customizable question count and type.
- **Instant Feedback:** Get immediate feedback and explanations for each answer.
- **Result Download:** Download your quiz results as a CSV file.
- **Daily Proverb:** Get a random Yoruba proverb, translation, and wisdom each day.
- **Modern UI:** Responsive, styled with Tailwind CSS and Google Fonts.
- **Support for Yoruba and English:** Responses mix both languages for cultural richness.

---

## Configuration

- **Data File:** Place your `processed_data.csv` in the project root.
- **API Keys:** Set up any required API keys for Google Gemini and ChromaDB as environment variables or in your code.
- **Frontend Customization:** Edit `templates/index.html` and `app.js` for UI changes.

---

## API-Routes

| Route                  | Method | Description                                      | Payload/Params                |
|------------------------|--------|--------------------------------------------------|-------------------------------|
| `/`                    | GET    | Serves the main React app                        | None                          |
| `/match_scenario`      | POST   | Matches a scenario to relevant proverbs          | `{ "scenario": "..." }`       |
| `/create_quiz`         | POST   | Creates a new quiz                               | `{ "num_questions": int, "quiz_type": "mixture" \| "proverb_to_scenario" \| "scenario_to_proverb", "user_name": "..." }` |
| `/check_answer`        | POST   | Checks an answer for a quiz question             | `{ "quiz_id": "...", "question_id": int, "choice": int }` |
| `/submit_quiz`         | POST   | Submits all answers and returns results/CSV      | `{ "quiz_id": "...", "answers": [...], "user_name": "..." }` |
| `/download/<filename>` | GET    | Download quiz results CSV                        | URL path parameter: filename  |
| `/daily_proverb`       | GET    | Get a random Yoruba proverb, translation, wisdom | None                          |

### Example Response Formats

#### `/match_scenario`
```json
{
  "response": "<html-formatted-response>"
}
```

#### `/create_quiz`
```json
{
  "quiz_id": "<quiz_id>",
  "quiz": [
    {
      "question_id": 0,
      "type": "proverb_to_scenario",
      "context": "...",
      "options": [
        { "index": 0, "proverb": "...", "translation": "..." }
      ]
    }
  ]
}
```

#### `/check_answer`
```json
{
  "correct": true,
  "message": "...",
  "selected": "...",
  "correct_answer": "..."
}
```

#### `/submit_quiz`
```json
{
  "score": 7,
  "total": 10,
  "percentage": 70.0,
  "grade": "B",
  "breakdown": {
    "proverb_to_scenario": { "correct": 4, "total": 5, "percentage": 80.0 },
    "scenario_to_proverb": { "correct": 3, "total": 5, "percentage": 60.0 }
  },
  "results": [
    {
      "question_id": 0,
      "type": "proverb_to_scenario",
      "correct": true,
      "selected": "...",
      "correct_answer": "...",
      "message": "..."
    }, ...
  ],
  "results_file": "quiz_results_Anonymous_20240721_123456.csv",
  "csv_content": "<csv-string>"
}
```

#### `/daily_proverb`
```json
{
  "proverb": "<Yoruba proverb>",
  "translation": "<English translation>",
  "wisdom": "<Wisdom/Explanation>"
}
```

---

## Deployed Services

- **Render:** [https://yoruba-proverb-quiz-service.onrender.com/](https://yoruba-proverb-quiz-service.onrender.com/)
- ~~**Vercel:** [https://yoruba-proverb-quiz-service.vercel.app/](https://yoruba-proverb-quiz-service.vercel.app/)~~ `(DEPRECATED)`
- **Android App:** (Coming soon)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.