const db = require("../db")
const sectionsDao = {};

sectionsDao.getSections = async () => {
    let conn = null;
    try {
        conn = await db.createConnection();
        
        const sql = "SELECT * FROM sections ";

        return await db.query(sql, null, "select", conn);
    } catch (e) {
        console.error("Error during sections select: ", e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
}


sectionsDao.addSection = async (section) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        
        const sql = 
        `
        UPDATE projects 
        SET sections = JSON_ARRAY_APPEND(sections, '$', ?)
        WHERE projectId = ?;
        `;

        // Ejecutar la consulta con los parámetros adecuados
        await db.query(sql, [section, section], "insert", conn);
        
        return { message: 'Section added successfully' };
    } catch (e) {
        console.error("Error during sections insert: ", e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};

module.exports = sectionsDao;