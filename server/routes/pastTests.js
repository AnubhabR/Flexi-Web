const express = require("express");
const router = express.Router();
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

// Mock data from CSV
const pastTests = [
  {
    _id: 1,
    userId: 5,
    testId: 101,
    title: "JavaScript Fundamentals",
    topics: "Variables, Functions, Objects",
    completedDate: "2024-12-10T14:30:00Z",
    score: 18,
    maxScore: 20,
    timeSpent: "28:45",
    percentage: 90.0,
    grade: "A",
    questionIds: [1, 2, 11, 13, 16],
    answers: [0, 0, 0, 0, 0],
    correctAnswers: [0, 0, 0, 0, 0],
    status: "completed",
  },
  {
    _id: 2,
    userId: 5,
    testId: 102,
    title: "React Basics",
    topics: "Components, Props, State",
    completedDate: "2024-12-08T16:20:00Z",
    score: 15,
    maxScore: 18,
    timeSpent: "35:20",
    percentage: 83.3,
    grade: "B+",
    questionIds: [6, 18],
    answers: [0, 0],
    correctAnswers: [0, 0],
    status: "completed",
  },
  {
    _id: 3,
    userId: 5,
    testId: 103,
    title: "CSS Grid & Flexbox",
    topics: "Layout, Grid, Flexbox",
    completedDate: "2024-12-05T11:15:00Z",
    score: 12,
    maxScore: 15,
    timeSpent: "22:15",
    percentage: 80.0,
    grade: "B",
    questionIds: [3, 4, 12],
    answers: [0, 0, 0],
    correctAnswers: [0, 0, 0],
    status: "completed",
  },
];

// @route   GET api/past-tests
// @desc    Get past tests for current user
router.get("/", auth, async (req, res) => {
  try {
    // Filter for current user (assuming user ID 5 is current user)
    const userPastTests = pastTests.filter((test) => test.userId === 5);
    res.json(userPastTests);
  } catch (err) {
    console.error("Error fetching past tests:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
