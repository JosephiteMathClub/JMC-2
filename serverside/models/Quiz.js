// models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      answer: { type: String, required: true },
      marks: { type: Number, required: true },
    }
  ],
  totalMarks: { type: Number, required: true },
  timeAllocation: { type: Number, required: true },
  allowedClasses: [{ type: Number, required: true }],
});

module.exports = mongoose.model('Quiz', quizSchema);
