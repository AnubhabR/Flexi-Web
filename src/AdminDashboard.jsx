import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import ActiveTests from "./components/ActiveTests";
import PastTests from "./components/PastTests";
import UpcomingTests from "./components/UpcomingTests";
import Ranking from "./components/Ranking";
import MakeQuizForm from "./components/MakeQuizForm";
import UploadQuestions from "./components/UploadQuestions";
import Table from "./components/table";
import Grid from "./components/grid";

// Define sidebar items and icons for admin
const adminSidebarItems = [
  "Dashboard",
  "Active Tests",
  "Upcoming Tests",
  "Past Tests",
  "Ranking",
  "Make Quiz",
  "Upload Questions",
  "Available Classes",
  "Past Quizzes",
  "Logout",
];
const adminSidebarIcons = [
  "LayoutDashboard",
  "ListChecks",
  "CalendarClock",
  "History",
  "BarChart3",
  "PlusSquare",
  "Upload",
  "Users",
  "History",
  "LogOut",
];

const classesData = [
  {
    "Class Name": "B.Tech CSE - A",
    Students: 34,
    Subject: "Web Technologies",
  },
  {
    "Class Name": "B.Tech CSE - B",
    Students: 32,
    Subject: "Data Structures",
  },
  { "Class Name": "M.Tech AI", Students: 15, Subject: "Machine Learning" },
];

const pastQuizzesData = [
  {
    cardtitle: "Mid-Term: React Basics",
    btntext: "View Results",
    quiz: true,
    questions: 20,
    timelimit: "40:00",
    topics: "Components, Props, State",
    duedate: "15/10/2024",
    maxmarks: 20,
  },
  {
    cardtitle: "Mid-Term: JS Fundamentals",
    btntext: "View Results",
    quiz: true,
    questions: 15,
    timelimit: "30:00",
    topics: "Variables, Functions, Scope",
    duedate: "10/10/2024",
    maxmarks: 15,
  },
];

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("Dashboard");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Add useEffect to fetch quizzes when needed
  useEffect(() => {
    if (activeView === "Active Tests") {
      fetchQuizzes();
    }
  }, [activeView]);

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

  // Add logout function with proper navigation
  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    localStorage.clear();

    // Navigate to login page
    navigate("/login");
  };

  const handleSidebarClick = (item) => {
    if (item === "Logout") {
      if (window.confirm("Are you sure you want to logout?")) {
        handleLogout();
      }
      return;
    }
    setActiveView(item);
  };

  // Admin can view quiz details but doesn't start them like students
  const handleQuizAction = (quiz) => {
    console.log("Admin viewing quiz details:", quiz);
    // You can implement admin-specific quiz actions here
    // For example, navigate to quiz management page
  };

  // Create a proper admin dashboard overview component
  const AdminDashboardOverview = () => (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6 pb-20 lg:pb-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage quizzes, users, and system overview
        </p>
      </div>

      {/* Admin Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">150</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Quizzes</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <span className="text-2xl">📝</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Questions</p>
              <p className="text-2xl font-bold text-gray-800">500</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <span className="text-2xl">❓</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed Tests</p>
              <p className="text-2xl font-bold text-gray-800">1,234</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveView("Make Quiz")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create New Quiz
          </button>
          <button
            onClick={() => setActiveView("Upload Questions")}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Upload Questions
          </button>
          <button
            onClick={() => setActiveView("Active Tests")}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            View Active Tests
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case "Dashboard":
        return <AdminDashboardOverview />;
      case "Active Tests":
        return (
          <div className="w-full pb-20 lg:pb-6">
            <ActiveTests
              quizzes={quizzes}
              loading={loading}
              error={error}
              onStartQuiz={handleQuizAction}
              isAdmin={true} // Pass a flag to indicate this is admin view
            />
          </div>
        );
      case "Upcoming Tests":
        return (
          <div className="w-full pb-20 lg:pb-6">
            <UpcomingTests />
          </div>
        );
      case "Past Tests":
        return (
          <div className="w-full pb-20 lg:pb-6">
            <PastTests />
          </div>
        );
      case "Ranking":
        return (
          <div className="w-full pb-20 lg:pb-6">
            <Ranking />
          </div>
        );
      case "Make Quiz":
        return (
          <div className="w-full pb-20 lg:pb-6">
            <MakeQuizForm />
          </div>
        );
      case "Upload Questions":
        return (
          <div className="w-full pb-20 lg:pb-6">
            <UploadQuestions />
          </div>
        );
      case "Available Classes":
        return (
          <div className="w-full pb-20 lg:pb-6">
            <Table data={classesData} />
          </div>
        );
      case "Past Quizzes":
        return (
          <div className="w-full pb-20 lg:pb-6">
            <Grid items={pastQuizzesData} />
          </div>
        );
      default:
        return <AdminDashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        role="admin"
        items={adminSidebarItems}
        icons={adminSidebarIcons}
        activeItem={activeView}
        onItemSelected={handleSidebarClick}
        user="Admin"
        name="Admin"
      />
      <main className="flex-1 flex justify-center items-start lg:ml-64 p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
