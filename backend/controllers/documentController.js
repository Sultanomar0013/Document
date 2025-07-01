const db = require('../model/db');
const path = require('path');
const fs = require('fs');

class DocumentController {

  static async uploadDocument(req, res, next) {
    console.log('Upload Document Request');
    const { fileName, details, categoryId, uploadPath } = req.body;
    const entry_by = req.user.id;

    console.log(req.body.uploadPath);

    //   if (!fileName || !categoryId || !req.file || uploadPath === undefined || uploadPath === null || !uploadPath || entry_by) {
    //     return res.status(400).json({ message: 'Missing required fields' });
    //   }

    //   const savedFileName = req.file.filename;

    //   const query = `
    //   INSERT INTO files (file_name, details, category_id, file_path, entry_by)
    //   VALUES (?, ?, ?, ?, ?)
    // `;

    //   const values = [fileName, details, categoryId, savedFileName, entry_by];

    //   try {
    //     const [result] = await db.query(query, values);
    //     return res.status(200).json({ message: 'File uploaded and saved successfully' });
    //   } catch (err) {
    //     console.error('DB Error:', err);
    //     return res.status(500).json({ message: 'Failed to save document info' });
    //   }

  }



  static async showDocuments(req, res) {
    const { parentId } = req.params;
    const userId = req.user.id;
    const rootFolderId = req.user.folder_id;
    console.log('User ID:', userId);
    // console.log('Parent ID:', parentId);

    const parent_id = parentId;
    // if (rootFolderId == parent_id) {
    const foldersQuery = 'SELECT * FROM folder_info WHERE  parent_id = ? and user_id = ?'; // fixed query here

    const docsQuery = 'SELECT a.file_id,a.folder_id,a.user_id,b.file_name,b.details,b.category_id,b.file_path FROM file_directory a join files b on a.file_id = b.id join folder_info c on a.folder_id = c.id  WHERE (c.id = ? and c.parent_id = "0") OR c.parent_id = ?  '; // fixed query here

    // console.log('docsQuery:', docsQuery);
    try {
      const [folders] = await db.query(foldersQuery, [parent_id, userId]);
      const [attachments] = await db.query(docsQuery, [parent_id, parent_id]);
      // console.log('Fetched folders:', folders);
      res.json({ folders, attachments });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }




  static async deleteDocument(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM documents WHERE id = ?';

    try {
      const [result] = await db.query(query, [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Document not found' });
      }

      return res.status(200).json({ message: 'Document deleted successfully' });
    } catch (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ message: 'Failed to delete document' });
    }
  }


  static async downloadDocument(req, res) {
    const { id } = req.params;
    const query = 'SELECT file_path FROM documents WHERE id = ?';

    try {
      const [result] = await db.query(query, [id]);

      if (result.length === 0) {
        return res.status(404).json({ message: 'Document not found' });
      }

      const filePath = path.join(__dirname, '../uploads', result[0].file_path);
      res.download(filePath);
    } catch (err) {
      console.error('DB Error:', err);
      res.status(500).json({ message: 'Failed to fetch document' });
    }
  }

}

module.exports = DocumentController;
