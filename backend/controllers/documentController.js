const db = require('../model/db');
const path = require('path');
const fs = require('fs');

class DocumentController {
  static uploadDocument(req, res) {
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

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ message: 'Failed to save document info' });
      }

      return res.status(200).json({ message: 'File uploaded and saved successfully' });
    });
  }

  static showDocument(req, res) {
    const userId = req.user.id;
    const query = `
      SELECT d.id, d.file_name, d.details, d.file_path, c.category_name
      FROM documents d
      JOIN category c ON d.category_id = c.id
    `;


    db.query(query, (err, results) => {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ message: 'Failed to fetch documents' });
      }

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
      }
    ));
      console.log('Attachments:', attachments);
      return res.status(200).json({ attachments });
    });
  }


  static async getFolderContents(req, res) {
  const { parentId } = req.params;

  try {
    const [folders] = await db.promise().query(
      'SELECT * FROM folder_info WHERE parent_id = ?',
      [parentId || null]
    );

    const [attachments] = await db.promise().query(
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
  const parent_id = parentId === 'null' ? null : parentId;

  const foldersQuery = 'SELECT * FROM folder_info WHERE parent_id = ?';
  const docsQuery = 'SELECT * FROM folder_info WHERE folder_id = ?';

  try {
    const [folders] = await db.promise().query(foldersQuery, [parent_id]);
    const [attachments] = await db.promise().query(docsQuery, [parent_id]);

    res.json({ folders, attachments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}




  static deleteDocument(req, res) {
    const { id } = req.params;

    const query = 'DELETE FROM documents WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ message: 'Failed to delete document' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Document not found' });
      }

      return res.status(200).json({ message: 'Document deleted successfully' });
    });
  }


  static downloadDocument(req, res) {
    const { id } = req.params;

    const query = 'SELECT file_path FROM documents WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ message: 'Failed to fetch document' });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: 'Document not found' });
      }

      const filePath = path.join(__dirname, '../uploads', result[0].file_path);
      res.download(filePath);
    });
  }

  static shareDocument(req, res) {
    const { fileId, shareType, email } = req.body;

    if (!fileId || !type || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Logic to share the document (e.g., send an email, generate a shareable link, etc.)
    // For demonstration purposes, we'll just return a success message.

    return res.status(200).json({ message: `Document ${fileId} shared successfully via ${type}` });
  }
}

module.exports = DocumentController;
