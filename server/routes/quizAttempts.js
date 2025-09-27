const express = require("express");
const router = express.Router();
const QuizAttempt = require("../models/QuizAttempt");
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

// @route   POST api/quiz-attempts
// @desc    Create new quiz attempt
router.post("/", auth, async (req, res) => {
  try {
    const quizAttempt = new QuizAttempt({
      ...req.body,
      userId: req.user.id,
      startTime: new Date(),
      ipAddress: req.ip,
    });

    await quizAttempt.save();
    res.json(quizAttempt);
  } catch (err) {
    console.error("Error creating quiz attempt:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// @route   PUT api/quiz-attempts/:id
// @desc    Update quiz attempt (submit)
router.put("/:id", auth, async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.id);
    if (!attempt) {
      return res.status(404).json({ msg: "Quiz attempt not found" });
    }

    Object.assign(attempt, req.body);
    attempt.endTime = new Date();
    attempt.submittedAt = new Date();
    attempt.isCompleted = true;

    await attempt.save();
    res.json(attempt);
  } catch (err) {
    console.error("Error updating quiz attempt:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

module.exports = router;
