const db = require("../db")
const { removeUndefinedKeys } = require("../../utils/removeUndefinedkeys");
const filesDao = {};

filesDao.addFile = async (fileData) => {
    const { projectId, employeeId, name, path, type } = fileData;
    const registerDate = new Date();
    fileData = await removeUndefinedKeys(fileData);
    const [result] = await db.query(
        'INSERT INTO files (projectId, employeeId, name, path, type, registerDate) VALUES (?, ?, ?, ?, ?, ?)',
        [projectId, employeeId, name, path, type, registerDate]
    );
    return result.insertId;
};

filesDao.getFile = async (fileId) => {
    const [rows] = await db.query('SELECT * FROM files WHERE fileId = ?', [fileId]);
    if (rows.length) {
        return rows[0];
    }
    return null;
};

filesDao.updateFile = async (fileId, fileData) => {
    const { projectId, employeeId, name, path, type } = fileData;
    fileData = await removeUndefinedKeys(fileData);
    await db.query(
        'UPDATE files SET projectId = ?, employeeId = ?, name = ?, path = ?, type = ? WHERE fileId = ?',
        [projectId, employeeId, name, path, type, fileId]
    );
};

filesDao.deleteFile = async (fileId) => {
    await db.query('DELETE FROM files WHERE fileId = ?', [fileId]);
};

module.exports = filesDao;
