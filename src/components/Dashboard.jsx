import React, { useState, useEffect } from "react";
import Grid from "./grid";
import Sidebar from "./sidebar";
import QuizMainPage from "./quiz.jsx";
import { useNavigate } from "react-router-dom";
import ActiveTests from "./ActiveTests";
import PastTests from "./PastTests";
import UpcomingTests from "./UpcomingTests";
import Ranking from "./Ranking";
import { logout } from "../utils/auth";

function Dashboard() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [activeTab, setActiveTab] = useState("active");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  // Fetch quizzes when active tab is selected
  useEffect(() => {
    if (activeTab === "active") {
      fetchQuizzes();
    }
  }, [activeTab]);

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
    } finally {
      setLoading(false);
    }
  };

  // Handler for starting a quiz
  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
  };

  // Handle sidebar navigation
  const handleSidebarClick = (item) => {
    if (item === "Logout") {
      // Show confirmation dialog before logout
      if (window.confirm("Are you sure you want to logout?")) {
        handleLogout();
      }
      return;
    }

    // Map items to tab names
    const tabMap = {
      Home: "active",
      "Overall Score": "score",
      Ranking: "ranking",
      "Past Tests": "past",
      "Active Tests": "active",
      "Upcoming Tests": "upcoming",
    };

    const selectedTab = tabMap[item] || "active";
    setActiveTab(selectedTab);
    setSelectedQuiz(null); // Reset quiz selection when changing tabs
  };

  const renderContent = () => {
    if (selectedQuiz) {
      return <QuizMainPage quiz={selectedQuiz} />;
    }

    switch (activeTab) {
      case "active":
      case "home":
        return (
          <ActiveTests
            quizzes={quizzes}
            loading={loading}
            error={error}
            onStartQuiz={handleStartQuiz}
          />
        );
      case "past":
        return <PastTests />;
      case "upcoming":
        return <UpcomingTests />;
      case "ranking":
        return <Ranking />;
      case "score":
        return (
          <div className="text-center p-8 pb-20 lg:pb-6">
            <h2 className="text-2xl font-bold mb-4">Overall Score</h2>
            <p>Your performance dashboard coming soon...</p>
          </div>
        );
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
    <div className="bg-neutral-800 flex min-h-screen">
      <Sidebar
        user="Student"
        name="Utso"
        icons={[
          "House",
          "Tally5",
          "Medal",
          "ArrowBigLeftDash",
          "Goal",
          "ArrowBigRightDash",
          "LogOut", // Replaced Settings icon with LogOut
        ]}
        items={[
          "Home",
          "Overall Score",
          "Ranking",
          "Past Tests",
          "Active Tests",
          "Upcoming Tests",
          "Logout", // Replaced Settings with Logout
        ]}
        activeItem={(() => {
          const itemMap = {
            active: "Home",
            score: "Overall Score",
            ranking: "Ranking",
            past: "Past Tests",
            upcoming: "Upcoming Tests",
          };
          return itemMap[activeTab] || "Home";
        })()}
        onItemSelected={handleSidebarClick}
      />

      <div className="flex-1 flex justify-center items-center lg:ml-64">
        <div className="w-full p-6">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
