const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Backend App!' });
});

router.get('/about', (req, res) => {
  res.json({ message: 'This is an about route.' });
});

module.exports = router;
