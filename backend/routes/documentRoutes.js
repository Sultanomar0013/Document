const express = require('express');
const multer = require('multer');
const path = require('path');
const authenticateToken = require('../middleware/authMiddleware');
const DocumentController = require('../controllers/documentController');

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST /upload
router.post('/', authenticateToken, upload.single('file'), DocumentController.uploadDocument);

module.exports = router;
