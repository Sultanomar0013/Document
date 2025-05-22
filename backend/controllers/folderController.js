const db = require('../model/db');

class folderController {
  // GET all folders
  // POST create folder
  static async create(req, res) {
    const { folder_name, parent_id, path } = req.body;
    const user_id = req.user.id;

    const pathString = path.map(folder => folder.id).join('/');
    console.log('Path:', pathString);

    // if (!folder_name || !user_id || !path) {
    //   return res.status(400).json({ success: false, message: 'Folder name, user ID, and path required' });
    // }

    // const query = 'INSERT INTO folder_info (folder_name, parent_id, entry_by) VALUES (?, ?, ?)';

    // try {
    //   const [result] = await db.query(query, [folder_name, parent_id || null, entry_by]);
    //   res.status(201).json({ id: result.insertId, folder_name, parent_id, entry_by });
    // } catch (err) {
    //   console.error('Error inserting folder:', err);
    //   res.status(500).json({ success: false, message: 'Failed to add folder' });
    // }
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