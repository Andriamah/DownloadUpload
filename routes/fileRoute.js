const express = require('express');
const HandleFile = require('../controllers/HandleFile');
const verifyToken = require('../middleware/auth');
const checkFileExistence =  require('../middleware/checkFileExistence');
const router = express.Router();

const handleFile = new HandleFile();

router.post('/upload', verifyToken,(req, res) => handleFile.uploadFile(req, res));
router.get('/download',verifyToken, checkFileExistence, (req, res) => handleFile.downloadFile(req, res));

module.exports = router;
