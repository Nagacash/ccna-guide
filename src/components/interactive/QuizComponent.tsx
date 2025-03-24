"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizComponentProps {
  questions: QuizQuestion[];
  title?: string;
  showResults?: boolean;
}

export default function QuizComponent({
  questions,
  title = "CCNA Practice Quiz",
  showResults = true
}: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Calculate score
  const calculateScore = () => {
    return selectedAnswers.reduce((score, selected, index) => {
      return selected === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };
  
  // Handle option selection
  const handleSelectOption = (optionIndex: number) => {
    if (quizCompleted) return;
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };
  
  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };
  
  // Reset quiz
  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(questions.length).fill(-1));
    setShowExplanation(false);
    setQuizCompleted(false);
  };
  
  // Current question data
  const currentQuestionData = questions[currentQuestion];
  
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Quiz header */}
      <div className="p-4 bg-blue-600 text-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          {!quizCompleted && (
            <div className="bg-blue-500 rounded-full h-2 w-48">
              <div 
                className="bg-white rounded-full h-2" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Quiz content */}
      {!quizCompleted ? (
        <div className="p-6">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              {currentQuestionData.question}
            </h4>
            
            <div className="space-y-3 mb-6">
              {currentQuestionData.options.map((option, index) => (
                <motion.div
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleSelectOption(index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="text-gray-700">{option}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Explanation */}
            {showExplanation && (
              <motion.div
                className={`p-4 rounded-lg mb-6 ${
                  selectedAnswers[currentQuestion] === currentQuestionData.correctAnswer
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    selectedAnswers[currentQuestion] === currentQuestionData.correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {selectedAnswers[currentQuestion] === currentQuestionData.correctAnswer ? '✓' : '✗'}
                  </div>
                  <div>
                    <p className={`font-medium ${
                      selectedAnswers[currentQuestion] === currentQuestionData.correctAnswer
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}>
                      {selectedAnswers[currentQuestion] === currentQuestionData.correctAnswer
                        ? 'Correct!'
                        : 'Incorrect!'}
                    </p>
                    <p className="text-gray-700 mt-1">
                      {currentQuestionData.explanation}
                    </p>
                    {selectedAnswers[currentQuestion] !== currentQuestionData.correctAnswer && (
                      <p className="text-gray-700 mt-2">
                        Correct answer: <span className="font-medium">{String.fromCharCode(65 + currentQuestionData.correctAnswer)}</span>
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Actions */}
            <div className="flex justify-between">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              
              <div>
                {selectedAnswers[currentQuestion] !== -1 && !showExplanation && (
                  <button
                    className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors mr-3"
                    onClick={() => setShowExplanation(true)}
                  >
                    Check Answer
                  </button>
                )}
                
                <button
                  className={`px-4 py-2 rounded-md ${
                    selectedAnswers[currentQuestion] === -1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestion] === -1}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="p-6">
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-6">
                <div className="inline-block p-4 rounded-full bg-blue-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h3>
                <p className="text-gray-600">
                  You scored {calculateScore()} out of {questions.length} questions correctly.
                </p>
              </div>
              
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`rounded-full h-4 ${
                      calculateScore() / questions.length >= 0.7
                        ? 'bg-green-500'
                        : calculateScore() / questions.length >= 0.4
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${(calculateScore() / questions.length) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <h4 className="font-medium text-gray-800">Question Summary:</h4>
                {questions.map((question, index) => (
                  <div 
                    key={index}
                    className={`p-3 border rounded-lg ${
                      selectedAnswers[index] === question.correctAnswer
                        ? 'border-green-200 bg-green-50'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        selectedAnswers[index] === question.correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}>
                        {selectedAnswers[index] === question.correctAnswer ? '✓' : '✗'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{question.question}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Your answer: {selectedAnswers[index] !== -1 ? String.fromCharCode(65 + selectedAnswers[index]) : 'None'}
                          {selectedAnswers[index] !== question.correctAnswer && (
                            <span> (Correct: {String.fromCharCode(65 + question.correctAnswer)})</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center">
                <motion.button
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={handleResetQuiz}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Retake Quiz
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
