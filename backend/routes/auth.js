const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const router = express.Router();

const JWT_SECRET = 'rakshit12';

const isValidMobileNumber = (mobile) => /^\d{10}$/.test(mobile);
const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

// REGISTER
router.post('/register', async (req, res) => {
  const { name, mobile, email, password, district, pinCode, state, address } = req.body;

  if (!name || !password || (!email && !mobile)) {
    return res.status(400).send({ message: 'Name, password, and either email or mobile are required' });
  }

  if (mobile && !isValidMobileNumber(mobile)) {
    return res.status(400).send({ message: 'Invalid mobile number' });
  }

  if (email && !isValidEmail(email)) {
    return res.status(400).send({ message: 'Invalid email address' });
  }

  try {
    const existingUserByEmail = await User.findOne({ email });
    const existingUserByMobile = await User.findOne({ mobile });

    if (existingUserByEmail || existingUserByMobile) {
      return res.status(400).send({ message: 'User already exists' });
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
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { mobile, email, password } = req.body;

  if (!mobile && !email) {
    return res.status(400).send({ message: 'Provide either mobile or email' });
  }

  try {
    let user = null;    //as user can login either through mobile or email so we declare user variable here and use in mobile and email fields

    if (mobile && isValidMobileNumber(mobile)) {     //if user enter mobile for login then this will work else below will work
      user = await User.findOne({ mobile });
    }

    if (email && isValidEmail(email)) {
      user = await User.findOne({ email });

    }

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);   //compare password eneterd by user with password attached with login credentials
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, mobile: user.mobile, email: user.email },
      JWT_SECRET
    );

    res.json({ token });

  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

// PROTECTED
router.get('/protected', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(403).send({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Invalid or expired token' });

    res.send({ message: 'Protected data accessed', user: decoded });         //attach decoded data with user key
  });
});

module.exports = router;
