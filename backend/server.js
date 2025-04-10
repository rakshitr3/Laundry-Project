const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'rakshit12';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/laundry', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// MongoDB Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: false, unique: true },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: true },
  district: { type: String },
  pinCode: { type: String },
  state: { type: String },
  address: { type: String },
});

const User = mongoose.model('User', userSchema);

// Helpers
const isValidMobileNumber = (mobile) => /^\d{10}$/.test(mobile);
const isValidEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

// ===================== ROUTES =====================

// REGISTER
app.post('/api/register', async (req, res) => {
  const {
    name, mobile, email, password,
    district, pinCode, state, address
  } = req.body;

  // Basic validation
  if (!name || !password || (!email && !mobile)) {
    return res.status(400).send({ message: 'Name, password, and either email or mobile are required' });
  }

  if (mobile && !isValidMobileNumber(mobile)) {
    return res.status(400).send({ message: 'Please enter a valid 10-digit mobile number' });
  }

  if (email && !isValidEmail(email)) {
    return res.status(400).send({ message: 'Please enter a valid email address' });
  }

  try {
    // Check duplicates
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).send({ message: 'User already exists with this email' });
    }

    const existingUserByMobile = await User.findOne({ mobile });
    if (existingUserByMobile) {
      return res.status(400).send({ message: 'User already exists with this mobile number' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      mobile,
      email,
      password: hashedPassword,
      district,
      pinCode,
      state,
      address,
    });

    await newUser.save();
    res.status(201).send({ message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const { mobile, email, password } = req.body;

  if (!mobile && !email) {
    return res.status(400).send({ message: 'Please provide either a mobile number or email' });
  }

  try {
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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, mobile: user.mobile, email: user.email },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// PROTECTED ROUTE
app.get('/api/protected', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid or expired token' });
    }

    res.send({ message: 'Protected data accessed', user: decoded });
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
