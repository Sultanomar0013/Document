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
}

module.exports = DocumentController;
