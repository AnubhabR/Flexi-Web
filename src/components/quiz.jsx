import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  X,
  Clock,
  Trophy,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Home,
  Play,
  Target,
  BookOpen,
  Award,
} from "lucide-react";

export default function QuizMainPage({ quiz, onBack }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // Timer functionality
  useEffect(() => {
    if (quizStarted && !quizCompleted && quiz.timeLimit) {
      const [minutes, seconds] = quiz.timeLimit.split(":").map(Number);
      const totalSeconds = minutes * 60 + (seconds || 0);
      setTimeRemaining(totalSeconds);

      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, quizCompleted]);

  const handleTimeUp = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setQuizCompleted(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerIndex,
    });
    setSelectedOption(answerIndex);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1] ?? null);
    } else {
      let correctAnswers = 0;
      quiz.questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] ?? null);
    }
  };

  const handleBackToDashboard = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleQuitQuiz = () => {
    setShowQuitConfirm(true);
  };

  const confirmQuit = () => {
    handleBackToDashboard();
  };

  const cancelQuit = () => {
    setShowQuitConfirm(false);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setQuizCompleted(false);
    setScore(0);
    setShowQuitConfirm(false);
    setTimeRemaining(null);
    setSelectedOption(null);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    return "F";
  };

  // Quit confirmation modal
  if (showQuitConfirm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scale-in">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Quit Quiz?
            </h2>
            <p className="text-gray-600">
              Are you sure you want to quit? Your progress will be lost and this
              attempt will not be saved.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={cancelQuit}
              className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Continue Quiz
            </button>
            <button
              onClick={confirmQuit}
              className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
            >
              Quit Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz completion view
  if (quizCompleted) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const grade = getScoreGrade(percentage);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Quiz Completed!
              </h2>
              <p className="text-gray-600 text-lg">
                Great job on completing the quiz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {score}
                </div>
                <div className="text-blue-800 text-sm">Correct Answers</div>
                <div className="text-blue-600 text-xs">
                  out of {quiz.questions.length}
                </div>
              </div>

              <div
                className={`bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl`}
              >
                <div
                  className={`text-3xl font-bold mb-1 ${getScoreColor(
                    percentage
                  )}`}
                >
                  {percentage}%
                </div>
                <div className="text-gray-800 text-sm">Score</div>
                <div className="text-gray-600 text-xs">Percentage</div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {grade}
                </div>
                <div className="text-purple-800 text-sm">Grade</div>
                <div className="text-purple-600 text-xs">Letter Grade</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Retake Quiz</span>
              </button>
              <button
                onClick={handleBackToDashboard}
                className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                <Home className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz not started view
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="w-full max-w-4xl mx-auto">
          <div className="mb-8">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mr-4">
                  <Target className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
                  <p className="text-blue-100 text-lg">
                    Ready to test your knowledge?
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-800">
                    {quiz.questions?.length || 0}
                  </div>
                  <div className="text-blue-600 text-sm">Questions</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">
                    {quiz.timeLimit || "N/A"}
                  </div>
                  <div className="text-green-600 text-sm">Time Limit</div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-800">
                    {quiz.maxMarks || 0}
                  </div>
                  <div className="text-purple-600 text-sm">Max Points</div>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-800">
                    {quiz.topics || "General"}
                  </div>
                  <div className="text-orange-600 text-sm">Topics</div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">
                  Instructions:
                </h3>
                <ul className="text-amber-700 space-y-2 text-sm">
                  <li>
                    • Read each question carefully before selecting your answer
                  </li>
                  <li>
                    • You can navigate between questions using the Previous/Next
                    buttons
                  </li>
                  <li>• Make sure to answer all questions before submitting</li>
                  <li>• Your progress will be saved automatically</li>
                  {quiz.timeLimit && (
                    <li>• Complete the quiz within the time limit</li>
                  )}
                </ul>
              </div>

              <div className="text-center">
                <button
                  onClick={() => handleStartQuiz(quiz._id)}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-medium text-lg shadow-lg"
                >
                  <Play className="w-6 h-6" />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress view
  const currentQ = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const hasAnswered = answers.hasOwnProperty(currentQuestion);
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <div className="text-center">
            <div className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
            {timeRemaining !== null && (
              <div
                className={`text-lg font-mono font-bold ${
                  timeRemaining < 300 ? "text-red-600" : "text-blue-600"
                }`}
              >
                <Clock className="w-4 h-4 inline mr-1" />
                {formatTime(timeRemaining)}
              </div>
            )}
          </div>

          <button
            onClick={handleQuitQuiz}
            className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors"
          >
            <X className="w-5 h-5" />
            <span>Quit</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <h2 className="text-2xl font-bold">{quiz.title}</h2>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <div className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                {currentQuestion + 1}. {currentQ.question}
              </div>

              <div className="space-y-4">
                {currentQ.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      selectedOption === optionIndex
                        ? "bg-blue-50 border-blue-400 shadow-md transform scale-[1.02]"
                        : "hover:bg-gray-50 border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="relative mr-4">
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        className="w-5 h-5 text-blue-600 opacity-0 absolute"
                        checked={selectedOption === optionIndex}
                        onChange={() =>
                          handleAnswerSelect(currentQuestion, optionIndex)
                        }
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedOption === optionIndex
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedOption === optionIndex && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <span className="text-gray-700 text-lg flex-1">
                      {option}
                    </span>
                    {selectedOption === optionIndex && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="text-sm text-gray-500">
                {Object.keys(answers).length} of {quiz.questions.length}{" "}
                answered
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={!hasAnswered}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <span>{isLastQuestion ? "Finish Quiz" : "Next"}</span>
                {!isLastQuestion && (
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                )}
                {isLastQuestion && <CheckCircle className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
