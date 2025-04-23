// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, CategoryController.getAll);
router.post('/', authenticateToken, CategoryController.create);
router.put('/:id', authenticateToken, CategoryController.update);

module.exports = router;
