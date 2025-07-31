const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController")
const multer = require("multer");

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
router.post('/upload', upload.single('file'), uploadController.handleUpload);
router.get('/files', uploadController.getFiles);

module.exports = router;