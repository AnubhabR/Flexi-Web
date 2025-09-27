import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  Trophy,
  TrendingUp,
  Calendar,
  Award,
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
        return "text-green-600 bg-green-100";
      case "A-":
        return "text-green-600 bg-green-100";
      case "B+":
        return "text-blue-600 bg-blue-100";
      case "B":
        return "text-blue-600 bg-blue-100";
      case "B-":
        return "text-yellow-600 bg-yellow-100";
      case "C+":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
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
      <div className="flex flex-col items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-lg text-gray-600">Loading past tests...</p>
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="w-full max-w-7xl mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          {error} - Showing sample data
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Past Tests</h1>
        <p className="text-gray-600">
          Review your completed quizzes and track your progress
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Tests Completed</p>
              <p className="text-3xl font-bold">{stats.totalQuizzes}</p>
            </div>
            <Trophy className="w-10 h-10 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Average Score</p>
              <p className="text-3xl font-bold">{stats.averageScore}%</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Best Score</p>
              <p className="text-3xl font-bold">{stats.bestScore}%</p>
            </div>
            <Award className="w-10 h-10 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Quiz History */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <h2 className="text-xl font-bold">Quiz History</h2>
        </div>

        {pastQuizzes.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Past Tests
            </h3>
            <p className="text-gray-500">
              Complete some quizzes to see your history here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {pastQuizzes.map((quiz, index) => (
              <div
                key={quiz._id}
                className="p-6 hover:bg-gray-50 transition-colors duration-200 animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {quiz.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{quiz.topics}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(quiz.completedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
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
                      <p className="text-2xl font-bold text-gray-800">
                        {Math.round((quiz.score / quiz.maxScore) * 100)}%
                      </p>
                      <p className="text-sm text-gray-500">Percentage</p>
                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(
                        quiz.grade
                      )}`}
                    >
                      {quiz.grade}
                    </div>

                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
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
  );
};

export default PastTests;
