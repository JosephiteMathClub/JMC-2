// models/Result.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  email: { type: String, ref: 'User', required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  title: String,
  score: Number,
  timeTaken: Number,
  individualScores: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      score: Number
    }
  ],
});

module.exports = mongoose.model('Result', resultSchema);
