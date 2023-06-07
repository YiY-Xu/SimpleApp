const express = require('express');
const passport = require('../config/passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser.toJSON() });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create user', error: err.message });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
        return res.status(500).json({ message: 'An error occurred', error: err.message });
    }

    if (!user) {
        return res.status(401).json({ message: 'Authentication failed', error: info.message });
    }

    const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Authenticated', token, user });
  })(req, res, next);
});

module.exports = router;