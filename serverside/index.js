require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Ensure your User model is correctly set up

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGODB_URI; // MongoDB URI from .env
const jwtSecret = process.env.JWT_SECRET; // JWT Secret from .env

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Could not connect to MongoDB Atlas:", err));

// Signup Endpoint
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newUser = await User.create({ email, password: hashedPassword });
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
app.post('/contact', authenticateToken, (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
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

app.listen(3001, () => {
  console.log('Server is running at port 3001');
});
