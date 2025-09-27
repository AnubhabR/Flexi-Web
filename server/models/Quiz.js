const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  topics: {
    type: String,
    required: true,
  },
  timeLimit: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  maxMarks: {
    type: Number,
    required: true,
  },
  questionIds: [
    {
      type: Number,
      required: true,
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Advanced"],
    default: "Easy",
  },
  estimatedDuration: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quiz", QuizSchema, "activeTests");
