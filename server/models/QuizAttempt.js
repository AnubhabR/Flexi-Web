const mongoose = require("mongoose");

const QuizAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  quizType: {
    type: String,
    enum: ["active", "past", "upcoming"],
    default: "active",
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
  timeSpent: {
    type: String,
  },
  score: {
    type: Number,
    default: 0,
  },
  maxScore: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    default: 0,
  },
  answers: [
    {
      type: Number,
    },
  ],
  isCompleted: {
    type: Boolean,
    default: false,
  },
  submittedAt: {
    type: Date,
  },
  ipAddress: {
    type: String,
  },
});

module.exports = mongoose.model(
  "QuizAttempt",
  QuizAttemptSchema,
  "quizAttempts"
);
