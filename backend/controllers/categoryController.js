const db = require('../model/db');

class CategoryController {
  // GET all categories
  static async getAll(req, res) {
    const entry_by = req.user?.id;
    const query = 'SELECT * FROM category where entry_by = ? ORDER BY id DESC';
    db.query(query, [entry_by], (err, results) => {
      if (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch categories' });
      }
      res.json(results);
    });
  }

  // POST create category
  static async create(req, res) {
    const { categoryName, categoryDetails } = req.body;
    const entry_by = req.user?.id;
    console.log('Request body:', req.body);
    console.log('User ID:', entry_by);

    if (!categoryName || !entry_by) {
      return res.status(400).json({ success: false, message: 'Category name and user required' });
    }

    const query = 'INSERT INTO category (categoryName, categoryDetails, entry_by) VALUES (?, ?, ?)';
    db.query(query, [categoryName, categoryDetails, entry_by], (err, result) => {
      if (err) {
        console.error('Error inserting category:', err);
        return res.status(500).json({ success: false, message: 'Failed to add category' });
      }
      res.status(201).json({ id: result.insertId, categoryName, categoryDetails, entry_by });
    });
  }

  // PUT update category
  static async update(req, res) {
    const { id } = req.params;
    const { categoryName, categoryDetails } = req.body;
    const entry_by = req.user?.id;

    if (!categoryName || !entry_by) {
      return res.status(400).json({ success: false, message: 'Category name and user required' });
    }

    const query = 'UPDATE category SET categoryName = ?, categoryDetails = ?, entry_by = ? WHERE id = ?';
    db.query(query, [categoryName, categoryDetails, entry_by, id], (err, result) => {
      if (err) {
        console.error('Error updating category:', err);
        return res.status(500).json({ success: false, message: 'Failed to update category' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      res.json({ success: true, message: 'Category updated successfully' });
    });
  }
}
module.exports = CategoryController;