const { useState, useEffect } = React;

function App() {
  const [view, setView] = useState('home'); // home, match, quiz, results
  const [scenario, setScenario] = useState('');
  const [matchedProverb, setMatchedProverb] = useState(null);
  const [quizConfig, setQuizConfig] = useState({ num_questions: 5, quiz_type: 'mixture' });
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(''); // New state for user name

  const handleMatchScenario = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/match_scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario })
      });
      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        data = null;
      }
      if (response.ok && data) {
        setMatchedProverb(data);
        setView('match');
      } else {
        setError(data?.error || 'No data returned from server');
      }
    } catch (err) {
      console.error('Error in handleMatchScenario:', err);
      setError('Error connecting to the server');
    }
    setLoading(false);
  };

  const handleCreateQuiz = async () => {
    setLoading(true);
    setError(null);
    if (!userName.trim()) {
      setError('Please enter your name before starting the quiz.');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/create_quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...quizConfig, user_name: userName })
      });
      const data = await response.json();
      if (response.ok) {
        setQuiz(data);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setView('quiz');
      } else {
        setError(data.error || 'Failed to create quiz');
      }
    } catch (err) {
      setError('Error connecting to the server');
    }
    setLoading(false);
  };

  const handleAnswer = async (choice) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/check_answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quiz_id: quiz.quiz_id,
          question_id: quiz.quiz[currentQuestionIndex].question_id,
          choice
        })
      });
      const data = await response.json();
      if (response.ok) {
        const newAnswer = { question_id: quiz.quiz[currentQuestionIndex].question_id, choice, result: data };
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers, newAnswer];
          if (currentQuestionIndex < quiz.quiz.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          } else {
            if (updatedAnswers.length === quiz.quiz.length) {
              handleSubmitQuiz(updatedAnswers);
            } else {
              setError('Not all questions were answered. Please try again.');
            }
          }
          return updatedAnswers;
        });
      } else {
        setError(data.error || 'Failed to check answer');
      }
    } catch (err) {
      setError('Error connecting to the server');
    }
    setLoading(false);
  };

  const handleSubmitQuiz = async (answersToSubmit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/submit_quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quiz_id: quiz.quiz_id,
          answers: answersToSubmit.map(a => ({ question_id: a.question_id, choice: a.choice })),
          user_name: userName
        })
      });
      const data = await response.json();
      if (response.ok) {
        setResults(data);
        setView('results');
      } else {
        setError(data.error || 'Failed to submit quiz');
      }
    } catch (err) {
      setError('Error connecting to the server');
    }
    setLoading(false);
  };

  const resetQuiz = () => {
    setQuiz(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults(null);
    setUserName(''); // Reset name on returning to home
    setView('home');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-xl">
      {view === 'home' && (
        <>
          <h1 className="text-4xl font-bold mb-6 text-center text-red-600">Yoruba Proverb Quiz</h1>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-600">Match a Scenario to a Proverb</h2>
            <textarea
              className="w-full p-3 border-2 border-green-500 rounded-lg focus:outline-none focus:border-yellow-500"
              rows="4"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="Enter a scenario..."
            />
            <button
              className="mt-3 w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition duration-300"
              onClick={handleMatchScenario}
              disabled={loading || !scenario.trim()}
            >
              {loading ? 'Loading...' : 'Find Proverb'}
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-yellow-600">Create a Quiz</h2>
            <div className="mb-5">
              <label className="block mb-2 text-green-700">Your Name:</label>
              <input
                type="text"
                className="w-full p-3 border-2 border-green-500 rounded-lg focus:outline-none focus:border-yellow-500"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name..."
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-green-700">Number of Questions (1-50):</label>
              <input
                type="number"
                className="w-full p-3 border-2 border-green-500 rounded-lg focus:outline-none focus:border-yellow-500"
                value={quizConfig.num_questions}
                onChange={(e) => setQuizConfig({ ...quizConfig, num_questions: parseInt(e.target.value) || 1 })}
                min="1"
                max="50"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-green-700">Quiz Type:</label>
              <select
                className="w-full p-3 border-2 border-green-500 rounded-lg focus:outline-none focus:border-yellow-500"
                value={quizConfig.quiz_type}
                onChange={(e) => setQuizConfig({ ...quizConfig, quiz_type: e.target.value })}
              >
                <option value="mixture">Mixture</option>
                <option value="proverb_to_scenario">Proverb to Scenario</option>
                <option value="scenario_to_proverb">Scenario to Proverb</option>
              </select>
            </div>
            <button
              className="w-full bg-yellow-500 text-gray-800 p-3 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 transition duration-300"
              onClick={handleCreateQuiz}
              disabled={loading || quizConfig.num_questions < 1 || quizConfig.num_questions > 50 || !userName.trim()}
            >
              {loading ? 'Loading...' : 'Start Quiz'}
            </button>
          </div>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </>
      )}

      {view === 'match' && matchedProverb && (
        <div>
          <h2 className="text-3xl font-bold mb-5 text-yellow-600">Matched Proverb</h2>
          <p className="mb-3"><strong className="text-green-700">Scenario:</strong> {scenario}</p>
          <p className="mb-3"><strong className="text-green-700">Proverb:</strong> {matchedProverb.proverb || 'N/A'}</p>
          <p className="mb-3"><strong className="text-green-700">Translation:</strong> {matchedProverb.translation || 'N/A'}</p>
          <p className="mb-3"><strong className="text-green-700">Wisdom:</strong> {matchedProverb.wisdom || 'N/A'}</p>
          <button
            className="mt-5 w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300"
            onClick={() => setView('home')}
          >
            Back to Home
          </button>
        </div>
      )}

      {view === 'quiz' && quiz && (
        <div>
          <h2 className="text-3xl font-bold mb-5 text-yellow-600">Question {currentQuestionIndex + 1}/{quiz.quiz.length}</h2>
          {quiz.quiz[currentQuestionIndex].type === 'proverb_to_scenario' ? (
            <>
              <p className="mb-4"><strong className="text-green-700">Context:</strong> {quiz.quiz[currentQuestionIndex].context}</p>
              <p className="mb-4 text-green-700">Choose the proverb that best matches the context:</p>
              {quiz.quiz[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className="w-full mb-3 p-3 border-2 border-green-500 rounded-lg hover:bg-yellow-100 disabled:bg-gray-400 transition duration-300"
                  onClick={() => handleAnswer(index)}
                  disabled={loading}
                >
                  {option.proverb} ({option.translation})
                </button>
              ))}
            </>
          ) : (
            <>
              <p className="mb-4"><strong className="text-green-700">Proverb:</strong> {quiz.quiz[currentQuestionIndex].proverb}</p>
              <p className="mb-4"><strong className="text-green-700">Translation:</strong> {quiz.quiz[currentQuestionIndex].translation}</p>
              <p className="mb-4 text-green-700">Choose the context that best matches the proverb:</p>
              {quiz.quiz[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className="w-full mb-3 p-3 border-2 border-green-500 rounded-lg hover:bg-yellow-100 disabled:bg-gray-400 transition duration-300"
                  onClick={() => handleAnswer(index)}
                  disabled={loading}
                >
                  {option.context}
                </button>
              ))}
            </>
          )}
          {answers[currentQuestionIndex] && (
            <div className="mt-5">
              <p className={answers[currentQuestionIndex].result.correct ? 'text-green-500' : 'text-red-500'}>
                {answers[currentQuestionIndex].result.message}
              </p>
            </div>
          )}
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      )}

      {view === 'results' && results && (
        <div>
          <h2 className="text-3xl font-bold mb-5 text-yellow-600">Quiz Results</h2>
          <p className="mb-3"><strong className="text-green-700">Score:</strong> {results.score}/{results.total} ({results.percentage.toFixed(1)}%)</p>
          <p className="mb-3"><strong className="text-green-700">Grade:</strong> {results.grade}</p>
          <h3 className="text-2xl font-semibold mt-5 mb-3 text-yellow-600">Breakdown by Type:</h3>
          {Object.entries(results.breakdown).map(([type, stats]) => (
            <p key={type} className="mb-2">
              {type.replace('_', ' ').toUpperCase()}: {stats.correct}/{stats.total} (
              {stats.percentage.toFixed(1)}%)
            </p>
          ))}
          <h3 className="text-2xl font-semibold mt-5 mb-3 text-yellow-600">Question-by-Question Results:</h3>
          {results.results.map((result, index) => (
            <div key={index} className="mb-5">
              <p>
                <strong className="text-green-700">Question {result.question_id + 1} ({result.type.replace('_', ' ').toUpperCase()}):</strong>{' '}
                {result.correct ? 'Correct' : 'Incorrect'}
              </p>
              <p><strong className="text-green-700">Selected:</strong> {result.selected}</p>
              <p><strong className="text-green-700">Correct Answer:</strong> {result.correct_answer}</p>
              <p><strong className="text-green-700">Feedback:</strong> {result.message}</p>
            </div>
          ))}
          <p className="mb-3"><strong className="text-green-700">Results saved to:</strong> {results.results_file}</p>
          <a
            href={`/download/${results.results_file}`}
            className="mt-5 w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 text-center block"
            download
          >
            Download Results
          </a>
          <button
            className="mt-5 w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300"
            onClick={resetQuiz}
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot ? ReactDOM.createRoot(document.getElementById('root')) : document.getElementById('root');
if (ReactDOM.createRoot) {
  root.render(<App />);
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}