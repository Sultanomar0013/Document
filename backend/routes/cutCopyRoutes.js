// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const cutCopyController = require('../controllers/custCopyController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/cut', authenticateToken.authToken, cutCopyController.cut);

module.exports = router;
