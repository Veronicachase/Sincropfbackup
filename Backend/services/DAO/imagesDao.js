
const express = require('express');
const multer = require('multer');
const fileService = require('./fileService'); 

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const result = await fileService.addFile({
            name: req.file.originalname,
            path: req.file.path,
            projectId: req.body.projectId,
            type: req.file.mimetype
        });
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get('/files/:id', async (req, res) => {
    try {
        const file = await fileService.getFile(req.params.id);
        res.status(200).send(file);
    } catch (error) {
        res.status(404).send(error.message);
    }
});


router.patch('/files/:id', async (req, res) => {
    try {
        const result = await fileService.updateFile(req.params.id, req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.delete('/files/:id', async (req, res) => {
    try {
        const result = await fileService.deleteFile(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;








proyectoDao.addProjectFile = async (fileData) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        let fileObj = {
            name: fileData.name,
            path: fileData.path,
            projectId: fileData.projectId,
            type: req.file.type,
            registerDate: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        await db.query("INSERT INTO image SET ?", fileObj, conn);
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};