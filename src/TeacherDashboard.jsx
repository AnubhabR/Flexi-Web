import React, { useState } from 'react';
import * as Icon from "lucide-react";

// Import reusable components
import Sidebar from './components/sidebar.jsx';
import Table from './components/table.jsx';
import Grid from './components/grid.jsx';

// Import teacher-specific components
import MakeQuizForm from './components/MakeQuizForm.jsx';
import UploadQuestions from './components/UploadQuestions.jsx';


const TeacherDashboard = () => {
    const [activeView, setActiveView] = useState("Make Quiz");
    
    const classesData = [
        { 'Class Name': 'B.Tech CSE - A', 'Students': 34, 'Subject': 'Web Technologies' },
        { 'Class Name': 'B.Tech CSE - B', 'Students': 32, 'Subject': 'Data Structures' },
        { 'Class Name': 'M.Tech AI', 'Students': 15, 'Subject': 'Machine Learning' },
    ];

    const pastQuizzesData = [
        { cardtitle: "Mid-Term: React Basics", btntext: "View Results", quiz: true, questions: 20, timelimit: "40:00", topics: "Components, Props, State", duedate: "15/10/2024", maxmarks: 20 },
        { cardtitle: "Mid-Term: JS Fundamentals", btntext: "View Results", quiz: true, questions: 15, timelimit: "30:00", topics: "Variables, Functions, Scope", duedate: "10/10/2024", maxmarks: 15 },
    ];
    
    const renderContent = () => {
        switch (activeView) {
            case 'Make Quiz':
                return <MakeQuizForm />;
            case 'Upload Questions':
                return <UploadQuestions />;
            case 'Available Classes':
                return <Table data={classesData} />;
            case 'Past Quizzes':
                return <Grid items={pastQuizzesData} />;
            default:
                return <MakeQuizForm />;
        }
    };
    
    return (
        <>
            <Sidebar 
                user="Teacher"
                name="Prof. Alex"
                activeItem={activeView}
                onItemSelected={setActiveView}
                icons={["PlusSquare", "Upload", "Users", "History"]}
                items={["Make Quiz", "Upload Questions", "Available Classes", "Past Quizzes"]}
            />
            <main className="flex-1 flex justify-center items-center lg:ml-64 p-8">
               {renderContent()}
            </main>
        </>
    );
};

export default TeacherDashboard;

