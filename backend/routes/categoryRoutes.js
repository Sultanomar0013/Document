// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken.authToken, CategoryController.getAll);
router.post('/', authenticateToken.authToken, CategoryController.create);
router.put('/:id', authenticateToken.authToken, CategoryController.update);

module.exports = router;
 