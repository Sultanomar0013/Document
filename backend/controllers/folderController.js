const db = require('../model/db');

class folderController {
  // GET all folders
  static async getAll(req, res) {
    const entry_by = req.user?.id;
    const query = 'SELECT * FROM folder where entry_by = ? ORDER BY id DESC';
    db.query(query, [entry_by], (err, results) => {
      if (err) {
        console.error('Error fetching folders:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch folders' });
      }
      res.json(results);
    });
  }

  // POST create folder
 static async create(req, res) {
  const { folder_name, parent_id } = req.body; // ✅ include parent_id
  const entry_by = req.user?.id;

  if (!folder_name || !entry_by) {
    return res.status(400).json({ success: false, message: 'Folder name and user required' });
  }

  const query = 'INSERT INTO folder_info (folder_name, parent_id, entry_by) VALUES (?, ?, ?)';
  db.query(query, [folder_name, parent_id || null, entry_by], (err, result) => {
    if (err) {
      console.error('Error inserting folder:', err);
      return res.status(500).json({ success: false, message: 'Failed to add folder' });
    }
    res.status(201).json({ id: result.insertId, folder_name, parent_id, entry_by });
  });
}


  // PUT update folder
  static async update(req, res) {
    const { id } = req.params;
    const { folder_name, folder_details } = req.body;
    const entry_by = req.user?.id;

    if (!folder_name || !entry_by) {
      return res.status(400).json({ success: false, message: 'Folder name and user required' });
    }

    const query = 'UPDATE folder SET folder_name = ?, folder_details = ?, entry_by = ? WHERE id = ?';
    db.query(query, [folder_name, folder_details, entry_by, id], (err, result) => {
      if (err) {
        console.error('Error updating folder:', err);
        return res.status(500).json({ success: false, message: 'Failed to update folder' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Folder not found'
        });
      }
      res.json({ success: true, message: 'Folder updated successfully' });
    })
  }
}