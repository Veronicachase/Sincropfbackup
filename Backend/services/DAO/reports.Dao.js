
const db = require("../db")
const moment = require("moment");
const {removeUndefinedKeys} = require("../../utils/removeUndefinedkeys")
const reportDao = {};

reportDao.addReport = async (reportData) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        let reportObj = {

        reportName:reportData.reportName,
        reportDate:moment().format("YYYY-MM-DD HH:mm:ss"),
        reportType:reportData.reportType,
        // ¿Cómo se obtienen los datos de los otros ids para relacionarlos?
        
        };

        reportObj = await removeUndefinedKeys(reportObj);
        await db.query("INSERT INTO reports SET ?", reportObj, conn);
        return reportObj.reportId; 
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};



reportDao.getReport = async (reportId) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const results = await db.query("SELECT * FROM reports WHERE reportId = ?", [reportId], conn);
        if (results.length) {
            return results[0];
        }
        return null;
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};

reportDao.updateReport = async (reportId, data) => {
    let conn = null;
    try {
      
        conn = await db.createConnection();
        const cleanData=removeUndefinedKeys(data)
        await db.query("UPDATE reports SET ? WHERE reportId = ?", [data, reportId], conn);
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};

reportDao.deleteReport = async (reportId) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        await db.query("DELETE FROM reports WHERE reportId = ?", [reportId], conn);
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};

module.exports = reportDao;

