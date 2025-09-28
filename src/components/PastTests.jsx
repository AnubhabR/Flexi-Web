import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  Trophy,
  TrendingUp,
  Calendar,
  Award,
  Eye,
} from "lucide-react";

const PastTests = () => {
  const [pastQuizzes, setPastQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPastQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5001/api/past-tests", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPastQuizzes(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching past tests:", err);
        setError("Failed to load past tests");
        // Fallback to mock data
        const mockPastQuizzes = [
          {
            _id: 1,
            title: "JavaScript Fundamentals",
            completedDate: "2024-12-10T14:30:00Z",
            score: 18,
            maxScore: 20,
            timeSpent: "28:45",
            topics: "Variables, Functions, Objects",
            grade: "A",
            status: "completed",
          },
          {
            _id: 2,
            title: "React Basics",
            completedDate: "2024-12-08T16:20:00Z",
            score: 15,
            maxScore: 18,
            timeSpent: "35:20",
            topics: "Components, Props, State",
            grade: "B+",
            status: "completed",
          },
          {
            _id: 3,
            title: "CSS Grid & Flexbox",
            completedDate: "2024-12-05T11:15:00Z",
            score: 12,
            maxScore: 15,
            timeSpent: "22:15",
            topics: "Layout, Grid, Flexbox",
            grade: "B",
            status: "completed",
          },
          {
            _id: 4,
            title: "Node.js Express Framework",
            completedDate: "2024-12-03T09:45:00Z",
            score: 16,
            maxScore: 20,
            timeSpent: "32:10",
            topics: "Routes, Middleware, APIs",
            grade: "B+",
            status: "completed",
          },
          {
            _id: 5,
            title: "Database Design Principles",
            completedDate: "2024-12-01T13:30:00Z",
            score: 19,
            maxScore: 20,
            timeSpent: "25:30",
            topics: "Normalization, Relationships, Indexing",
            grade: "A",
            status: "completed",
          },
        ];
        setPastQuizzes(mockPastQuizzes);
      } finally {
        setLoading(false);
      }
    };
    fetchPastQuizzes();
  }, []);

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "text-green-600 bg-green-100 border-green-200";
      case "A-":
        return "text-green-600 bg-green-100 border-green-200";
      case "B+":
        return "text-blue-600 bg-blue-100 border-blue-200";
      case "B":
        return "text-blue-600 bg-blue-100 border-blue-200";
      case "B-":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "C+":
        return "text-orange-600 bg-orange-100 border-orange-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const calculateStats = () => {
    const totalQuizzes = pastQuizzes.length;
    const totalScore = pastQuizzes.reduce((sum, quiz) => sum + quiz.score, 0);
    const totalMaxScore = pastQuizzes.reduce(
      (sum, quiz) => sum + quiz.maxScore,
      0
    );
    const averageScore =
      totalMaxScore > 0 ? ((totalScore / totalMaxScore) * 100).toFixed(1) : 0;
    const bestScore =
      pastQuizzes.length > 0
        ? Math.max(
            ...pastQuizzes.map((quiz) => (quiz.score / quiz.maxScore) * 100)
          )
        : 0;

    return { totalQuizzes, averageScore, bestScore: bestScore.toFixed(1) };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 pb-20 lg:pb-6">
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-500 border-t-transparent shadow-lg"></div>
          <div className="absolute inset-2 animate-pulse">
            <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-blue-400 opacity-30"></div>
          </div>
        </div>
        <div className="text-center max-w-md px-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            Loading Past Tests
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Gathering your quiz history...
          </p>
        </div>
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="w-full max-w-7xl mx-auto p-3 sm:p-6 pb-20 lg:pb-6 space-y-4 sm:space-y-8">
        {error && (
          <div className="mb-4 p-3 sm:p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg text-sm sm:text-base">
            {error} - Showing sample data
          </div>
        )}

        {/* Header - Mobile Responsive */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-3 sm:mb-4 shadow-lg">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Past Tests
          </h1>
          <p className="text-gray-600 text-sm sm:text-lg max-w-md mx-auto">
            Review your completed quizzes and track your progress
          </p>
        </div>

        {/* Stats Cards - Mobile Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm font-medium">
                  Tests Completed
                </p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">
                  {stats.totalQuizzes}
                </p>
                <div className="flex items-center mt-2 text-purple-200">
                  <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse"></div>
                  <span className="text-xs ml-2">All time</span>
                </div>
              </div>
              <div className="bg-purple-600 bg-opacity-50 p-2 sm:p-3 rounded-xl">
                <Trophy className="w-6 h-6 sm:w-10 sm:h-10 text-purple-200" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs sm:text-sm font-medium">
                  Average Score
                </p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">
                  {stats.averageScore}%
                </p>
                <div className="flex items-center mt-2 text-green-200">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <span className="text-xs ml-2">Overall</span>
                </div>
              </div>
              <div className="bg-green-600 bg-opacity-50 p-2 sm:p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 sm:w-10 sm:h-10 text-green-200" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs sm:text-sm font-medium">
                  Best Score
                </p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">
                  {stats.bestScore}%
                </p>
                <div className="flex items-center mt-2 text-orange-200">
                  <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse"></div>
                  <span className="text-xs ml-2">Personal best</span>
                </div>
              </div>
              <div className="bg-orange-600 bg-opacity-50 p-2 sm:p-3 rounded-xl">
                <Award className="w-6 h-6 sm:w-10 sm:h-10 text-orange-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Quiz History - Mobile Responsive */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold flex items-center">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Quiz History
            </h2>
            <p className="text-blue-100 text-sm mt-1 hidden sm:block">
              Your completed assessments and performance metrics
            </p>
          </div>

          {pastQuizzes.length === 0 ? (
            <div className="p-6 sm:p-12 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <div className="text-4xl sm:text-6xl">📚</div>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2 sm:mb-3">
                No Past Tests
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">
                Complete some quizzes to see your history here.
              </p>
              <button className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg">
                Take Your First Quiz
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {pastQuizzes.map((quiz, index) => (
                <div
                  key={quiz._id}
                  className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                  }}
                >
                  {/* Mobile Layout */}
                  <div className="block sm:hidden">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
                            {quiz.title}
                          </h3>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                            {quiz.topics}
                          </p>
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(quiz.completedDate).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" }
                              )}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {quiz.timeSpent}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ml-2 ${getGradeColor(
                          quiz.grade
                        )}`}
                      >
                        {quiz.grade}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-800">
                            {quiz.score}/{quiz.maxScore}
                          </p>
                          <p className="text-xs text-gray-500">Score</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-600">
                            {Math.round((quiz.score / quiz.maxScore) * 100)}%
                          </p>
                          <p className="text-xs text-gray-500">Percent</p>
                        </div>
                      </div>
                      <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-xs font-medium shadow-md flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        Review
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center shadow-sm">
                          <CheckCircle className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {quiz.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                          {quiz.topics}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(quiz.completedDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {quiz.timeSpent}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">
                          {quiz.score}/{quiz.maxScore}
                        </p>
                        <p className="text-sm text-gray-500">Score</p>
                      </div>

                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {Math.round((quiz.score / quiz.maxScore) * 100)}%
                        </p>
                        <p className="text-sm text-gray-500">Percentage</p>
                      </div>

                      <div
                        className={`px-3 py-2 rounded-xl text-sm font-medium border ${getGradeColor(
                          quiz.grade
                        )}`}
                      >
                        {quiz.grade}
                      </div>

                      <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg flex items-center">
                        <Eye className="w-4 h-4 mr-2" />
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default PastTests;
