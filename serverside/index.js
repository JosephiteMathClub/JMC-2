require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Ensure your User model is correctly set up
const path = require('path');
const Contact = require('./models/Contact');
const Article = require('./models/Article'); // Model for the article
const Quiz = require('./models/Quiz'); 
const Result = require('./models/Result')
const bodyParser = require('body-parser');
const { isContext } = require('vm');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json
//mongoose
/**static build react */


/** */
const uri = process.env.MONGODB_URI; // MongoDB URI from .env
const jwtSecret = process.env.JWT_SECRET; // JWT Secret from .env
// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Could not connect to MongoDB Atlas:", err));

// Signup Endpoint
app.post('/signup', async (req, res) => {
  const { email, password, name, institute, classd, roll, phone, section } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newUser = await User.create({ email, password: hashedPassword, classd, roll, phone, section, name, institute });
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Middleware to verify JWT Token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token.split(' ')[1], jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user; // Add user data to request
    next();
  });
}

// Protected Contact Endpoint
app.post('/contact',async (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
  Contact.create({ email, name, message });
  res.json({ success: true });
});

// Example Protected User Info Route
// Fetch User Data Endpoint
app.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/admin', async (req, res) => {
  const { email, password } = req.body;
  try {
      const adminUser = await User.findOne({ email });
      if (!adminUser) return res.status(401).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, adminUser.password); // Compare hashed password
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      // Generate a token (set a long expiration if needed)
      const token = jwt.sign({ id: adminUser._id, role: 'admin' }, jwtSecret, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
  } catch (error) {
      console.error('Error during admin login:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

app.get('/article', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles' });
  }
});
// Add a new article (admin-protected)
app.post('/article', authenticateToken, async (req, res) => {
  // Check if user has 'admin' role
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: "Access denied" });
  }

  const { title, text, writerName, publishDate, imageUrl } = req.body;

  try {
    const newArticle = new Article({
      title,
      text,
      writerName,
      publishDate,
      imageUrl,
    });

    await newArticle.save();
    res.status(201).json({ message: 'Article created successfully', article: newArticle });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Error creating article" });
  }
});

// Create Quiz (POST /api/quiz)
app.post('/api/quiz', authenticateToken, async (req, res) => {
  // Admin check
  if (req.user.role !== 'admin') return res.status(403).json({ error: "Access denied" });

  // Destructure request body
  const { title, questions, allowedClasses, timeAllocation } = req.body;
  console.log(req.body);

  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0); // Calculate total marks

  try {
    // Create new quiz
    const newQuiz = new Quiz({
      title,
      questions,
      allowedClasses,       // Specify allowed classes here
      timeAllocation,
      totalMarks,
      published: true       // Or set to false if publishing later
    });

    // Save quiz to the database
    await newQuiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: 'Error creating quiz' });
  }
});
app.get('/api/quiz', authenticateToken, async (req, res) => {
  const userClass = req.query.class; // Retrieve the class from the query parameter

try {
    // Fetch all quizzes that allow the specified class
    const quizzes = await Quiz.find({ allowedClasses: userClass });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

// Step 1: Collect all participated quiz IDs
const participatedQuizIds = new Set(
  user.quizzes.map(quiz => quiz.quizId.toString())
);

// Step 2: Filter quizzes that haven't been participated in
const availableQuizzes = quizzes.filter(
  quiz => !participatedQuizIds.has(quiz._id.toString())
);

// Output the result for debugging
console.log("Filtered Available Quizzes: ", availableQuizzes);
    console.log('Available Quizzes:', availableQuizzes);

    res.json(availableQuizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
});

app.post('/api/quiz/submit', async (req, res) => {
  const { email, quizId, answers, startTime } = req.body;
  try {
    const quiz = await Quiz.findById(quizId);
    const user = await User.findOne({ email: email });

    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    if (!user) return res.status(404).json({ error: 'User not found' });

    let score = 0;
    const feedback = quiz.questions.map((question, index) => {
      const isCorrect = question.answer === answers[index];
      if (isCorrect) {
        score += question.marks;
      }
      return {
        questionId: question._id,
        userAnswer: answers[index],
        correctAnswer: question.answer,
        isCorrect,
        marks: isCorrect ? question.marks : 0,
      };
    });

    // Calculate total marks for the quiz
    const totalMarks = quiz.questions.reduce((sum, question) => sum + question.marks, 0);

    // Push quiz data including title and total marks
    user.quizzes.push({
      quizId,
      title: quiz.title,
      score,
      totalMarks, // Adding total marks
      individualScores: feedback.map(item => ({
        questionId: item.questionId,
        score: item.marks,
      })),
      participated: true,
    });
    await user.save();

    const result = new Result({
      email,
      quizId,
      title: quiz.title,
      score,
      timeTaken: Date.now() - startTime,
      individualScores: feedback,
    });
    await result.save();

    res.status(200).json({ message: 'Quiz submitted successfully', score, feedback });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Server error' });
  }
});





app.listen(3001, () => {
  console.log('Server is running at port 3001');
});
