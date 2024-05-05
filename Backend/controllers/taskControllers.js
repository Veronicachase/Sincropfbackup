const taskDao = require("../services/DAO/taskDao");
const path = require("path");

const addTask = async (req, res) => {
    try {
        const taskId = await taskDao.addTask(req.body);
        res.status(201).json({ message: "proyecto creado exitosamente", taskId });
    } catch (error) {
        console.error("Error al agregar el proyecto:", error.message);
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
            res.status(404).json({ message: "proyecto no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el proyecto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const updatedData = req.body;
        await taskDao.updateTask(taskId, updatedData);
        res.json({ message: "task actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el proyecto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        await taskDao.deleteTask(taskId);
        res.json({ message: "proyecto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el proyecto:", error.message);
        res.status(500).json({ error: error.message });
    }
};





module.exports = { addTask,deleteTask, updateTask, getTask };
