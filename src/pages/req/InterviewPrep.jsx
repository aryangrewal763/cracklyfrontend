import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Check, RefreshCw, Send, Mail } from 'lucide-react';
import axios from 'axios';

const InterviewPrep = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      category: 'Behavioral',
      question: 'Tell me about yourself',
      answer: '',
      isRecording: false,
      transcript: ''
    },
    {
      id: 2,
      category: 'Technical',
      question: 'What is the difference between let, const, and var in JavaScript?',
      answer: '',
      isRecording: false,
      transcript: ''
    },
    {
      id: 3,
      category: 'Behavioral',
      question: 'Describe a challenging work situation and how you overcame it',
      answer: '',
      isRecording: false,
      transcript: ''
    },
    {
      id: 4,
      category: 'Technical',
      question: 'Explain the concept of React hooks',
      answer: '',
      isRecording: false,
      transcript: ''
    },
    {
      id: 5,
      category: 'Behavioral',
      question: 'Where do you see yourself in 5 years?',
      answer: '',
      isRecording: false,
      transcript: ''
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userEmail, setUserEmail] = useState('');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailStatus, setEmailStatus] = useState({
    sending: false,
    success: false,
    error: null
  });

  const recognitionRef = useRef(null);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window) {
      setIsVoiceSupported(true);
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
    }
  }, []);

  const startRecording = (questionId) => {
    if (!recognitionRef.current) return;

    const updatedQuestions = questions.map(q => 
      q.id === questionId ? { ...q, isRecording: true } : q
    );
    setQuestions(updatedQuestions);

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const updatedQuestions = questions.map(q => 
        q.id === questionId 
          ? { ...q, isRecording: false, transcript: transcript, answer: transcript } 
          : q
      );
      setQuestions(updatedQuestions);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event);
      const updatedQuestions = questions.map(q => 
        q.id === questionId ? { ...q, isRecording: false } : q
      );
      setQuestions(updatedQuestions);
    };

    recognitionRef.current.start();
  };

  const stopRecording = (questionId) => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      const updatedQuestions = questions.map(q => 
        q.id === questionId ? { ...q, isRecording: false } : q
      );
      setQuestions(updatedQuestions);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    const updatedQuestions = questions.map(q => 
      q.id === questionId ? { ...q, answer: value, transcript: '' } : q
    );
    setQuestions(updatedQuestions);
  };

  const resetAnswer = (questionId) => {
    const updatedQuestions = questions.map(q => 
      q.id === questionId ? { ...q, answer: '', transcript: '' } : q
    );
    setQuestions(updatedQuestions);
  };

  const sendEmailWithResponses = async () => {
    // Validate email
    if (!userEmail || !/\S+@\S+\.\S+/.test(userEmail)) {
      setEmailStatus({
        sending: false,
        success: false,
        error: 'Please enter a valid email address'
      });
      return;
    }

    // Prepare email data
    const emailData = {
      email: userEmail,
      responses: questions.map(q => ({
        category: q.category,
        question: q.question,
        answer: q.answer || q.transcript
      })).filter(resp => resp.answer.trim() !== '')
    };

    // Reset email status
    setEmailStatus({ sending: true, success: false, error: null });

    try {
      const response = await axios.post('https://cracklybackend.onrender.com/send-interview-responses', emailData);
      
      setEmailStatus({
        sending: false,
        success: true,
        error: null
      });

      // Close modal after successful send
      setTimeout(() => {
        setIsEmailModalOpen(false);
      }, 2000);
    } catch (error) {
      setEmailStatus({
        sending: false,
        success: false,
        error: error.response?.data?.message || 'Failed to send email'
      });
    }
  };

  const filteredQuestions = selectedCategory === 'All' 
    ? questions 
    : questions.filter(q => q.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Interview Preparation Companion
      </h1>

      {/* Category Filter */}
      <div className="mb-6 flex justify-center space-x-4">
        {['All', 'Behavioral', 'Technical'].map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Send Responses Button */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setIsEmailModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600"
        >
          <Send size={20} />
          <span>Send Responses</span>
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map(question => (
          <div 
            key={question.id} 
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-sm font-medium text-blue-600 mb-2 block">
                  {question.category}
                </span>
                <h2 className="text-lg font-semibold text-gray-800">
                  {question.question}
                </h2>
              </div>
              {isVoiceSupported && (
                <div className="flex items-center space-x-2">
                  {question.isRecording ? (
                    <button 
                      onClick={() => stopRecording(question.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                    >
                      <MicOff size={24} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => startRecording(question.id)}
                      className="text-green-500 hover:bg-green-50 p-2 rounded-full"
                    >
                      <Mic size={24} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Answer Input */}
            <textarea
              value={question.answer || question.transcript}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder="Type or speak your answer"
              className="w-full min-h-[120px] p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
            />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 mt-2">
              {question.answer && (
                <button 
                  onClick={() => resetAnswer(question.id)}
                  className="text-gray-500 hover:bg-gray-100 p-2 rounded-full"
                >
                  <RefreshCw size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Voice Support Warning */}
      {!isVoiceSupported && (
        <div className="text-center mt-6 text-yellow-600">
          Voice-to-text is not supported in this browser
        </div>
      )}

      {/* Email Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Send Responses</h2>
            
            <input 
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border rounded-lg mb-4"
            />

            {emailStatus.error && (
              <div className="text-red-500 mb-4 text-center">
                {emailStatus.error}
              </div>
            )}

            {emailStatus.success && (
              <div className="text-green-500 mb-4 text-center">
                Responses sent successfully!
              </div>
            )}

            <div className="flex justify-between">
              <button 
                onClick={() => setIsEmailModalOpen(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={sendEmailWithResponses}
                disabled={emailStatus.sending}
                className={`
                  ${emailStatus.sending ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} 
                  text-white px-4 py-2 rounded-lg flex items-center space-x-2
                `}
              >
                {emailStatus.sending ? 'Sending...' : 'Send'}
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;