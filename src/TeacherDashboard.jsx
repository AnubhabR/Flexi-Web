import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Icon from "lucide-react";

// Import reusable components
import Sidebar from "./components/sidebar.jsx";
import Table from "./components/table.jsx";
import Grid from "./components/grid.jsx";

// Import teacher-specific components
import MakeQuizForm from "./components/MakeQuizForm.jsx";
import UploadQuestions from "./components/UploadQuestions.jsx";

const TeacherDashboard = () => {
  const [activeView, setActiveView] = useState("Make Quiz");
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
  };

  const renderContent = () => {
    switch (activeView) {
      case "Make Quiz":
        return <MakeQuizForm />;
      case "Upload Questions":
        return <UploadQuestions />;
      case "Available Classes":
        return <Table data={classesData} />;
      case "Past Quizzes":
        return <Grid items={pastQuizzesData} />;
      default:
        return <MakeQuizForm />;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Sidebar
        user="Teacher"
        name="Prof. Alex"
        activeItem={activeView}
        onItemSelected={handleSidebarClick}
        icons={[
          "PlusSquare",
          "Upload",
          "Users",
          "History",
          "LogOut", // Added logout icon
        ]}
        items={[
          "Make Quiz",
          "Upload Questions",
          "Available Classes",
          "Past Quizzes",
          "Logout", // Added logout item
        ]}
      />
      <main className="flex-1 flex justify-center items-start lg:ml-64 p-8 pb-20 lg:pb-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default TeacherDashboard;
