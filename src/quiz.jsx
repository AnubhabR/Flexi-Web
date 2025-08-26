import React, { useState } from "react";
import Card from "./components/card";

const sampleQuestions = [
	{
		question: "What is the correct way to create a component in React?",
		options: [
			"function MyComponent() {}",
			"<MyComponent />",
			"React.createComponent()",
			"component MyComponent {}",
		],
		answer: 0,
	},
	{
		question: "Which hook is used to manage state in a functional component?",
		options: ["useRef", "useState", "useEffect", "useContext"],
		answer: 1,
	},
	{
		question: "What does JSX stand for?",
		options: [
			"JavaScript XML",
			"Java Syntax Extension",
			"JavaScript Extension",
			"Java XML Syntax",
		],
		answer: 0,
	},
	{
		question: "How do you pass data from parent to child component?",
		options: [
			"Using state",
			"Using props",
			"Using setState",
			"Using useEffect",
		],
		answer: 1,
	},
];

export default function QuizMainPage({ quiz }) {
	const [quizStarted, setQuizStarted] = useState(false);

	const handleStartQuiz = () => {
		setQuizStarted(true);
	};

	return (
		<div className="flex flex-col items-center min-h-screen bg-amber-100 py-10">
			<h1 className="text-3xl font-bold mb-8 text-neutral-800">
				Welcome to the Quiz!
			</h1>
			{!quizStarted ? (
				<Card
					{...quiz}
					btntext={quiz.btntext || "Start Quiz"}
					onButtonClick={handleStartQuiz}
				/>
			) : (
				<div className="w-full max-w-2xl bg-white rounded-lg shadow p-8">
					<h2 className="text-2xl font-semibold mb-6 text-neutral-800">
						React MCQ Sample Questions
					</h2>
					<div className="flex flex-col gap-8">
						{sampleQuestions.map((q, idx) => (
							<div
								key={idx}
								className="bg-amber-50 border rounded-md p-4"
							>
								<div className="mb-4 font-medium text-lg text-neutral-800">
									{idx + 1}. {q.question}
								</div>
								<div className="flex flex-col gap-2">
									{q.options.map((opt, oidx) => (
										<label
											key={oidx}
											className="flex items-center gap-2 cursor-pointer hover:bg-amber-100 px-2 py-1 rounded transition"
										>
											<input
												type="radio"
												name={`question-${idx}`}
												className="accent-amber-600"
												disabled
											/>
											<span>{opt}</span>
										</label>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}