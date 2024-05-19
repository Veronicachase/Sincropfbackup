const { removeUndefinedKeys } = require("../../utils/removeUndefinedkeys");
const moment = require("moment");
const db = require("../db")

const employeeDao = {};

employeeDao.getEmployeeById = async (employeeId) => {
  
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM employees WHERE employeeId = ?",
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
employeeDao.getAllEmployees = async () => {
  let conn = null;
  
  try {
      conn = await db.createConnection();
      const results = await db.query2("SELECT * FROM employees ", conn);
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



employeeDao.addEmployee = async (employeeData) => {
 
  let conn = null;
  try {
    conn = await db.createConnection();
    
    let employeeObj = {
      date: moment().format("YYYY-MM-DD"),
      name: employeeData.name,
      position: employeeData.position,
      project: employeeData.project,
      mandatoryEquipment: employeeData.mandatoryEquipment,
      comments: employeeData.comments
    };
   
    employeeObj = await removeUndefinedKeys(employeeObj);
   
    return await db.query(
      "INSERT INTO employees SET ?",
      employeeObj,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

employeeDao.updateEmployee = async (employeeId, employeeData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
   
      let employeeObj = {
        date: moment().format("YYYY-MM-DD"),
        name: employeeData.name,
        position: employeeData.position,
        project: employeeData.project,
        mandatoryEquipment: employeeData.mandatoryEquipment,
        comments: employeeData.comments
    };
    
    employeeObj = await removeUndefinedKeys(employeeObj);
    return await db.query(
      "UPDATE employees SET ? WHERE employeeId = ?",
      [employeeObj, employeeId],
      "update",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};


employeeDao.deleteEmployee = async (employeeId) => {

  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("DELETE FROM employees WHERE employeeId = ?", employeeId, "delete", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};




module.exports = employeeDao;
