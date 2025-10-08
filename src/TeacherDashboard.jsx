import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import reusable components
import Sidebar from "./components/sidebar.jsx";
import Table from "./components/table.jsx";

// Import teacher-specific components
import MakeQuizForm from "./components/MakeQuizForm.jsx"; //
import UploadQuestions from "./components/UploadQuestions.jsx"; //
import TeacherQuizList from "./components/TeacherQuizList.jsx"; // <-- IMPORT THE NEW COMPONENT

const TeacherDashboard = () => {
  const [activeView, setActiveView] = useState("Make Quiz");
  const navigate = useNavigate();

  // Logout function (no changes)
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  // Data remains the same for now
  const classesData = [
    {
      "Class Name": "B.Tech CSE - A",
      Students: 34,
      Subject: "Web Technologies",
    },
    // ... other classes
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
     // ... other quizzes
  ];

  // Sidebar click handler (no changes)
  const handleSidebarClick = (item) => {
    if (item === "Logout") {
      handleLogout();
      return;
    }
    setActiveView(item);
  };

  const renderContent = () => {
    switch (activeView) {
      case "Make Quiz":
        return <MakeQuizForm />; //
      case "Upload Questions":
        return <UploadQuestions />; //
      case "Available Classes":
        return <Table data={classesData} />; //
      case "Past Quizzes":
        // USE THE NEW COMPONENT HERE
        return <TeacherQuizList quizzes={pastQuizzesData} />; //
      default:
        return <MakeQuizForm />; //
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
          "LogOut",
        ]}
        items={[
          "Make Quiz",
          "Upload Questions",
          "Available Classes",
          "Past Quizzes",
          "Logout",
        ]}
      />
      <main className="flex-1 flex justify-center items-start lg:ml-64 p-8 pb-20 lg:pb-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default TeacherDashboard;