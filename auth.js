const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.get('/register', (req, res) => {
  res.redirect('/register.html');
});

router.post('/register', async (req, res) => {
  const { username, password, firstName, lastName, age, gender } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, firstName, lastName, age, gender });
    await user.save();
    res.redirect('/login.html');
  } catch (error) {
    res.status(500).send('Error registering user.');
  }
});

router.get('/login', (req, res) => {
  res.redirect('/login.html');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send('User not found.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid credentials.');

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('authToken', token).redirect('/portfolio.html');
  } catch (error) {
    res.status(500).send('Error logging in.');
  }
});

module.exports = router;
