const db = require('../model/db');
const path = require('path');

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
}

module.exports = DocumentController;
