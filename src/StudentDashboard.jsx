// StudentDashboard.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import QuizMainPage from "./components/quiz";
import Ranking from "./components/Ranking";
import ActiveTests from "./components/ActiveTests";
import PastTests from "./components/PastTests";
import UpcomingTests from "./components/UpcomingTests";

const StudentDashboard = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [activeView, setActiveView] = useState("Active Tests");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");

    // Clear any other stored data if needed
    localStorage.clear();

    // Navigate to login page
    navigate("/login");
  };

  // Test database connectivity
  const testDatabase = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/quizzes/test");
      const data = await response.json();
      console.log("Database test result:", data);
    } catch (err) {
      console.error("Database test failed:", err);
    }
  };

  // Fetch quizzes from MongoDB
  useEffect(() => {
    testDatabase();

    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5001/api/quizzes", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQuizzes(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes");
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Fix: Handle quiz selection - accept quiz object directly
  const handleStartQuiz = async (quiz) => {
    try {
      console.log("Starting quiz:", quiz);

      // If the quiz already has questions, use it directly
      if (quiz.questions && quiz.questions.length > 0) {
        setSelectedQuiz(quiz);
        return;
      }

      // Otherwise, fetch the full quiz with questions
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5001/api/quizzes/${quiz._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch quiz: ${response.status}`);
      }

      const quizData = await response.json();
      setSelectedQuiz(quizData);
    } catch (err) {
      console.error("Error starting quiz:", err);
      // Fallback: use the quiz object as-is if fetch fails
      setSelectedQuiz(quiz);
    }
  };

  const handleBackFromQuiz = () => {
    setSelectedQuiz(null);
  };

  // Handle sidebar navigation including logout
  const handleSidebarClick = (item) => {
    if (item === "Logout") {
      // Show confirmation dialog before logout
      if (window.confirm("Are you sure you want to logout?")) {
        handleLogout();
      }
      return;
    }

    // Set the active view for other items
    setActiveView(item);
    setSelectedQuiz(null); // Reset quiz selection when changing views
  };

  const renderContent = () => {
    if (selectedQuiz) {
      return <QuizMainPage quiz={selectedQuiz} onBack={handleBackFromQuiz} />;
    }

    switch (activeView) {
      case "Home":
        return (
          <div className="w-full max-w-4xl mx-auto text-center pb-20 lg:pb-6">
            <div className="text-6xl mb-4 animate-bounce">👋</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to Your Dashboard!
            </h2>
            <p className="text-gray-600 text-lg">
              Ready to start learning? Choose a section from the sidebar to get
              started.
            </p>
          </div>
        );
      case "Overall Score":
        return (
          <div className="w-full max-w-4xl mx-auto text-center pb-20 lg:pb-6">
            <div className="text-6xl mb-4 animate-pulse">📊</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Overall Score
            </h2>
            <p className="text-gray-600">
              Coming soon! Track your performance across all quizzes.
            </p>
          </div>
        );
      case "Ranking":
        return <Ranking />;
      case "Past Tests":
        return <PastTests />;
      case "Active Tests":
        return (
          <ActiveTests
            quizzes={quizzes}
            loading={loading}
            error={error}
            onStartQuiz={handleStartQuiz}
          />
        );
      case "Upcoming Tests":
        return <UpcomingTests />;
      default:
        return (
          <ActiveTests
            quizzes={quizzes}
            loading={loading}
            error={error}
            onStartQuiz={handleStartQuiz}
          />
        );
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Sidebar
        user="Student"
        name="Utso"
        activeItem={activeView}
        onItemSelected={handleSidebarClick}
        icons={[
          "House",
          "Tally5",
          "Medal",
          "ArrowBigLeftDash",
          "Goal",
          "ArrowBigRightDash",
          "LogOut", // Changed from "Cog" to "LogOut"
        ]}
        items={[
          "Home",
          "Overall Score",
          "Ranking",
          "Past Tests",
          "Active Tests",
          "Upcoming Tests",
          "Logout", // Changed from "Settings" to "Logout"
        ]}
      />
      <main className="flex-1 flex justify-center items-start lg:ml-64 p-8 pb-20 lg:pb-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default StudentDashboard;
