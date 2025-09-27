const express = require("express");
const router = express.Router();
const User = require("../models/User");
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

// @route   GET api/ranking
// @desc    Get user rankings
router.get("/", auth, async (req, res) => {
  try {
    const rankings = await User.find({ role: "student" })
      .select(
        "name email avatar totalScore quizzesTaken averageScore rank isCurrentUser joinDate lastActive"
      )
      .sort({ totalScore: -1 });

    // Update ranks based on totalScore
    rankings.forEach((user, index) => {
      user.rank = index + 1;
    });

    res.json(rankings);
  } catch (err) {
    console.error("Error fetching rankings:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// @route   PUT api/ranking/update-score
// @desc    Update user score after quiz completion
router.put("/update-score", auth, async (req, res) => {
  try {
    const { score, maxScore } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.totalScore += score;
    user.quizzesTaken += 1;
    user.averageScore = (user.totalScore / user.quizzesTaken).toFixed(1);
    user.lastActive = new Date();

    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Error updating user score:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

module.exports = router;
