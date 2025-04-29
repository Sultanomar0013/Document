const fs = require('fs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;



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
    const fileSizeInBytes = req.user.fileSizeInBytes;
    const folderUrl = path.join(__dirname, '..', 'uploads', String(userId));
    let totalSize = 0;
    const files = fs.readdirSync(folderUrl);

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);
  
      if (stat.isFile()) {
        totalSize += stat.size; // Add file size
      }
      EstimatedSize = totalSize + fileSizeInBytes;
    });
  }
}

module.exports = DocumentAuthToken;


