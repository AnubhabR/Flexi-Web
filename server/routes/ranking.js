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
const rankings = [
  {
    _id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    avatar: "👩‍💻",
    totalScore: 2450,
    quizzesTaken: 25,
    averageScore: 98.0,
    rank: 1,
    isCurrentUser: false,
    joinDate: "2024-01-15",
    lastActive: "2024-12-15T10:30:00Z",
  },
  {
    _id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    avatar: "👨‍💼",
    totalScore: 2380,
    quizzesTaken: 23,
    averageScore: 96.5,
    rank: 2,
    isCurrentUser: false,
    joinDate: "2024-01-20",
    lastActive: "2024-12-14T15:45:00Z",
  },
  {
    _id: 5,
    name: "Utso",
    email: "utso@email.com",
    avatar: "👨‍💻",
    totalScore: 2180,
    quizzesTaken: 21,
    averageScore: 90.5,
    rank: 5,
    isCurrentUser: true,
    joinDate: "2024-02-10",
    lastActive: "2024-12-15T11:00:00Z",
  },
];

// @route   GET api/ranking
// @desc    Get user rankings
router.get("/", auth, async (req, res) => {
  try {
    res.json(rankings);
  } catch (err) {
    console.error("Error fetching rankings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
