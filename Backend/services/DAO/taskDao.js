
const db = require("../db")
const moment = require("moment");
const {removeUndefinedKeys} = require("../../utils/removeUndefinedkeys")
const taskDao = {};

taskDao.addTask = async (taskData) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        let taskObj = {

        Task:taskData.task,
        EmployeeName:"conectar y traer de tabla de employees",
        taskDescription: taskData.taskDescription,
        startDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        endDate: moment().format("YYYY-MM-DD HH:mm:ss"),
     
        };

        taskObj = await removeUndefinedKeys(taskObj);
        await db.query("INSERT INTO tasks SET ?", taskObj, conn);
        return taskObj.taskId; 
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};



taskDao.getTask = async (taskId) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const results = await db.query("SELECT * FROM tasks WHERE taskId = ?", [taskId], conn);
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

taskDao.updateTask = async (taskId, data) => {
    let conn = null;
    try {
      
        conn = await db.createConnection();
        const cleanData=removeUndefinedKeys(data)
        await db.query("UPDATE tasks SET ? WHERE taskId = ?", [data, taskId], conn);
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};

taskDao.deleteTask = async (taskId) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        await db.query("DELETE FROM tasks WHERE taskId = ?", [taskId], conn);
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};

module.exports = taskDao;

