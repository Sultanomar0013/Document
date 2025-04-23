const db = require('../model/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const jwtSecret = process.env.JWT_SECRET;

class AuthController {
  // Signup Middleware
  static async signup(req, res, next) {
    const { email, userName, password } = req.body;
    console.log('Signup Request Body:', req.body);

    if (!email || !userName || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      req.body.hashedPassword = hashedPassword;

      const query = 'INSERT INTO user (email, userName, password) VALUES (?, ?, ?)';
      db.query(query, [email, userName, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error inserting user data:', err);
          return res.status(500).json({ success: false, message: 'Sign-in failed' });
        }
      })
      // you can get the user id from the result of the insert query

      // req.user = { id: result.insertId, email, userName };
      next();
    } catch (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ success: false, message: 'Signup failed' });
    }
  }

  // Login Middleware
  static async login(req, res, next) {
    const { email, password } = req.body;
    console.log('Login Request Body:', req.body);

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const query = 'SELECT * FROM user WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error retrieving user:', err);
        return res.status(500).json({ success: false, message: 'Login failed' });
      }

      if (results.length === 0) {
        return res.status(400).json({ success: false, message: 'Unable to log in' });
      }

      const user = results[0];
      const hashedPassword = user.password;

      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ success: false, message: 'Login failed' });
        }
 
        if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Incorrect email or password' });
        }

        req.user = user;

        // const user = req.user
        console.log('Request body:', req.user);
        const token = jwt.sign({ id: user.id, email: user.email },
          jwtSecret,
          { expiresIn: '7h' })

          req.token = token;
        //console.log('Generated JWT:', token);
        next();
      });
    });


  }



  static async verifyToken(req, res, next) {
    // const token = req.headers['authorization']?.split(' ')[1];

    // if (!token) {
    //   return res.status(401).json({ success: false, message: 'No token provided' });
    // }

    // jwt.verify(token, jwtSecret, (err, decoded) => {
    //   if (err) {
    //     console.error('Token verification error:', err);
    //     return res.status(401).json({ success: false, message: 'Invalid token' });
    //   }

    //   req.user = decoded;
    //   next();
    // });


    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Get the token after "Bearer"

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token missing or malformed' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }

      req.user = decoded;
      next();
    });
  }




  static logout(req, res) {
    // Invalidate the token on the client side by removing it from local storage
    // No server-side action needed for JWT
    res.json({ success: true, message: 'Logout successful' });
  }



  static async getUser(req, res) {
    const userId = req.user.id;

    const query = 'SELECT * FROM user WHERE id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error retrieving user:', err);
        return res.status(500).json({ success: false, message: 'Failed to retrieve user' });
      }

      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const user = results[0];
      delete user.password; // Remove password from the response
      res.json({ success: true, user });
    });
  }
}

module.exports = AuthController;
