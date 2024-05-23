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

module.exports = sectionsDao;