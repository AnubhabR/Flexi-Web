// StudentDashboard.jsx

import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import Grid from "./components/grid";
import QuizMainPage from "./quiz";

const StudentDashboard = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [activeView, setActiveView] = useState("Active Tests");

  // This data was moved from App.jsx
  const quizzes = [
    {
      cardtitle: "Quiz on React JS",
      btntext: "Start",
      quiz: true,
      questions: 20,
      timelimit: "40:00",
      topics: "React Basics, Hooks",
      duedate: "10/12/2025",
      maxmarks: 20,
    },
    {
      cardtitle: "Quiz on JavaScript",
      btntext: "Begin",
      quiz: true,
      questions: 15,
      timelimit: "30:00",
      topics: "ES6, Closures",
      duedate: "11/12/2025",
      maxmarks: 15,
    },
    {
      cardtitle: "Quiz on React JS",
      btntext: "Start",
      quiz: true,
      questions: 20,
      timelimit: "40:00",
      topics: "React Basics, Hooks",
      duedate: "10/12/2025",
      maxmarks: 20,
    },
    {
      cardtitle: "Quiz on JavaScript",
      btntext: "Begin",
      quiz: true,
      questions: 15,
      timelimit: "30:00",
      topics: "ES6, Closures",
      duedate: "11/12/2025",
      maxmarks: 15,
    },
    {
      cardtitle: "Quiz on React JS",
      btntext: "Start",
      quiz: true,
      questions: 20,
      timelimit: "40:00",
      topics: "React Basics, Hooks",
      duedate: "10/12/2025",
      maxmarks: 20,
    },
    {
      cardtitle: "Quiz on JavaScript",
      btntext: "Begin",
      quiz: true,
      questions: 15,
      timelimit: "30:00",
      topics: "ES6, Closures",
      duedate: "11/12/2025",
      maxmarks: 15,
    },
    {
      cardtitle: "Quiz on JavaScript",
      btntext: "Begin",
      quiz: true,
      questions: 15,
      timelimit: "30:00",
      topics: "ES6, Closures",
      duedate: "11/12/2025",
      maxmarks: 15,
    },
    {
      cardtitle: "Quiz on JavaScript",
      btntext: "Begin",
      quiz: true,
      questions: 15,
      timelimit: "30:00",
      topics: "ES6, Closures",
      duedate: "11/12/2025",
      maxmarks: 15,
    },
    {
      cardtitle: "Quiz on CSS",
      btntext: "Go",
      quiz: true,
      questions: 10,
      timelimit: "20:00",
      topics: "Flexbox, Grid",
      duedate: "12/12/2025",
      maxmarks: 10,
    },
    {
      cardtitle: "Quiz on JavaScript",
      btntext: "Begin",
      quiz: true,
      questions: 15,
      timelimit: "30:00",
      topics: "ES6, Closures",
      duedate: "11/12/2025",
      maxmarks: 15,
    },
  ];

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const renderContent = () => {
    switch (activeView) {
      case "Home":
        return <div className="text-2xl">Welcome to Dashboard</div>;
      case "Overall Score":
        return <div className="text-2xl">Your Overall Score</div>;
      case "Ranking":
        return <div className="text-2xl">Your Ranking</div>;
      case "Past Tests":
        return <div className="text-2xl">Past Tests</div>;
      case "Active Tests":
        return !selectedQuiz ? (
          <Grid
            items={quizzes.map((quiz) => ({
              ...quiz,
              onButtonClick: () => handleStartQuiz(quiz),
            }))}
          />
        ) : (
          <QuizMainPage quiz={selectedQuiz} />
        );
      case "Upcoming Tests":
        return <div className="text-2xl">Upcoming Tests</div>;
      case "Settings":
        return <div className="text-2xl">Settings</div>;
      default:
        return !selectedQuiz ? (
          <Grid
            items={quizzes.map((quiz) => ({
              ...quiz,
              onButtonClick: () => handleStartQuiz(quiz),
            }))}
          />
        ) : (
          <QuizMainPage quiz={selectedQuiz} />
        );
    }
  };

  return (
    <div className="flex w-full">
      <Sidebar
        user="Student"
        name="Utso"
        activeItem={activeView}
        onItemSelected={setActiveView}
        icons={[
          "House",
          "Tally5",
          "Medal",
          "ArrowBigLeftDash",
          "Goal",
          "ArrowBigRightDash",
          "Cog",
        ]}
        items={[
          "Home",
          "Overall Score",
          "Ranking",
          "Past Tests",
          "Active Tests",
          "Upcoming Tests",
          "Settings",
        ]}
      />
      <main className="flex-1 flex justify-center items-center lg:ml-64 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default StudentDashboard;
