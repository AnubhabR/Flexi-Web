// components/TeacherQuizList.jsx
// This component replaces the generic 'Grid' for a much richer UI.

import React from 'react';
import { BookOpen, Clock, Award, Calendar, Eye, Edit, Trash2 } from 'lucide-react';

const TeacherQuizList = ({ quizzes }) => {
  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-gray-700">No Quizzes Found</h3>
        <p className="text-gray-500 mt-2">Create a quiz to see it here.</p>
      </div>
    );
  }

  const getDifficulty = (questionCount) => {
    if (questionCount <= 10) return { level: 'Easy', color: 'bg-emerald-100 text-emerald-800' };
    if (questionCount <= 20) return { level: 'Medium', color: 'bg-amber-100 text-amber-800' };
    return { level: 'Hard', color: 'bg-red-100 text-red-800' };
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
       <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Past Quizzes</h1>
            <p className="text-gray-600 mt-2">Review results and manage quizzes you have already conducted.</p>
       </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
        {quizzes.map((quiz, index) => {
          const difficulty = getDifficulty(quiz.questions);
          return (
            <div
              key={index}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Card Header */}
              <div className="p-6 bg-gray-50 border-b">
                 <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">{quiz.cardtitle}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${difficulty.color}`}>{difficulty.level}</span>
                 </div>
                <p className="text-sm text-gray-500 line-clamp-1">{quiz.topics}</p>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-4 mb-6 flex-1">
                  <div className="flex items-center text-gray-700">
                    <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                    <div>
                      <p className="font-bold text-base">{quiz.questions}</p>
                      <p className="text-xs text-gray-500">Questions</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-emerald-500" />
                    <div>
                      <p className="font-bold text-base">{quiz.timelimit}</p>
                      <p className="text-xs text-gray-500">Duration</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Award className="w-4 h-4 mr-2 text-purple-500" />
                    <div>
                      <p className="font-bold text-base">{quiz.maxmarks}</p>
                      <p className="text-xs text-gray-500">Points</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-red-500" />
                    <div>
                      <p className="font-bold text-base">{quiz.duedate}</p>
                      <p className="text-xs text-gray-500">Due Date</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-2 mt-auto">
                    <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl hover:bg-blue-600 transition-all font-bold flex items-center justify-center gap-2">
                        <Eye size={18}/> {quiz.btntext}
                    </button>
                    <button className="p-3 text-gray-500 bg-gray-100 hover:bg-green-100 hover:text-green-600 rounded-xl transition-colors"><Edit size={20} /></button>
                    <button className="p-3 text-gray-500 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-xl transition-colors"><Trash2 size={20} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeacherQuizList;