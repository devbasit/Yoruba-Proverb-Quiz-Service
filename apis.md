# API Routes and Response Formats

Below are all API routes in `app.py`, with their expected parameters and response formats.

---

## 1. `/match_scenario`
**Method:** `POST`  
**Parameters (JSON body):**
- `scenario` (string, required)

**Response:**
```json
{
  "response": "<html-formatted-response>"
}
```
If missing parameter:
```json
{ "error": "Scenario is required" }
```

---

## 2. `/create_quiz`
**Method:** `POST`  
**Parameters (JSON body):**
- `num_questions` (int, required)
- `quiz_type` (string, required; one of `"proverb_to_scenario"`, `"scenario_to_proverb"`, `"mixture"`)
- `user_name` (string, optional; defaults to `"Anonymous"`)

**Response:**
```json
{
  "quiz_id": "<quiz_id>",
  "quiz": [
    {
      "question_id": 0,
      "type": "proverb_to_scenario",
      "context": "...",
      "options": [
        { "index": 0, "proverb": "...", "translation": "..." },
        ...
      ]
    },
    {
      "question_id": 1,
      "type": "scenario_to_proverb",
      "proverb": "...",
      "translation": "...",
      "options": [
        { "index": 0, "context": "..." },
        ...
      ]
    }
  ]
}
```
If invalid input:
```json
{ "error": "Number of questions must be between 1 and 20" }
```
or
```json
{ "error": "Invalid quiz type. Use \"proverb_to_scenario\", \"scenario_to_proverb\", or \"mixture\"" }
```

---

## 3. `/check_answer`
**Method:** `POST`  
**Parameters (JSON body):**
- `quiz_id` (string, required)
- `question_id` (int, required)
- `choice` (int, required)

**Response:**
```json
{
  "correct": true,
  "message": "...",
  "selected": "...",
  "correct_answer": "..."
}
```
If invalid input:
```json
{ "error": "Invalid or expired quiz_id" }
```
or
```json
{ "error": "Invalid question_id or choice" }
```
or
```json
{ "error": "Invalid question_id" }
```

---

## 4. `/submit_quiz`
**Method:** `POST`  
**Parameters (JSON body):**
- `quiz_id` (string, required)
- `answers` (list of objects, required; each with `question_id` (int), `choice` (int))
- `user_name` (string, optional; defaults to `"Anonymous"`)

**Response:**
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
    },
    ...
  ],
  "results_file": "quiz_results_Anonymous_20240721_123456.csv",
  "csv_content": "<csv-string>"
}
```
If invalid input:
```json
{ "error": "Invalid or expired quiz_id" }
```
or
```json
{ "error": "Answers must be a list" }
```

---

## 5. `/download/<filename>`
**Method:** `GET`  
**Parameters (URL path):**
- `filename` (string, required)

**Response:**  
- Returns the file as an attachment for download.

If file not found:
```json
{ "error": "File not found" }
```

---

## 6. `/`
**Method:** `GET`  
**Parameters:** None

**Response:**  
- Renders `index.html` template (HTML page).

---