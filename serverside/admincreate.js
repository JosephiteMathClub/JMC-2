const mongoose = require('mongoose');
require('dotenv').config();

const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Make sure the path to your User model is correct
const uri = process.env.MONGODB_URI; // MongoDB URI from .env

mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000 // Close sockets after 45 seconds
})
async function createAdmin() {
    const email = 'jmcwebadmin@gmail.com'; // Admin email
    const password = 'LetInfinitybeyourLimit'; // Admin password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const adminUser = new User({
        name: "JMC",
        classd: "12",
        number: "01617367584",
        roll: "69",
        section: "Yes",
        institute: "sjhss",
        phone: "01617367584",
        email: email,
        password: hashedPassword,
        role: 'admin' // Add role if you have this field
    });

    await adminUser.save();
    console.log('Admin user created:', adminUser);
}

createAdmin().then(() => mongoose.disconnect());
