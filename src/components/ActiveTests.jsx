import React, { useState } from "react";
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
  TrendingUp,
  Zap,
  ChevronRight,
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
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        bgGradient: "from-emerald-400 to-teal-500",
        icon: "🌟",
      };
    if (questionCount <= 20)
      return {
        level: "Medium",
        color: "bg-amber-100 text-amber-800 border-amber-200",
        bgGradient: "from-amber-400 to-orange-500",
        icon: "⚡",
      };
    return {
      level: "Hard",
      color: "bg-red-100 text-red-800 border-red-200",
      bgGradient: "from-red-400 to-pink-500",
      icon: "🔥",
    };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 pb-20 lg:pb-6">
        <div className="relative mb-8">
          {/* Animated rings */}
          <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 border-4 border-gradient-to-r from-blue-500 to-purple-500 border-t-transparent shadow-lg"></div>
          <div className="absolute inset-2 animate-pulse">
            <div className="h-12 w-12 sm:h-20 sm:w-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30"></div>
          </div>
          <div className="absolute inset-3 sm:inset-4 animate-bounce">
            <div className="h-10 w-10 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 opacity-50"></div>
          </div>
        </div>
        <div className="text-center max-w-md px-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
            Loading Your Quizzes
          </h3>
          <p className="text-sm sm:text-base text-gray-600 animate-pulse">
            We're preparing an amazing learning experience for you...
          </p>
          <div className="flex justify-center mt-4 space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4 pb-20 lg:pb-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <div className="text-3xl sm:text-4xl animate-bounce">⚠️</div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-red-700 mb-2 sm:mb-3">
            Oops! Something went wrong
          </h3>
          <p className="text-sm sm:text-base text-red-600 mb-4 sm:mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 pb-20 lg:pb-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-w-lg w-full text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <div className="text-4xl sm:text-5xl animate-pulse">🎯</div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
            No Active Quizzes Available
          </h3>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            You're all caught up! New quizzes will appear here when they become
            available.
          </p>
          <div className="flex flex-col gap-3 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg text-sm sm:text-base">
              Browse Past Quizzes
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium text-sm sm:text-base">
              Set Notifications
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tests = quizzes;

  const activeTests = (tests || []).filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.topics.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "easy")
      return matchesSearch && (test.questions?.length || 0) <= 10;
    if (selectedFilter === "medium")
      return (
        matchesSearch &&
        (test.questions?.length || 0) > 10 &&
        (test.questions?.length || 0) <= 20
      );
    if (selectedFilter === "hard")
      return matchesSearch && (test.questions?.length || 0) > 20;

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Add bottom padding on mobile to prevent content being hidden behind navbar */}
      <div className="w-full max-w-7xl mx-auto p-3 sm:p-6 pb-20 lg:pb-6 space-y-4 sm:space-y-8">
        {/* Enhanced Hero Section - Mobile Responsive */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white overflow-hidden shadow-2xl">
          {/* Animated background elements - Hidden on mobile for performance */}
          <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
          <div className="hidden sm:block absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-32 -translate-x-32 animate-pulse"></div>
          <div className="hidden sm:block absolute top-1/2 left-1/2 w-32 h-32 bg-white opacity-10 rounded-full -translate-x-16 -translate-y-16 animate-bounce"></div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-0 sm:mr-6 shadow-lg">
                <Target className="w-6 h-6 sm:w-10 sm:h-10" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-5xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text">
                  Active Quizzes
                </h1>
                <p className="text-blue-100 text-sm sm:text-xl">
                  Challenge yourself and expand your knowledge
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mt-4 sm:mt-8">
              <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 sm:p-3 rounded-lg sm:rounded-xl mr-3 sm:mr-4">
                    <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-3xl font-bold text-gray-800">
                      {quizzes.length}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">
                      Available Tests
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center">
                  <div className="bg-emerald-500 p-2 sm:p-3 rounded-lg sm:rounded-xl mr-3 sm:mr-4">
                    <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-3xl font-bold text-gray-800">
                      {Math.round(
                        quizzes.reduce((acc, quiz) => {
                          const minutes = parseInt(
                            quiz.timeLimit?.split(":")[0] || "30"
                          );
                          return acc + minutes;
                        }, 0) / quizzes.length
                      )}{" "}
                      <span className="text-sm sm:text-lg">min</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">
                      Avg Duration
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 sm:col-span-2 md:col-span-1">
                <div className="flex items-center">
                  <div className="bg-purple-500 p-2 sm:p-3 rounded-lg sm:rounded-xl mr-3 sm:mr-4">
                    <Award className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-3xl font-bold text-gray-800">
                      {quizzes.reduce(
                        (acc, quiz) => acc + (quiz.questions?.length || 0),
                        0
                      )}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">
                      Total Questions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter Section - Mobile Responsive */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-100">
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-sm sm:text-lg"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-8 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white font-medium text-sm sm:text-base"
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy (≤10 questions)</option>
                  <option value="medium">Medium (11-20 questions)</option>
                  <option value="hard">Hard ({">"}20 questions)</option>
                </select>
              </div>

              <div className="relative flex-1">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-8 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white font-medium text-sm sm:text-base"
                >
                  <option value="newest">Newest First</option>
                  <option value="questions">Most Questions</option>
                  <option value="duration">Longest Duration</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quizzes Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-8">
          {filteredQuizzes.map((quiz, index) => {
            const difficulty = getDifficultyLevel(quiz.questions?.length || 0);

            return (
              <div
                key={quiz._id || index}
                className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-3 overflow-hidden border border-gray-100 flex flex-col h-full"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: `fadeInUp 0.6s ease-out forwards`,
                }}
              >
                {/* Enhanced Card Header - Mobile Responsive */}
                <div
                  className={`bg-gradient-to-br ${difficulty.bgGradient} text-white relative overflow-hidden flex-shrink-0`}
                  style={{
                    minHeight: window.innerWidth < 640 ? "160px" : "200px",
                  }}
                >
                  <div className="hidden sm:block absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>

                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold border-2 ${difficulty.color} bg-white shadow-lg`}
                    >
                      <span className="hidden sm:inline">
                        {difficulty.icon}{" "}
                      </span>
                      {difficulty.level}
                    </span>
                  </div>

                  <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3
                        className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 leading-tight line-clamp-2"
                        style={{
                          minHeight:
                            window.innerWidth < 640 ? "2.5rem" : "3.5rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {quiz.title}
                      </h3>
                      <p
                        className="text-white text-opacity-90 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2"
                        style={{
                          minHeight:
                            window.innerWidth < 640 ? "2rem" : "2.5rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {quiz.topics}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs bg-white bg-opacity-20 px-2 py-1 rounded-lg">
                        <Users className="w-3 h-3 mr-1" />
                        <span className="text-xs">
                          {Math.floor(Math.random() * 50) + 10}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < 4
                                ? "text-yellow-300 fill-current"
                                : "text-white text-opacity-40"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Card Body - Mobile Responsive */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6 flex-1">
                    <div className="flex items-center text-gray-700 bg-gray-50 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-sm sm:text-base">
                          {quiz.questions?.length || 0}
                        </p>
                        <p className="text-xs text-gray-600">Questions</p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-700 bg-gray-50 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-emerald-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-sm sm:text-base truncate">
                          {quiz.timeLimit || "N/A"}
                        </p>
                        <p className="text-xs text-gray-600">Duration</p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-700 bg-gray-50 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-purple-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-sm sm:text-base">
                          {quiz.maxMarks || 0}
                        </p>
                        <p className="text-xs text-gray-600">Points</p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-700 bg-gray-50 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-red-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-xs">
                          {quiz.dueDate
                            ? new Date(quiz.dueDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : "No due"}
                        </p>
                        <p className="text-xs text-gray-600">Due Date</p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Action Button - Mobile Responsive */}
                  <button
                    onClick={() => onStartQuiz(quiz)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center space-x-2 font-bold shadow-lg hover:shadow-xl mt-auto text-sm sm:text-base"
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Start Quiz</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced No Results Message - Mobile Responsive */}
        {filteredQuizzes.length === 0 && searchTerm && (
          <div className="text-center py-12 sm:py-16 bg-white rounded-2xl sm:rounded-3xl shadow-xl mx-2 sm:mx-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <div className="text-3xl sm:text-4xl">🔍</div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2 sm:mb-3">
              No quizzes found
            </h3>
            <p className="text-gray-500 text-base sm:text-lg mb-4 sm:mb-6 px-4">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("all");
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg text-sm sm:text-base"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: "vertical";
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ActiveTests;
