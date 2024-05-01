const express = require('express');
const multer = require('multer');
const { addFile, getFile, updateFile, deleteFile } = require('../controllers/filesController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
const filesRouter = express.Router();

filesRouter.get('/:fileId', getFile);
filesRouter.post('/', upload.single('file'), addFile);
filesRouter.patch('/:fileId', updateFile);
filesRouter.delete('/:fileId', deleteFile);
filesRouter.post('/project/:projectId', upload.single('file'), addFile);
filesRouter.post('/employee/:employeeId', upload.single('file'), addFile);

module.exports = filesRouter;
