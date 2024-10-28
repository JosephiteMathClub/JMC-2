require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');

const uri = process.env.MONGODB_URI; // Ensure this is set in your .env file

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Could not connect to MongoDB Atlas:", err));

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signup', (req, res) => {
  User.create(req.body)
      .then(User => res.status(201).json(User))
      .catch(err => {
          console.error(err); // Log the error
          res.status(400).json({ error: err.message });
      });
});
app.post('/login', (req, res) => {
 const {email, password} = req.body
 User.findOne({email: email}).then(user =>{
  if(user){
    if(user.password === password){
      res.json('success')
    }else{
      res.json('err')
    }
  }else{
    console.log('no record')
  }
 })
});

app.listen(3001, () => {
  console.log('Server is running at port 3001');
});
