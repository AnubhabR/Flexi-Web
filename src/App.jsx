import Card from "./components/card";
import Grid from "./components/grid";
import Table from "./components/table";

function App() {
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

  return (
    <div className="bg-neutral-800 flex justify-center items-center min-h-screen">
      <Grid items={quizzes} />
      {/* <Table data={users} /> */}
    </div>
  );
}

export default App;
