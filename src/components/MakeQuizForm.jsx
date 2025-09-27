import React from 'react';

/**
 * MakeQuizForm Component: A form for creating a quiz.
 */
const MakeQuizForm = () => {
    return (
        <div className="w-full max-w-2xl p-8 space-y-6 bg-amber-50 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-neutral-800">Create a New Quiz</h2>
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="quiz-title" className="block text-sm font-medium text-gray-700">Quiz Title</label>
                        <input type="text" id="quiz-title" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                    </div>
                    <div>
                        <label htmlFor="due-date" className="block text-sm font-medium text-gray-700">Due Date</label>
                        <input type="date" id="due-date" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                    </div>
                    <div>
                        <label htmlFor="time-limit" className="block text-sm font-medium text-gray-700">Time Limit (Minutes)</label>
                        <input type="number" id="time-limit" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                    </div>
                    <div>
                        <label htmlFor="max-marks" className="block text-sm font-medium text-gray-700">Max Marks</label>
                        <input type="number" id="max-marks" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                    </div>
                </div>
                <div>
                    <label htmlFor="topics" className="block text-sm font-medium text-gray-700">Topics (comma-separated)</label>
                    <input type="text" id="topics" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                </div>
                <div>
                    <label htmlFor="course-outcomes" className="block text-sm font-medium text-gray-700">Course Outcomes</label>
                    <textarea id="course-outcomes" rows="3" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"></textarea>
                </div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                    Create Quiz
                </button>
            </form>
        </div>
    );
};

export default MakeQuizForm;
