const { removeUndefinedKeys } = require("../../utils/removeUndefinedkeys");
const moment = require("moment");
const db = "traer de base de datos"

const trabajadorDao = {};

trabajadorDao.getTrabajadorByReference = async (employeeId) => {
  
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM employee WHERE employeeId = ?",
      employeeId,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

trabajadorDao.addtrabajador = async (trabajadorData) => {
 
  let conn = null;
  try {
    conn = await db.createConnection();
    
    let trabajadorObj = {
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      name: trabajadorData.name,
      position: trabajadorData.position,
      project: trabajadorData.project,
      mandatoryEquipment: trabajadorData.mandatoryEquipment,
      comments: trabajadorData.comments
    };
   
    trabajadorObj = await removeUndefinedKeys(trabajadorObj);
   
    return await db.query(
      "INSERT INTO employee SET ?",
      trabajadorObj,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

trabajadorDao.updateTrabajador = async (employeeId, trabajadorData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
   
      let trabajadorObj = {
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
        name: trabajadorData.name,
        position: trabajadorData.position,
        project: trabajadorData.project,
        mandatoryEquipment: trabajadorData.mandatoryEquipment,
        comments: trabajadorData.comments
    };
    
    trabajadorObj = await removeUndefinedKeys(trabajadorObj);
    return await db.query(
      "UPDATE employee SET ? WHERE employeeId = ?",
      [trabajadorObj, employeeId],
      "update",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};


trabajadorDao.deleteTrabajador = async (employeeId) => {

  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("DELETE FROM employee WHERE employeeId = ?", employeeId, "delete", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};




module.exports = trabajadorDao;
