const taskDao = require("../services/DAO/taskDao");
const path = require("path");

const addTask = async (req, res) => {
    try {
      const { files } = req;
      const taskData = { ...req.body };
  
      if (files) {
        if (files.prevImages) {
          taskData.prevImages = files.prevImages.map(file => file.path);
        }
        if (files.finalImages) {
          taskData.finalImages = files.finalImages.map(file => file.path);
        }
      }
  
      const taskId = await taskDao.addTask(taskData);
      res.status(201).json({ message: "Tarea creada exitosamente", taskId });
    } catch (error) {
      console.error("Error al agregar la tarea:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  

const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await taskDao.getTaskById(taskId);
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

const getAllTasks = async (req, res) => {
    try {
        const task = await taskDao.getAllTasks();
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: "No hay tareas creadas" });
        }
    } catch (error) {
        console.error("Error al obtener tus tareas:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getTasksBySection = async (req, res) => {
    try {
        const {projectId, sectionKey} = req.params;
        console.log("Recibiendo projectId:", projectId, "Recibiendo sectionKey:", sectionKey); /// esto no me trae nada
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
      const { files } = req;
      const { taskId } = req.params;
      const taskData = { ...req.body };
  
      if (files) {
        if (files.prevImages) {
          taskData.prevImages = files.prevImages.map(file => file.path);
        }
        if (files.finalImages) {
          taskData.finalImages = files.finalImages.map(file => file.path);
        }
      }
  
      await taskDao.updateTask(taskId, taskData);
      res.status(200).json({ message: "Tarea actualizada exitosamente" });
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





module.exports = { addTask,deleteTask, updateTask,  getTasksBySection, getAllTasks, getTaskById  };
