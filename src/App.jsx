// App.jsx

import React, { useState } from "react";
import StudentDashboard from "./StudentDashboard"; // Import the new component
import TeacherDashboard from "./TeacherDashboard";

function App() {
  const [userRole, setUserRole] = useState("student"); // 'student' or 'teacher'

  return (
    <div className="bg-neutral-800 min-h-screen">
      {/* Simple Role Switcher UI */}
      <header className="bg-amber-200 p-2 flex justify-center gap-4">
        <button
          onClick={() => setUserRole("student")}
          className={`px-4 py-2 rounded font-semibold ${
            userRole === "student" ? "bg-amber-600 text-white" : "bg-amber-100"
          }`}
        >
          Student View
        </button>
        <button
          onClick={() => setUserRole("teacher")}
          className={`px-4 py-2 rounded font-semibold ${
            userRole === "teacher" ? "bg-amber-600 text-white" : "bg-amber-100"
          }`}
        >
          Teacher View
        </button>
      </header>

      {/* Conditional Rendering of Dashboards */}
      <div className="flex">
        {userRole === "student" ? <StudentDashboard /> : <TeacherDashboard />}
      </div>
    </div>
  );
}

export default App;