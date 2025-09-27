const express = require("express");
const router = express.Router();
const PastTest = require("../models/PastTest");
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

// @route   GET api/past-tests
// @desc    Get user's past tests
router.get("/", auth, async (req, res) => {
  try {
    const pastTests = await PastTest.find({ userId: req.user.id }).sort({
      completedDate: -1,
    });
    res.json(pastTests);
  } catch (err) {
    console.error("Error fetching past tests:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// @route   POST api/past-tests
// @desc    Create new past test record
router.post("/", auth, async (req, res) => {
  try {
    const pastTest = new PastTest({
      ...req.body,
      userId: req.user.id,
    });

    await pastTest.save();
    res.json(pastTest);
  } catch (err) {
    console.error("Error creating past test record:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

module.exports = router;
