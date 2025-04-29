const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

class documentAuthToken {
  static docFileSizeChecker(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token, secret, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user; // example: { id: 1, email: '
      next();
    });
  }
}

module.exports = documentAuthToken;
