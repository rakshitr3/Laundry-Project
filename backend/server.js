const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors=require("cors");

const app = express();
app.use(cors());
const PORT = 5000;
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/laundry')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// User schema for MongoDB
const userSchema = new mongoose.Schema({
  mobile: { type: String, required: false, unique: true },    //as user can either login through mobile or email so required false is there
  email: { type: String, required: false, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// JWT Secret key
const JWT_SECRET = 'rakshit12';

// Mobile number validation
const isValidMobileNumber = (mobileNumber) => {       //take mobile no as param and return it after testing
  return /^\d{10}$/.test(mobileNumber);
};

// Email validation function
const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

// Register endpoint
// Register endpoint
app.post('/api/register', async (req, res) => {
  const { mobile, email, password } = req.body;

  // Validate mobile or email
  if (mobile && !isValidMobileNumber(mobile)) {
    return res.status(400).send({ message: 'Please enter a valid mobile number (10 digits)' });
  }

  if (email && !isValidEmail(email)) {
    return res.status(400).send({ message: 'Please enter a valid email address' });
  }

  try {
    // Check if the user already exists (check both email and mobile)
    const existingUserByEmail = await User.findOne({ email: email });
if (existingUserByEmail) {
  return res.status(400).send({ message: 'User already exists with this email' });
}

const existingUserByMobile = await User.findOne({ mobile: mobile });
if (existingUserByMobile) {
  return res.status(400).send({ message: 'User already exists with this mobile number' });
}

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user to the database
    const newUser = new User({ mobile, email, password: hashedPassword });
    await newUser.save();

    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);  // Log the error for debugging purposes
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
});


// Login endpoint (using mobile number or email)
app.post('/api/login', async (req, res) => {
  const { mobile, email, password } = req.body;
  console.log(mobile,email)

  // Validate input (either mobile or email is required)
  if (!mobile && !email) {
    return res.status(400).send({ message: 'Please provide either a mobile number or email' });
  }

  try {
    // Find user based on mobile or email
    let user = null;

    if (mobile && isValidMobileNumber(mobile)) {
      user = await User.findOne({ mobile });
    }

    if (email && isValidEmail(email)) {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    // Generating JWT token
    const token = jwt.sign({ mobile: user.mobile, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

    res.json({ token });   //sending token as response
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Protected route
app.get('/api/protected', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid or expired token' });
    }
    res.send({ message: 'Protected data', user: decoded });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
