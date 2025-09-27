const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// @route   GET api/quizzes/test
// @desc    Test route to check if we can access the database
router.get("/test", async (req, res) => {
  try {
    const count = await Quiz.countDocuments();
    const sampleQuiz = await Quiz.findOne();
    res.json({
      message: "Database connection successful",
      totalQuizzes: count,
      sampleQuiz: sampleQuiz,
    });
  } catch (err) {
    console.error("Database test error:", err);
    res.status(500).json({
      error: "Database connection failed",
      details: err.message,
    });
  }
});

// @route   GET api/quizzes
// @desc    Get all available quizzes for students
router.get("/", auth, async (req, res) => {
  try {
    console.log("Fetching quizzes from database...");

    const quizzes = await Quiz.find({ isActive: true })
      .select(
        "title topics timeLimit dueDate maxMarks questionIds difficulty estimatedDuration createdBy"
      )
      .sort({ createdAt: -1 });

    console.log(`Found ${quizzes.length} quizzes`);

    // Process the data and fetch questions for each quiz
    const processedQuizzes = await Promise.all(
      quizzes.map(async (quiz) => {
        let questionIds = quiz.questionIds;

        // If questionIds is a string (from CSV), parse it
        if (typeof questionIds === "string") {
          try {
            questionIds = JSON.parse(questionIds);
          } catch (e) {
            console.error("Error parsing questionIds for quiz:", quiz.title);
            questionIds = [];
          }
        }

        // Fetch questions by IDs
        const questions = await Question.find({ _id: { $in: questionIds } });

        return {
          ...quiz.toObject(),
          questions: questions,
          questionCount: questions.length,
        };
      })
    );

    res.json(processedQuizzes);
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// @route   GET api/quizzes/:id
// @desc    Get specific quiz details with questions
router.get("/:id", auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    // Process questionIds and fetch questions
    let questionIds = quiz.questionIds;
    if (typeof questionIds === "string") {
      try {
        questionIds = JSON.parse(questionIds);
      } catch (e) {
        console.error("Error parsing questionIds for quiz:", quiz.title);
        questionIds = [];
      }
    }

    const questions = await Question.find({ _id: { $in: questionIds } });

    res.json({
      ...quiz.toObject(),
      questions: questions,
    });
  } catch (err) {
    console.error("Error fetching quiz:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

module.exports = router;
