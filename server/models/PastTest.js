const mongoose = require("mongoose");

const PastTestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  testId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  topics: {
    type: String,
    required: true,
  },
  completedDate: {
    type: Date,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  maxScore: {
    type: Number,
    required: true,
  },
  timeSpent: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  questionIds: [
    {
      type: Number,
    },
  ],
  answers: [
    {
      type: Number,
    },
  ],
  correctAnswers: [
    {
      type: Number,
    },
  ],
  status: {
    type: String,
    default: "completed",
  },
});

module.exports = mongoose.model("PastTest", PastTestSchema, "pastTests");
