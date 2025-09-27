import React, { useState } from "react";
import Grid from "./grid";
import {
  Clock,
  BookOpen,
  Target,
  Play,
  Calendar,
  Award,
  Users,
  Filter,
  Search,
  Star,
} from "lucide-react";

const ActiveTests = ({ quizzes, loading, error, onStartQuiz }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and search functionality
  const filteredQuizzes = quizzes
    .filter((quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.topics.toLowerCase().includes(searchTerm.toLowerCase());

      if (selectedFilter === "all") return matchesSearch;
      if (selectedFilter === "easy")
        return matchesSearch && (quiz.questions?.length || 0) <= 10;
      if (selectedFilter === "medium")
        return (
          matchesSearch &&
          (quiz.questions?.length || 0) > 10 &&
          (quiz.questions?.length || 0) <= 20
        );
      if (selectedFilter === "hard")
        return matchesSearch && (quiz.questions?.length || 0) > 20;

      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      if (sortBy === "questions")
        return (b.questions?.length || 0) - (a.questions?.length || 0);
      if (sortBy === "duration")
        return (
          parseInt(b.timeLimit?.split(":")[0] || "0") -
          parseInt(a.timeLimit?.split(":")[0] || "0")
        );
      return 0;
    });

  const getDifficultyLevel = (questionCount) => {
    if (questionCount <= 10)
      return {
        level: "Easy",
        color: "bg-green-100 text-green-800",
        icon: "🟢",
      };
    if (questionCount <= 20)
      return {
        level: "Medium",
        color: "bg-yellow-100 text-yellow-800",
        icon: "🟡",
      };
    return { level: "Hard", color: "bg-red-100 text-red-800", icon: "🔴" };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96">
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-gradient-to-r from-blue-500 to-purple-500 border-t-transparent"></div>
          <div className="absolute inset-0 animate-pulse">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20"></div>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Active Quizzes
          </h3>
          <p className="text-gray-500 animate-pulse">
            Preparing your learning experience...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 bg-red-50 rounded-2xl p-8">
        <div className="text-6xl mb-4 animate-bounce">🚫</div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-red-700 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
        <div className="text-8xl mb-6 animate-bounce">🎯</div>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          No Active Quizzes Available
        </h3>
        <p className="text-gray-600 text-center max-w-md text-lg">
          Looks like you're all caught up! New quizzes will appear here when
          they become available.
        </p>
        <div className="mt-6 flex space-x-3">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Browse Past Quizzes
          </button>
          <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
            Set Notifications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Active Quizzes</h1>
              <p className="text-blue-100 text-lg">
                Challenge yourself and expand your knowledge
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {quizzes.length}
                  </p>
                  <p className="text-gray-600 text-sm">Available Tests</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center">
                <Clock className="w-6 h-6 mr-3 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {Math.round(
                      quizzes.reduce((acc, quiz) => {
                        const minutes = parseInt(
                          quiz.timeLimit?.split(":")[0] || "30"
                        );
                        return acc + minutes;
                      }, 0) / quizzes.length
                    )}{" "}
                    min
                  </p>
                  <p className="text-gray-600 text-sm">Avg Duration</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center">
                <Award className="w-6 h-6 mr-3 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {quizzes.reduce(
                      (acc, quiz) => acc + (quiz.questions?.length || 0),
                      0
                    )}
                  </p>
                  <p className="text-gray-600 text-sm">Total Questions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search quizzes by title or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="easy">Easy (≤10 questions)</option>
              <option value="medium">Medium (11-20 questions)</option>
              <option value="hard">Hard ({">"}20 questions)</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="questions">Most Questions</option>
              <option value="duration">Longest Duration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz, index) => {
          const difficulty = getDifficultyLevel(quiz.questions?.length || 0);

          return (
            <div
              key={quiz._id || index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white relative">
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${difficulty.color} bg-white bg-opacity-90`}
                  >
                    {difficulty.icon} {difficulty.level}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 pr-20">{quiz.title}</h3>
                <p className="text-blue-100 text-sm">{quiz.topics}</p>

                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{Math.floor(Math.random() * 50) + 10} enrolled</span>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4
                            ? "text-yellow-300 fill-current"
                            : "text-white text-opacity-30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">
                      {quiz.questions?.length || 0} Questions
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-sm">{quiz.timeLimit || "N/A"}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Award className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="text-sm">{quiz.maxMarks || 0} Points</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-red-500" />
                    <span className="text-sm">
                      {quiz.dueDate
                        ? new Date(quiz.dueDate).toLocaleDateString()
                        : "No due date"}
                    </span>
                  </div>
                </div>

                {/* Progress Bar (Mock) */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Completion Rate
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {Math.floor(Math.random() * 40) + 60}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{
                        width: `${Math.floor(Math.random() * 40) + 60}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onStartQuiz(quiz)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center space-x-2 font-medium"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results Message */}
      {filteredQuizzes.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No quizzes found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search terms or filters
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedFilter("all");
            }}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ActiveTests;
