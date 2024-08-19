const express = require('express');
const multer = require('multer');


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
filesRouter.post('/', upload.array('file', 5), addFile); 
filesRouter.patch('/:fileId', updateFile);
filesRouter.delete('/:fileId', deleteFile);
filesRouter.post('/project/:projectId', upload.array('file', 5), addFile); 
filesRouter.post('/employee/:employeeId', upload.array('file', 5), addFile);

module.exports = filesRouter, upload;
