import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  AlertCircle,
  Bell,
  BookOpen,
  Users,
} from "lucide-react";

const UpcomingTests = () => {
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5001/api/upcoming-tests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUpcomingQuizzes(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching upcoming tests:", err);
        setError("Failed to load upcoming tests");
        // Fallback to mock data
        const mockUpcomingQuizzes = [
          {
            _id: 1,
            title: "Advanced JavaScript Concepts",
            scheduledDate: "2024-12-20",
            scheduledTime: "10:00",
            duration: "45:00",
            topics: "Closures, Promises, Async/Await",
            instructor: "Prof. Johnson",
            maxMarks: 25,
            questions: 20,
            difficulty: "Advanced",
            daysLeft: 5,
            reminderSet: false,
          },
          {
            _id: 2,
            title: "Database Management Systems",
            scheduledDate: "2024-12-22",
            scheduledTime: "14:00",
            duration: "60:00",
            topics: "SQL, Normalization, Indexing",
            instructor: "Dr. Smith",
            maxMarks: 30,
            questions: 25,
            difficulty: "Intermediate",
            daysLeft: 7,
            reminderSet: true,
          },
        ];
        setUpcomingQuizzes(mockUpcomingQuizzes);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcomingQuizzes();
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100";
      case "Intermediate":
        return "text-yellow-600 bg-yellow-100";
      case "Advanced":
        return "text-red-600 bg-red-100";
      case "Expert":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getUrgencyColor = (daysLeft) => {
    if (daysLeft <= 3) return "border-red-500 bg-red-50";
    if (daysLeft <= 7) return "border-yellow-500 bg-yellow-50";
    return "border-green-500 bg-green-50";
  };

  const toggleReminder = async (testId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5001/api/upcoming-tests/${testId}/reminder`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setUpcomingQuizzes((prev) =>
          prev.map((quiz) =>
            quiz._id === testId
              ? { ...quiz, reminderSet: !quiz.reminderSet }
              : quiz
          )
        );
      }
    } catch (err) {
      console.error("Error toggling reminder:", err);
      // Fallback to local state update
      setUpcomingQuizzes((prev) =>
        prev.map((quiz) =>
          quiz._id === testId
            ? { ...quiz, reminderSet: !quiz.reminderSet }
            : quiz
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
        <p className="mt-4 text-lg text-gray-600">Loading upcoming tests...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          {error} - Showing sample data
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Calendar className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Upcoming Tests
        </h1>
        <p className="text-gray-600">
          Stay prepared for your scheduled quizzes and exams
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-4 rounded-lg shadow-lg">
          <div className="text-center">
            <p className="text-3xl font-bold">{upcomingQuizzes.length}</p>
            <p className="text-purple-100 text-sm">Total Tests</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-4 rounded-lg shadow-lg">
          <div className="text-center">
            <p className="text-3xl font-bold">
              {upcomingQuizzes.filter((quiz) => quiz.daysLeft <= 3).length}
            </p>
            <p className="text-red-100 text-sm">This Week</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-lg">
          <div className="text-center">
            <p className="text-3xl font-bold">
              {upcomingQuizzes.reduce(
                (sum, quiz) => sum + (quiz.questions || 0),
                0
              )}
            </p>
            <p className="text-blue-100 text-sm">Total Questions</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-lg shadow-lg">
          <div className="text-center">
            <p className="text-3xl font-bold">
              {upcomingQuizzes.filter((quiz) => quiz.reminderSet).length}
            </p>
            <p className="text-green-100 text-sm">Reminders Set</p>
          </div>
        </div>
      </div>

      {/* Upcoming Tests List */}
      {upcomingQuizzes.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-96">
          <div className="text-8xl mb-4 animate-bounce">🎯</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No Upcoming Tests
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            You're all caught up! No tests are scheduled at the moment.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {upcomingQuizzes.map((quiz, index) => (
            <div
              key={quiz._id}
              className={`bg-white rounded-xl shadow-lg border-l-4 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${getUrgencyColor(
                quiz.daysLeft
              )}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {quiz.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{quiz.topics}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {quiz.instructor}
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {quiz.questions || "TBD"} questions
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                          quiz.difficulty
                        )}`}
                      >
                        {quiz.difficulty}
                      </div>
                      <div className="mt-2">
                        <span
                          className={`text-2xl font-bold ${
                            quiz.daysLeft <= 3
                              ? "text-red-600"
                              : quiz.daysLeft <= 7
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {quiz.daysLeft}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          days left
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {quiz.scheduledDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {quiz.scheduledTime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {quiz.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {quiz.maxMarks} marks
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => toggleReminder(quiz._id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          quiz.reminderSet
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        <Bell className="w-4 h-4" />
                        <span className="text-sm">
                          {quiz.reminderSet ? "Reminder Set" : "Set Reminder"}
                        </span>
                      </button>

                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        View Details
                      </button>
                    </div>

                    {quiz.daysLeft <= 3 && (
                      <div className="flex items-center space-x-2 text-red-600 animate-pulse">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Due Soon!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingTests;
