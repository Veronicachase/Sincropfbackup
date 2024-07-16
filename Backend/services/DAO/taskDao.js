const db = require("../db");

const taskDao = {};

taskDao.addTask = async (sectionKey, taskData) => {
  const {
    projectId,
    taskName,
    taskDescription,
    startDate,
    endDate,
    prevImages,
    finalImages,
    status,
    employeeId,
    employeeName,
    userId,
  } = taskData;
  let conn = null;
  try {
    conn = await db.createConnection();
    const sql =
      "INSERT INTO tasks (projectId, sectionKey, taskName, taskDescription, startDate, endDate, prevImages, finalImages, status, employeeId, employeeName, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [
      projectId,
      sectionKey,
      taskName,
      taskDescription,
      startDate,
      endDate,
      JSON.stringify(prevImages),
      JSON.stringify(finalImages),
      status,
      employeeId,
      employeeName,
      userId,
    ];
    const result = await db.query(sql, params, "insert", conn);
    return result;
  } catch (error) {
    console.error("Error al agregar la tarea:", error.message);
    throw error;
  } finally {
    if (conn) await conn.end();
  }
};

taskDao.getTaskById = async (taskId, userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const sql = "SELECT * FROM tasks WHERE taskId = ? AND userId = ?";
    const result = await db.query(sql, [taskId, userId], "select", conn);
    if (result.length) {
      const task = result[0];
      task.prevImages = JSON.parse(task.prevImages || "[]");
      task.finalImages = JSON.parse(task.finalImages || "[]");
      return task;
    }
    return null;
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

taskDao.getTasksBySection = async (projectId, sectionKey, userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const sql =
      "SELECT * FROM tasks WHERE projectId = ? AND sectionKey = ? AND userId = ?";
    const result = await db.query(
      sql,
      [projectId, sectionKey, userId],
      "select",
      conn
    );
    return result;
  } catch (error) {
    console.error("Error al obtener las tareas:", error.message);
    throw error;
  } finally {
    if (conn) await conn.end();
  }
};

taskDao.updateTask = async (taskId, taskData) => {
  const {
    taskName,
    taskDescription,
    startDate,
    endDate,
    prevImages,
    finalImages,
    status,
    employeeId,
    employeeName,
    projectId,
    sectionKey,
    userId,
  } = taskData;
  let conn = null;
  try {
    conn = await db.createConnection();
    const sql =
      "UPDATE tasks SET taskName = ?, taskDescription = ?, startDate = ?, endDate = ?, prevImages = ?, finalImages = ?, status = ?, employeeId = ?, employeeName = ?, projectId = ?, sectionKey = ?, userId = ? WHERE taskId = ?";
    const params = [
      taskName,
      taskDescription,
      startDate,
      endDate,
      JSON.stringify(prevImages || []), 
      JSON.stringify(finalImages || []), 
      status,
      employeeId,
      employeeName,
      projectId,
      sectionKey,
      userId,
      taskId,
    ];
    await db.query(sql, params, "update", conn);
  } catch (error) {
    console.error("Error al actualizar la tarea:", error.message);
    throw error;
  } finally {
    if (conn) await conn.end();
  }
};

taskDao.deleteTask = async (taskId, userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const sql = "DELETE FROM tasks WHERE taskId = ? AND userId = ?";
    await db.query(sql, [taskId, userId], "delete", conn);
  } catch (error) {
    console.error("Error al eliminar la tarea:", error.message);
    throw error;
  } finally {
    if (conn) await conn.end();
  }
};

module.exports = taskDao;
