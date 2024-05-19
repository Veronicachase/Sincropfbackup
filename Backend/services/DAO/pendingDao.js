const { removeUndefinedKeys } = require("../../utils/removeUndefinedkeys");
const moment = require("moment");
const db = require("../db")

const pendingDao = {};

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
pendingDao.getAllPendings = async () => {
  let conn = null;
  
  try {
      conn = await db.createConnection();
      const results = await db.query2("SELECT * FROM pendings ", conn);
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



pendingDao.addPending = async (pendingData) => {
 
  let conn = null;
  try {
    conn = await db.createConnection();
    
    let pendingObj = {
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      details:pendingObj.details,
      status:pendingObj.status
     
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

pendingDao.updatePending = async (pendingId, pendingData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
   
      let pendingObj = {
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
        details:pendingObj.details,
        status:pendingObj.status
    };
    
    pendingObj = await removeUndefinedKeys(pendingObj);
    return await db.query(
      "UPDATE pendings SET ? WHERE pendingId = ?",
      [pendingObj, pendingId],
      "update",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};


pendingDao.deletePending = async (pendingId) => {

  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("DELETE FROM pendings WHERE pendingId = ?", pendingId, "delete", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};




module.exports = pendingDao;