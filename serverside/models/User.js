const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  institute: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  class: { type: String, required: true },
  section: { type: String, required: true },
  roll: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  quizzes: [
    {
      quizId: mongoose.Schema.Types.ObjectId,
      score: Number,
      individualScores: [
        {
          questionId: mongoose.Schema.Types.ObjectId,
          score: Number
        }
      ]
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
