const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');


router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Backend App!' });
});

// Signup Route
router.post('/signup', AuthMiddleware.signup, (req, res) => {
    res.json({ success: true, message: 'Sign-in successful' });
});

// Login Route
router.post('/login', AuthMiddleware.login, (req, res) => {
  res.json({
    success: true,
    message: 'Login successful',
    token: req.token, // 👉 get token from middleware
    user: req.user,   // optional: send user info too
  });
});

router.post('/auth', AuthMiddleware.verifyToken, (req, res) => {
  res.json({ success: true, message: 'Token is valid' });
});
// Logout Route
router.post('/logout', AuthMiddleware.logout, (req, res) => {
  res.json({ success: true, message: 'Logout successful' });
});


module.exports = router;
