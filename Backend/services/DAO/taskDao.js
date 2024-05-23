
const db = require("../db")
const moment = require("moment");
const {removeUndefinedKeys} = require("../../utils/removeUndefinedkeys")
const taskDao = {};

taskDao.addTask = async (sectionKey, taskData) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        console.log('Task data: ', taskData)
      
        let taskObj = {
            taskName: taskData.taskName,
            employeeId: taskData.employeeId,
            employeeName: taskData.employeeName,
            projectId: taskData.projectId,
            status: taskData.status,
            sectionKey: sectionKey || '',
            taskDescription: taskData.taskDescription,
            startDate: taskData.startDate ? moment(taskData.startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
            endDate: taskData.endDate ? moment(taskData.endDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
            pdf: JSON.stringify(taskData.prevImages || []), 
            prevImages: JSON.stringify(taskData.prevImages || []),  
            finalImages: JSON.stringify(taskData.finalImages || [])
        };
        

        
        taskObj = await removeUndefinedKeys(taskObj);

        
        const sql = "INSERT INTO tasks SET ?";

        const result = await db.query(sql, taskObj, "insert", conn);
        return result.insertId;
    } catch (e) {
        console.error("Error during task creation: ", e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};

taskDao.getAllTasks = async () => {
    let conn =null;
    try {
        conn = await db.createConnection();
        const results = await db.query2("SELECT * FROM tasks ", conn);
        if (results.length) {
            return results || [];
        }
        return null;
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};


taskDao.getTasksBySection = async (projectId, sectionKey) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const sql = `
            SELECT *
            FROM tasks 
            JOIN projects ON tasks.projectId = projects.projectId
            WHERE JSON_EXTRACT(projects.sections, '$.${sectionKey}') = true AND projects.projectId = ?
        `;
        const results = await db.query(sql, [projectId],"select", conn);
        return results; 
    } catch (e) {
        console.error("Error al obtener tareas por sección:", e.message);
        throw e;  
    } finally {
        if (conn) {
        await conn.end();
        }
    }
};


taskDao.getTaskById = async (taskId) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const results = await db.query("SELECT * FROM tasks WHERE taskId = ?", [taskId],"select", conn);
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
        if (data.sections) {
            data.sections = JSON.stringify(data.sections);
        }
        if (data.pdf) {
            data.pdf = JSON.stringify(data.pdf);
        }
        if (data.prevImages) {
            data.prevImages = JSON.stringify(data.prevImages);
        }
        if (data.finalImages) {
            data.finalImages = JSON.stringify(data.finalImages);
        }

        if (data.sectionKey === undefined) {
            data.sectionKey = '';
        }
        conn = await db.createConnection();
        const cleanData = await removeUndefinedKeys(data);
        const sql = "UPDATE tasks SET ? WHERE taskId = ?";
        await db.query(sql, [cleanData, parseInt(taskId)], "update", conn);
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
        await db.query("DELETE FROM tasks WHERE taskId = ?", [taskId],"delete", conn);
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};

module.exports = taskDao;

