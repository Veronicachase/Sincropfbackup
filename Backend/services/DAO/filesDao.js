const db = require("../db")
const { removeUndefinedKeys } = require("../../utils/removeUndefinedkeys");
const filesDao = {};

filesDao.addFile = async (fileData) => {
    const { projectId, employeeId, name, path, type } = fileData;
    const registerDate = new Date();
    let conn;
    try {
        conn = await db.createConnection();
        fileData = await removeUndefinedKeys(fileData);
        const insertId = await db.query(
            'INSERT INTO files (projectId, employeeId, name, path, type, registerDate) VALUES (?, ?, ?, ?, ?, ?)',
            [projectId, employeeId, name, path, type, registerDate],
            "insert",
            conn
        );
        return insertId;
    } catch (error) {
        console.error("Failed to add file:", error);
        throw error;
    } finally {
        if (conn) {
            await conn.end();
        }
    }
};


filesDao.getFile = async (fileId) => {
    const [rows] = await db.query('SELECT * FROM files WHERE fileId = ?', [fileId], "select", conn);
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
        [projectId, employeeId, name, path, type, fileId], "update", conn
    );
};

filesDao.deleteFile = async (fileId) => {
    await db.query('DELETE FROM files WHERE fileId = ?', [fileId], "delete", conn);
};





module.exports = filesDao;
