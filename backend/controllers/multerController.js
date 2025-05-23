const fs = require('fs');
const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user.id;
    const userFolder = path.join(__dirname, '..', 'uploads', String(userId));

    // Create folder if it doesn't exist
    fs.mkdir(userFolder, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating folder:', err);
        return cb(err, userFolder);
      }
      cb(null, userFolder);
    });
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;