const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher"],
    default: "student",
    required: true,
  },
  avatar: {
    type: String,
    default: "👨‍💻",
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  quizzesTaken: {
    type: Number,
    default: 0,
  },
  averageScore: {
    type: Number,
    default: 0,
  },
  rank: {
    type: Number,
    default: 0,
  },
  isCurrentUser: {
    type: Boolean,
    default: false,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
