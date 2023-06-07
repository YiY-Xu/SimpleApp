const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  const { token, inputString } = req.body;

  try {
    jwt.verify(token, 'secret-key');

    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: inputString,
      max_tokens: 20,
      temperature: 0.6,
      n: 1
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-VrGalqDdNH2a0Y9PYqPET3BlbkFJf9CsFmlqvDm59w1I4N'
      }
    })
    
    console.log(response);
    res.status(200).json(response.data);

  } catch (error) {
        if (error.response) {
      // The request was made and the server responded with an error status code
      const errorResponseData = error.response.data;
      console.log(errorResponseData.error.message);
      // Pass errorResponseData to the frontend or perform any other actions
      res.status(error.response.status).json({ message: errorResponseData.error.message});
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      res.status(500).json({ error: 'No response received' });
    } else {
      // Something happened in setting up the request
      console.error('Error', error.message);
      res.status(500).json({ error: 'Request setup error' });
    }
  }
});

module.exports = router;