import React, { useState } from "react";
import Card from "./components/card";
import Grid from "./components/grid";
import Table from "./components/table";
import Sidebar from "./components/sidebar";
import QuizMainPage from "./quiz"; // Import your quiz main page

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const users = [
    { name: "John Doe", age: 30, city: "New York" },
    { name: "Jane Smith", age: 25, city: "Los Angeles" },
    { name: "Peter Jones", age: 45, city: "Chicago" },
    { name: "Mary Williams", age: 22, city: "Houston" },
  ];

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

  // Handler for starting a quiz
  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
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
      <div className="flex-1 flex justify-center items-center lg:ml-64">
        {!selectedQuiz ? (
          <Grid
            items={quizzes.map((quiz) => ({
              ...quiz,
              onButtonClick: () => handleStartQuiz(quiz), // Pass handler to each card
            }))}
          />
        ) : (
          <QuizMainPage quiz={selectedQuiz} />
        )}
      </div>
    </div>
  );
}

export default App;
