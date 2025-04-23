// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user; // example: { id: 1, email: 'user@example.com' }
    next();
  });
}

module.exports = authenticateToken;
