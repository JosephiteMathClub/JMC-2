const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  text: String,
  writerName: String,
  publishDate: String,
  imageUrl: String,
});

module.exports = mongoose.model('Article', articleSchema);
