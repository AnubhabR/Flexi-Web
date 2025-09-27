import React, { useState } from "react";
import Card from "./card";
import Grid from "./grid";
import Table from "./table";
import Sidebar from "./sidebar";
import QuizMainPage from "./quiz.jsx"; // Import your quiz main page
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
      <button onClick={handleLogout}>Logout</button>
    </div>
    
  );
}

export default Dashboard;