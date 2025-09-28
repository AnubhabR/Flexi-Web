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
const upcomingTests = [
  {
    _id: 1,
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into closures, promises, and async programming",
    scheduledDate: "2024-12-20",
    scheduledTime: "10:00",
    duration: 45,
    topics: "Closures, Promises, Async/Await",
    instructor: "Prof. Johnson",
    maxMarks: 25,
    questionIds: [11, 13],
    difficulty: "Advanced",
    daysLeft: 5,
    reminderSet: false,
    registeredUsers: [1, 2, 3, 4, 5],
    prerequisites: "JavaScript Fundamentals",
  },
  {
    _id: 2,
    title: "Database Management Systems",
    description: "Comprehensive DBMS concepts and SQL",
    scheduledDate: "2024-12-22",
    scheduledTime: "14:00",
    duration: 60,
    topics: "SQL, Normalization, Indexing",
    instructor: "Dr. Smith",
    maxMarks: 30,
    questionIds: [7, 8, 15, 19],
    difficulty: "Intermediate",
    daysLeft: 7,
    reminderSet: true,
    registeredUsers: [2, 3, 5, 6, 8],
    prerequisites: "Database Basics",
  },
];

// @route   GET api/upcoming-tests
// @desc    Get all upcoming tests
router.get("/", auth, async (req, res) => {
  try {
    res.json(upcomingTests);
  } catch (err) {
    console.error("Error fetching upcoming tests:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT api/upcoming-tests/:id/reminder
// @desc    Toggle reminder for upcoming test
router.put("/:id/reminder", auth, async (req, res) => {
  try {
    const testId = parseInt(req.params.id);
    const test = upcomingTests.find((t) => t._id === testId);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    test.reminderSet = !test.reminderSet;
    res.json({
      message: "Reminder toggled",
      reminderSet: test.reminderSet,
    });
  } catch (err) {
    console.error("Error toggling reminder:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
