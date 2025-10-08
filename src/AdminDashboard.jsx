import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import Dashboard from "./components/Dashboard";
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

  const handleSidebarClick = (item) => {
    if (item === "Logout") {
      if (window.confirm("Are you sure you want to logout?")) {
        localStorage.clear();
        window.location.href = "/login";
      }
      return;
    }
    setActiveView(item);
  };

  const renderContent = () => {
    switch (activeView) {
      case "Dashboard":
        return <Dashboard title="Admin Dashboard" />;
      case "Active Tests":
        return (
          <section className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Active Tests</h2>
            <ActiveTests />
          </section>
        );
      case "Upcoming Tests":
        return (
          <section className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Upcoming Tests</h2>
            <UpcomingTests />
          </section>
        );
      case "Past Tests":
        return (
          <section className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Past Tests</h2>
            <PastTests />
          </section>
        );
      case "Ranking":
        return (
          <section className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Ranking</h2>
            <Ranking />
          </section>
        );
      case "Make Quiz":
        return <MakeQuizForm />;
      case "Upload Questions":
        return <UploadQuestions />;
      case "Available Classes":
        return <Table data={classesData} />;
      case "Past Quizzes":
        return <Grid items={pastQuizzesData} />;
      default:
        return <Dashboard title="Admin Dashboard" />;
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
      <main className="flex-1 flex justify-center items-start lg:ml-64 p-8 pb-20 lg:pb-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;