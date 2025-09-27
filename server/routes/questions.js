const express = require("express");
const router = express.Router();
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

// @route   GET api/questions
// @desc    Get all questions
router.get("/", auth, async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// @route   GET api/questions/:ids
// @desc    Get questions by IDs
router.get("/by-ids", auth, async (req, res) => {
  try {
    const { ids } = req.query;
    const questionIds = ids.split(",").map((id) => parseInt(id));
    const questions = await Question.find({ _id: { $in: questionIds } });
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions by IDs:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

module.exports = router;
