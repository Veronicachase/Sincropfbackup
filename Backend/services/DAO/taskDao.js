const db = require("../db");


const taskDao = {};

taskDao.addTask = async (sectionKey, taskData) => {
  const { projectId, taskName, taskDescription, startDate, endDate, prevImages, finalImages, status, employeeId, employeeName } = taskData;
  let conn = null;
  try {
    conn = await db.createConnection();
    const sql = "INSERT INTO tasks (projectId, sectionKey, taskName, taskDescription, startDate, endDate, prevImages, finalImages, status, employeeId, employeeName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [projectId, sectionKey, taskName, taskDescription, startDate, endDate, prevImages, finalImages, status, employeeId, employeeName];
    const result = await db.query(sql, params, "insert", conn);
    return result;
  } catch (error) {
    console.error("Error al agregar la tarea:", error.message);
    throw error;
  } finally {
    if (conn) await conn.end();
  }
};

taskDao.getTaskById = async (taskId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const sql = "SELECT * FROM tasks WHERE taskId = ?";
    const result = await db.query(sql, [taskId], "select", conn);
    return result.length ? result[0] : null;
  } catch (error) {
    console.error("Error al obtener la tarea:", error.message);
    throw error;
  } finally {
    if (conn) await conn.end();
  }
};


taskDao.getAllTasks = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const sql = "SELECT * FROM tasks";
    const result = await db.query(sql, null, "select", conn);
    return result;
  } catch (error) {
    console.error("Error al obtener todas las tareas:", error.message);
    throw error;
  } finally {
    if (conn) await conn.end();
  }
};


taskDao.getTasksBySection = async (projectId, sectionKey) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const sql = "SELECT * FROM tasks WHERE projectId = ? AND sectionKey = ?";
    const result = await db.query(sql, [projectId, sectionKey], "select", conn);
    return result;
  } catch (error) {
    console.error("Error al obtener las tareas:", error.message);
    throw error;
  } finally {
    if (conn) await conn.end();
  }
};

taskDao.updateTask = async (taskId, taskData) => {
  const { taskName, taskDescription, startDate, endDate, prevImages, finalImages, status, employeeId, employeeName, projectId, sectionKey } = taskData;
  let conn = null;
  try {
    conn = await db.createConnection();
    const sql = "UPDATE tasks SET taskName = ?, taskDescription = ?, startDate = ?, endDate = ?, prevImages = ?, finalImages = ?, status = ?, employeeId = ?, employeeName = ?, projectId = ?, sectionKey = ? WHERE taskId = ?";
    const params = [taskName, taskDescription, startDate, endDate, prevImages, finalImages, status, employeeId, employeeName, projectId, sectionKey, taskId];
    await db.query(sql, params, 'update', conn)
  } catch (error) {
    console.error("Error al actualizar la tarea:", error.message);
    throw error;
  } finally {
    if (conn) await conn.end();
  }
};


taskDao.deleteTask = async (taskId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const sql = "DELETE FROM tasks WHERE taskId = ?";
    await db.query(sql, [taskId], "delete", conn);
  } catch (error) {
    console.error("Error al eliminar la tarea:", error.message);
    throw error;
  } finally {
    if (conn) await conn.end();
  }
};

module.exports = taskDao;



// const db = require("../db")
// const moment = require("moment");
// const {removeUndefinedKeys} = require("../../utils/removeUndefinedkeys")
// const taskDao = {};

// taskDao.addTask = async (sectionKey, taskData) => {
//     let conn = null;
//     try {
//         conn = await db.createConnection();
      
//         let taskObj = {
//             taskName: taskData.taskName,
//             employeeId: taskData.employeeId,
//             employeeName: taskData.employeeName,
//             projectId: taskData.projectId,
//             status: taskData.status,
//             sectionKey: sectionKey || '',
//             taskDescription: taskData.taskDescription,
//             startDate: taskData.startDate ? moment(taskData.startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
//             endDate: taskData.endDate ? moment(taskData.endDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
//             pdf: JSON.stringify(taskData.prevImages || []), 
//             prevImages: JSON.stringify(taskData.prevImages || []),  
//             finalImages: JSON.stringify(taskData.finalImages || [])
//         };
        
//         taskObj = await removeUndefinedKeys(taskObj);

        
//         const sql = "INSERT INTO tasks SET ?";

//         const result = await db.query(sql, taskObj, "insert", conn);
//         return result.insertId;
//     } catch (e) {
//         console.error("Error during task creation: ", e.message);
//         throw e;
//     } finally {
//         if (conn) await conn.end();
//     }
// };

// taskDao.getAllTasks = async () => {
//     let conn =null;
//     try {
//         conn = await db.createConnection();
//         const results = await db.query("SELECT * FROM tasks ",null, "select" ,conn);
//         if (results.length) {
//             return results || [];
//         }
//         return null;
//     } catch (e) {
//         console.error(e.message);
//         throw e;
//     } finally {
//         if (conn) await conn.end();
//     }
// };

// taskDao.getTasksBySection = async (projectId, sectionKey) => {
//     let conn = null;
//     try {
//         conn = await db.createConnection();
//         const sql = `
//             SELECT tasks.*
//             FROM tasks 
//             JOIN projects ON tasks.projectId = projects.projectId
//             WHERE projects.projectId = ? 
//               AND JSON_CONTAINS(projects.sections, JSON_QUOTE(?), '$')
//         `;
//         const results = await db.query(sql, [projectId, sectionKey], "select", conn);
//         return results;
//     } catch (e) {
//         console.error("Error al obtener tareas por sección:", e.message);
//         throw e;
//     } finally {
//         if (conn) {
//             await conn.end();
//         }
//     }
// };


// taskDao.getTaskById = async (taskId) => {
//     let conn = null;
//     try {
//         conn = await db.createConnection();
//         const results = await db.query("SELECT * FROM tasks WHERE taskId = ?", [taskId],"select", conn);
//         if (results.length) {
//             return results[0];
//         }
//         return null;
//     } catch (e) {
//         console.error(e.message);
//         throw e;
//     } finally {
//         if (conn) await conn.end();
//     }
// };

// taskDao.updateTask = async (taskId, data) => {
//     let conn = null;
//     try {
//         if (data.sections) {
//             data.sections = JSON.stringify(data.sections);
//         }
//         if (data.pdf) {
//             data.pdf = JSON.stringify(data.pdf);
//         }
//         if (data.prevImages) {
//             data.prevImages = JSON.stringify(data.prevImages);
//         }
//         if (data.finalImages) {
//             data.finalImages = JSON.stringify(data.finalImages);
//         }

//         if (data.sectionKey === undefined) {
//             data.sectionKey = '';
//         }
//         conn = await db.createConnection();
//         const cleanData = await removeUndefinedKeys(data);
//         const sql = "UPDATE tasks SET ? WHERE taskId = ?";
//         await db.query(sql, [cleanData, parseInt(taskId)], "update", conn);
//     } catch (e) {
//         console.error(e.message);
//         throw e;
//     } finally {
//         if (conn) await conn.end();
//     }
// };


// taskDao.deleteTask = async (taskId) => {
//     let conn = null;
//     try {
//         conn = await db.createConnection();
//         await db.query("DELETE FROM tasks WHERE taskId = ?", [taskId],"delete", conn);
//     } catch (e) {
//         console.error(e.message);
//         throw e;
//     } finally {
//         if (conn) await conn.end();
//     }
// };

// module.exports = taskDao;

