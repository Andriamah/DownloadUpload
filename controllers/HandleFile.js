const configureMulter = require('../utile/multer');
const verifyToken = require('../middleware/auth');
const path = require('path');
const fs = require('fs');


class HandleFile {
  uploadFile = async (req, res) => {
    console.log('ici upload')
    try {
      // Paramètres dynamiques
      const allowedTypes = ['application/pdf']; 
      const maxSizeMB = 5; 

      // Créer une instance de multer avec les paramètres dynamiques
      const upload = configureMulter(allowedTypes, maxSizeMB);

      // Appliquer le middleware d'authentification
      // verifyToken(req, res, () => {
        // Appliquer le middleware d'upload
        upload.single('file')(req, res, async (err) => {
          if (err) {
            return res.status(500).send(err.message);
          }

          if (req.file) {
            req.body.reponse = req.file.path; // Ajouter le chemin du fichier aux données
            console.log("Path dans controller: " + req.file.path);
            return res.status(201).send('File uploaded successfully');
          } else {
            return res.status(400).send('No file uploaded');
          }
        });
      // );
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  };

  downloadFile = async (req, res) => {
    console.log('ici download')
    const filename = req.query.filename;
    if (!filename) {
      return res.status(400).send('Filename is required');
    }

    const filePath = path.join(__dirname, '..', 'uploads', filename);
    console.log('Attempting to download file:', filePath);

    if (fs.existsSync(filePath)) {
      res.download(filePath, filename, (err) => {
        if (err) {
          console.log('Error downloading file:', err);
          res.status(500).send('Error downloading file');
        }
      });
    } else {
      console.log('File not found:', filePath);
      res.status(404).send('File not found');
    }
  };
}

module.exports = HandleFile;
