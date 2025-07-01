const fs = require('fs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const path = require('path');



class DocumentAuthToken {


  static docReqFileSize(req, res, next) {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileSizeInBytes = file.size;
    const originalName = file.originalname;
    const fileSizeReadable = formatSize(fileSizeInBytes);

    return res.status(200).json({
      fileName: originalName,
      sizeInBytes: fileSizeInBytes,
      readableSize: fileSizeReadable,
    });
  };





  static docFileSizeChecker(req, res, next) {
    const userId = req.user.id;
    // const uploadPath = req.body.uploadPath;
    // console.log('req:', req.user);
    // const checkingPath = uploadPath.split('/')[0];
    const checkingPath = String(req.user.folder_id);
    const fileSizeInBytes = req.user.fileSizeInBytes;
    let totalSize = 0;
    const folderPath = path.join(__dirname, '..', 'uploads', checkingPath);

    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);

      files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
          totalSize += stat.size;
        }
      });
    }
    const EstimatedSize = totalSize + fileSizeInBytes;
    const maxSize = 100 * 1024 * 1024; // 10 MB
    if (EstimatedSize > maxSize) {
      return res.status(400).json({
        message: 'File size exceeds the limit',
        maxSize: formatSize(maxSize),
        currentSize: formatSize(EstimatedSize),
      });
    }
  }
}

module.exports = DocumentAuthToken;
