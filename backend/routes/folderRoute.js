// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/create', authenticateToken.authToken, folderController.create);

module.exports = router;
