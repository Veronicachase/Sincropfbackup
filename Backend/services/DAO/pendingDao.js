const { removeUndefinedKeys } = require("../../utils/removeUndefinedkeys");
const moment = require("moment");
const db = require("../db");

const pendingDao = {};




pendingDao.addPending = async (pendingData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    
    let pendingObj = {
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      details: pendingData.details,  
      status: pendingData.status,
      userId:pendingData.userId  
    };
   
    pendingObj = await removeUndefinedKeys(pendingObj);
   
    return await db.query(
      "INSERT INTO pendings SET ?",
      pendingObj,
      "insert",
      conn
    );
    
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};


pendingDao.getPendingById = async (pendingId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM pendings WHERE pendingId = ?",
      pendingId,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

pendingDao.getAllPendings = async (userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query("SELECT * FROM pendings where userId = ?", userId, "select", conn);  
    if (results.length) {
      return results;
    }
    return null;
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};


pendingDao.deletePending = async (pendingId, userId) => {
  let conn = null;
  try {
    if (typeof pendingId !== 'number' && typeof pendingId !== 'string') {
      throw new Error('Invalid pendingId');
    }
    conn = await db.createConnection();
    return await db.query("DELETE FROM pendings WHERE pendingId = ? And userId = ? ", [pendingId, userId], "delete", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

module.exports = pendingDao;
