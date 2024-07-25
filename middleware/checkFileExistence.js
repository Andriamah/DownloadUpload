const path = require('path');
const fs = require('fs');

const checkFileExistence = (req, res, next) => {
  const filename = req.query.filename;
  if (!filename) {
    return res.status(400).send('Filename is required');
  }

  const filePath = path.join(__dirname, '..', 'uploads', filename);
  console.log('Attempting to access file:', filePath);

  if (fs.existsSync(filePath)) {
    req.filePath = filePath; // Stocker le chemin du fichier dans la requête pour une utilisation ultérieure
    next();
  } else {
    console.log('File not found:', filePath);
    res.status(404).send('File not found');
  }
};

module.exports = checkFileExistence;
