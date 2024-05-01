const filesDao = require('../dao/filesDao');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
});
const filesController = {};

filesController.addFile = async (req, res) => {
    if (!req.files) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    try {
        const fileIds = await Promise.all(req.files.map(async file => {
            // Primero subimos el archivo a Cloudinary
            const result = await cloudinary.uploader.upload(file.path);

            // Luego guardamos los detalles del archivo en la base de datos
            return filesDao.addFile({
                projectId: req.body.projectId, 
                employeeId: req.body.employeeId, 
                name: result.original_filename,
                path: result.url,
                type: result.format
            });
        }));
        res.status(201).json({ message: 'File uploaded successfully', fileId });
    } catch (error) {
        console.error('Error uploading file:', error.message);
        res.status(500).json({ error: error.message });
    }
};

filesController.getFile = async (req, res) => {
    try {
        const file = await filesDao.getFile(req.params.fileId);
        if (file) {
            res.json(file);
        } else {
            res.status(404).json({ message: 'File not found' });
        }
    } catch (error) {
        console.error('Error fetching file:', error.message);
        res.status(500).json({ error: error.message });
    }
};

filesController.updateFile = async (req, res) => {
    try {
        await filesDao.updateFile(req.params.fileId, req.body);
        res.json({ message: 'File updated successfully' });
    } catch (error) {
        console.error('Error updating file:', error.message);
        res.status(500).json({ error: error.message });
    }
};

filesController.deleteFile = async (req, res) => {
    try {
        await filesDao.deleteFile(req.params.fileId);
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = filesController;
