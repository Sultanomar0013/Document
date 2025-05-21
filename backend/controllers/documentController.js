const db = require('../model/db');
const path = require('path');
const fs = require('fs');

class DocumentController {
  static async uploadDocument(req, res) {
    const { fileName, details, categoryId } = req.body;
    const entry_by = req.user.id;

    if (!fileName || !categoryId || !req.file) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const savedFileName = req.file.filename;

    const query = `
    INSERT INTO documents (file_name, details, category_id, file_path, entry_by)
    VALUES (?, ?, ?, ?, ?)
  `;

    const values = [fileName, details, categoryId, savedFileName, entry_by];

    try {
      const [result] = await db.query(query, values);
      return res.status(200).json({ message: 'File uploaded and saved successfully' });
    } catch (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ message: 'Failed to save document info' });
    }
  }


  static async showDocument(req, res) {
    const userId = req.user.id;
    const query = `
    SELECT d.id, d.file_name, d.details, d.file_path, c.category_name
    FROM documents d
    JOIN category c ON d.category_id = c.id
  `;

    try {
      const [results] = await db.query(query);

      const fileSize = results.map((doc) => {
        const fullPath = path.join(__dirname, '../uploads', userId.toString(), doc.file_path);
        let size = 0;
        if (fs.existsSync(fullPath)) {
          size = fs.statSync(fullPath).size;
        }
        return { id: doc.id, size };
      });

      const attachments = results.map((doc) => ({
        id: doc.id,
        fileName: doc.file_name,
        details: doc.details,
        filePath: doc.file_path,
        url: `${req.protocol}://${req.get('host')}/document/${userId}/${doc.file_path}`,
        originalName: doc.file_name,
        categoryName: doc.category_name,
        size: fileSize.find((file) => file.id === doc.id)?.size || 0,
      }));

      console.log('Attachments:', attachments);
      return res.status(200).json({ attachments });

    } catch (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ message: 'Failed to fetch documents' });
    }
  }

  static async getFolderContents(req, res) {
    const { parentId } = req.params;

    try {
      // parentId might be null or undefined, so use null explicitly
      const [folders] = await db.query(
        'SELECT * FROM folder_info WHERE parent_id = ?',
        [parentId || null]
      );

      const [attachments] = await db.query(
        'SELECT * FROM attachment_info WHERE folder_id = ?',
        [parentId || null]
      );

      res.json({ folders, attachments });
    } catch (err) {
      console.error('Fetch folder contents error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }


  static async showDocuments(req, res) {
    const { parentId } = req.params;
    const userId = req.user.id;

    const parent_id = parentId === 'null' ? null : parentId;
    const foldersQuery = 'SELECT * FROM folder_info WHERE (folder_name != ? and parent_id != "0") or parent_id = ? and user_id = ?'; // fixed query here
    const docsQuery = 'SELECT a.file_id,a.folder_id,a.user_id,b.file_name,b.details,b.category_id,b.file_path FROM file_directory a join files b on a.file_id = b.id join folder_info c on a.folder_id = c.id  WHERE (c.folder_name = ? and c.parent_id = "0") OR c.parent_id = ?  '; // fixed query here
    try {
      const [folders] = await db.query(foldersQuery, [parent_id, parent_id, userId]);
      const [attachments] = await db.query(docsQuery, [parent_id, parent_id]);
      console.log('Fetched folders:', folders);
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
