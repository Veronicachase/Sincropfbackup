const taskDao = require("../services/DAO/taskDao");
const path = require("path");

const addTask = async (req, res) => {
    try {
        const taskId = await taskDao.addTask(req.body);
        res.status(201).json({ message: "Tarea creada exitosamente", taskId });
    } catch (error) {
        console.error("Error al agregar la tarea:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await taskDao.getTask(taskId);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: "tarea no encontrada" });
        }
    } catch (error) {
        console.error("Error al obtener la tarea:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getTasksBySection = async (req, res) => {
    try {
        const {projectId, sectionKey} = req.params;
        const tasks = await taskDao.getTasksBySection(projectId, sectionKey);
        if (tasks && tasks.length > 0) {
            res.json(tasks);
        } else {
            res.status(404).json({ message: "Tarea  no encontrada para la sección escogida" });
        }
    } catch (error) {
        console.error("Error al obtener la tarea:", error.message);
        res.status(500).json({ error: error.message });
    }
};



const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const updatedData = req.body;
        await taskDao.updateTask(taskId, updatedData);
        res.json({ message: "Tarea actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar la tarea:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        await taskDao.deleteTask(taskId);
        res.json({ message: "Tarea eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar la tarea:", error.message);
        res.status(500).json({ error: error.message });
    }
};





module.exports = { addTask,deleteTask, updateTask, getTask, getTasksBySection };
