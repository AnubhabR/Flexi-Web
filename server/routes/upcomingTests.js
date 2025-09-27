const express = require("express");
const router = express.Router();
const UpcomingTest = require("../models/UpcomingTest");
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

// @route   GET api/upcoming-tests
// @desc    Get upcoming tests
router.get("/", auth, async (req, res) => {
  try {
    const upcomingTests = await UpcomingTest.find().sort({ daysLeft: 1 });
    res.json(upcomingTests);
  } catch (err) {
    console.error("Error fetching upcoming tests:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// @route   PUT api/upcoming-tests/:id/reminder
// @desc    Toggle reminder for upcoming test
router.put("/:id/reminder", auth, async (req, res) => {
  try {
    const test = await UpcomingTest.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ msg: "Test not found" });
    }

    test.reminderSet = !test.reminderSet;
    await test.save();

    res.json(test);
  } catch (err) {
    console.error("Error toggling reminder:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

module.exports = router;
