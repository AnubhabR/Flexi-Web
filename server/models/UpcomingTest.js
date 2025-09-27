const mongoose = require("mongoose");

const UpcomingTestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  scheduledDate: {
    type: String,
    required: true,
  },
  scheduledTime: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  topics: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  maxMarks: {
    type: Number,
    required: true,
  },
  questionIds: [
    {
      type: Number,
    },
  ],
  difficulty: {
    type: String,
    enum: ["Easy", "Intermediate", "Advanced", "Expert"],
    required: true,
  },
  daysLeft: {
    type: Number,
    required: true,
  },
  reminderSet: {
    type: Boolean,
    default: false,
  },
  registeredUsers: [
    {
      type: Number,
    },
  ],
  prerequisites: {
    type: String,
  },
});

module.exports = mongoose.model(
  "UpcomingTest",
  UpcomingTestSchema,
  "upcomingTests"
);
