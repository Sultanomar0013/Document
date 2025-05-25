const db = require('../model/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

class cutCopyController {

  static async cut(req, res) {
    const { item_id, item_type, path, oldPath } = req.body;
    const userId = req.user.id;
    console.log('cutCopyController:', req.body);
    console.log('path', path);
    console.log('oldPath', oldPath);


    if (!item_id || !item_type || !path || !userId) {
      return res.status(400).json({ success: false, message: 'Document ID, folder ID, action, and user ID are required' });
    }

    // if (item_type === 'folder' && item_id === target_folder_id) {
    //   return res.status(400).json({ success: false, message: 'Cannot move a folder into itself' });
    // }

    // if (item_type === 'folder' && item_id != target_folder_id) {

    //   const query = 'UPDATE folder_info SET parent_id = ? WHERE id = ? AND user_id = ?';
    //   try {



    //     // Check if source exists
    //     if (!fs.existsSync(oldPath)) {
    //       throw new Error(`Source folder does not exist: ${oldPath}`);
    //     }

    //     // Ensure target parent directory exists
    //     if (!fs.existsSync(path)) {
    //       throw new Error(`Destination parent folder does not exist: ${path}`);
    //     }

    //     // If target folder already exists, you can rename or throw an error
    //     if (fs.existsSync(targetPath)) {
    //       throw new Error(`Target folder already exists: ${targetPath}`);
    //     }

    //     try {
    //       await db.query(query, [target_folder_id, item_id, userId]);
    //       moveFolder(oldPath, newParentPath);
    //     } catch (err) {
    //       console.error(err.message);
    //     }

    //     return res.status(200).json({ success: true, message: 'Folder moved successfully' });
    //   } catch (err) {
    //     console.error('Error moving folder:', err);
    //     return res.status(500).json({ success: false, message: 'Failed to move folder' });
    //   }
    // }

    // try {
    //   // Update the document's folder_id based on the action (cut or copy)
    //   const query = 'UPDATE document SET folder_id = ? WHERE id = ? AND user_id = ?';
    //   await db.query(query, [folderId, documentId, userId]);

    //   res.status(200).json({ success: true, message: `Document ${action} successfully` });
    // } catch (err) {
    //   console.error('Error updating document:', err);
    //   res.status(500).json({ success: false, message: 'Failed to update document' });
    // }
  }



}

module.exports = cutCopyController;