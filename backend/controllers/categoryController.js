const db = require('../model/db');

class CategoryController {
  // GET all categories
  static async create(req, res) {
    const { category_name, category_details } = req.body;
    const entry_by = req.user?.id;

    console.log('Request body:', req.body);
    console.log('User ID:', entry_by);

    if (!category_name || !entry_by) {
      return res.status(400).json({ success: false, message: 'Category name and user required' });
    }

    const query = 'INSERT INTO category (category_name, category_details, entry_by) VALUES (?, ?, ?)';

    try {
      const [result] = await db.query(query, [category_name, category_details, entry_by]);

      res.status(201).json({
        id: result.insertId,
        category_name,
        category_details,
        entry_by
      });
    } catch (err) {
      console.error('Error inserting category:', err);
      res.status(500).json({ success: false, message: 'Failed to add category' });
    }
  }


  // POST create category
  static async getAll(req, res) {
    const entry_by = req.user?.id;

    try {
      const query = 'SELECT * FROM category WHERE entry_by = ? ORDER BY id DESC';
      const [results] = await db.query(query, [entry_by]);

      res.json(results);
    } catch (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch categories' });
    }
  }


  // PUT update category
  static async update(req, res) {
    const { id } = req.params;
    const { category_name, category_details } = req.body;
    const entry_by = req.user?.id;

    if (!category_name || !entry_by) {
      return res.status(400).json({ success: false, message: 'Category name and user required' });
    }

    try {
      const query = 'UPDATE category SET category_name = ?, category_details = ?, entry_by = ? WHERE id = ?';
      const [result] = await db.query(query, [category_name, category_details, entry_by, id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      return res.json({ success: true, message: 'Category updated successfully' });
    } catch (err) {
      console.error('Error updating category:', err);
      return res.status(500).json({ success: false, message: 'Failed to update category' });
    }
  }

}
module.exports = CategoryController;