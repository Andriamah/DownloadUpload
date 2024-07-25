const multer = require('multer');
const fs = require('fs');
const path = require('path');


// Fonction pour vérifier et créer le répertoire
const ensureUploadDirectoryExists = () => {
  const uploadDir = path.join(__dirname, '..', 'uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Directory "uploads" created.');
  } else {
    console.log('Directory "uploads" already exists.');
  }
};

const configureMulter = (allowedTypes, maxSizeMB) => {

  const maxSize = maxSizeMB * 1024 * 1024;
  ensureUploadDirectoryExists()
  // Configuration du stockage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed types are: ${allowedTypes.join(', ')}`), false);
    }
  };

  const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: maxSize } });

  return upload;
};

module.exports = configureMulter;
