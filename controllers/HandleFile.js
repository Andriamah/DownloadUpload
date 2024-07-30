const configureMulter = require('../utile/multer');
const verifyToken = require('../middleware/auth');
const path = require('path');
const fs = require('fs');

class HandleFile {
  uploadFile = async (req, res) => {
    console.log('ici upload');
    try {
      const allowedTypes = ['application/pdf'];
      const maxSizeMB = 5;
      const upload = configureMulter(allowedTypes, maxSizeMB);

      // Encapsuler multer dans une promesse
      const uploadPromise = () => {
        return new Promise((resolve, reject) => {
          upload.single('file')(req, res, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(req.file);
            }
          });
        });
      };

      const file = await uploadPromise();
      if (file) {
        req.body.reponse = file.path;
        console.log("Path dans controller: " + file.path);
        return res.status(201).send('File uploaded successfully');
      } else {
        return res.status(400).send('No file uploaded');
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  };

  downloadFile = async (req, res) => {
    console.log('ici download');
    const filename = req.query.filename;
    if (!filename) {
      return res.status(400).send('Filename is required');
    }

    const filePath = path.join(__dirname, '..', 'uploads', filename);
    console.log('Attempting to download file:', filePath);

    try {
      await fs.promises.access(filePath);
      // Encapsuler res.download dans une promesse
      await new Promise((resolve, reject) => {
        res.download(filePath, filename, (err) => {
          if (err) {
            console.log('Error downloading file:', err);
            reject(new Error('Error downloading file'));
          } else {
            resolve();
          }
        });
      });
    } catch (err) {
      console.log('File not found:', filePath);
      res.status(404).send('File not found');
    }
  };
}

module.exports = HandleFile;
