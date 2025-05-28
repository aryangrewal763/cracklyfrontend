import React, { useState } from 'react';
import axios from 'axios';

const QuizApp = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleSubmit = async (e) => {    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/req/generateQuestion', {
        topic,
        difficulty
      });
      console.log("Resfsfsd:",response);
      
      setQuestions(response.data.questions);
    } catch (err) {
      console.log("Generate ques error:",err);
      
      setError('Failed to fetch questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  if (questions.length > 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {topic} Quiz ({difficulty})
        </h2>
        
        {questions.map((question, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 mb-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Q{index + 1}: {question.question}
            </h3>
            
            <div className="grid gap-3">
              {question.options.map((option, optIndex) => (
                <button
                  key={optIndex}
                  onClick={() => handleAnswerSelect(index, option)}
                  className={`
                    p-3 text-left rounded-lg border
                    ${!selectedAnswers[index] ? 
                      'hover:bg-blue-50 hover:border-blue-200 cursor-pointer' : 
                      'cursor-not-allowed'}
                    ${selectedAnswers[index] === option ? 
                      'bg-blue-100 border-blue-300' : 
                      'bg-white border-gray-200'}
                    ${selectedAnswers[index] && option === question.answer ? 
                      'bg-green-100 border-green-300' : ''}
                  `}
                  disabled={!!selectedAnswers[index]}
                >
                  {option}
                </button>
              ))}
            </div>

            {selectedAnswers[index] && (
              <div className={`mt-4 font-medium ${
                selectedAnswers[index] === question.answer ? 
                'text-green-600' : 'text-red-600'
              }`}>
                {selectedAnswers[index] === question.answer ? 
                  'Correct! ✔️' : 'Incorrect! ❌'}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8">Quiz Setup</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading Questions...' : 'Start Quiz'}
        </button>
      </form>
    </div>
  );
};

export default QuizApp;