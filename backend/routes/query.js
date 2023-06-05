const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const router = express.Router();

router.post('/', (req, res) => {
  const { token, inputString } = req.body;

  try {
    jwt.verify(token, 'secret-key');

    axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: inputString,
      max_tokens: 100,
      temperature: 0.6,
      n: 1
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    })
    .then((response) => {
        console.log(response);
        res.status(200).json({ result: response.data });
      })
      .catch((err) => {
        res.status(500).json({ message: 'An error occurred', error: err.message });
      });
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
});

module.exports = router;