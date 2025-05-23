const fs = require('fs');
const express = require('express');
const multer = require('multer');
const path = require('path');
const authenticateToken = require('../middleware/authMiddleware');
const DocumentController = require('../controllers/documentController');
const DocumentAuthToken = require('../middleware/docAuthfilter');


const router = express.Router();


const upload = require('../controllers/multerController');
// POST /upload
router.post('/uploadDoc', authenticateToken.authToken, DocumentAuthToken.docFileSizeChecker, upload.single('file'), DocumentController.uploadDocument);
// GET /showDoc
//router.get('/showDoc', authenticateToken.authToken, DocumentController.showDocument);

// router.get('/showDoc', authenticateToken.authToken, DocumentController.getFolderContents);
router.get('/showDoc/:parentId?', authenticateToken.authToken, DocumentController.showDocuments);
// GET /download/:fileName
router.get('/download/:fileName', authenticateToken.authToken, (req, res) => {
  const fileName = req.params.fileName;
  const userId = req.user.id;
  const filePath = path.join(__dirname, '..', 'uploads', String(userId), fileName);

  res.download(filePath, (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).send('Error downloading the file');
    }
  });
});
// DELETE /delete/:id
router.delete('/delete/:id', authenticateToken.authToken, DocumentController.deleteDocument);

router.get('/download/:id', authenticateToken.authToken, DocumentController.downloadDocument);

// router.post('/shareDocument', authenticateToken.authToken, DocumentController.shareDocument);

module.exports = router;
