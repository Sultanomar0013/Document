const db = require('../model/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

class folderController {
  // GET all folders
  // POST create folder
  static async create(req, res) {
    const { folder_name, parent_id, pathDir } = req.body;
    const user_id = req.user.id;

    const pathString = pathDir.map(folder => folder.id).join('/');
    console.log('Path:', pathString);

    if (!folder_name || !user_id || !pathDir) {
      return res.status(400).json({ success: false, message: 'Folder name, user ID, and pathDir required' });
    }

    const query = 'INSERT INTO folder_info (folder_name, parent_id, user_id) VALUES (?, ?, ?)';

    try {
      const [result] = await db.query(query, [folder_name, parent_id || null, user_id]);
      res.status(201).json({ id: result.insertId, folder_name, parent_id, user_id });
      const id = result.insertId;
      const folderPath = path.join(__dirname, '..', 'uploads', String(pathString), String(id));
      console.log('Folder path hello:', folderPath);
      fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) {
          console.error('Error creating folder:', err);
          return res.status(500).json({ success: false, message: 'Failed to create folder' });
        }
        console.log('Folder created successfully:', folderPath);
      });
    } catch (err) {
      console.error('Error inserting folder:', err);
      res.status(500).json({ success: false, message: 'Failed to add folder' });
    }
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

    try {
      const [result] = await db.query(query, [folder_name, folder_details, entry_by, id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Folder not found' });
      }

      res.json({ success: true, message: 'Folder updated successfully' });
    } catch (err) {
      console.error('Error updating folder:', err);
      res.status(500).json({ success: false, message: 'Failed to update folder' });
    }
  }

}

module.exports = folderController;