const { cloudinary } = require("../public/cloudinary/cloudinary");
const uploadImage = require("../public/cloudinary/uploadImage");
const taskDao = require("../services/DAO/taskDao");

const addTask = async (req, res) => {
  const userId = req.user.userId;
  const sectionKey = req.params.sectionKey;
  const taskData = req.body;
  taskData.userId = userId;
  const prevImagesUrls = [];
  const finalImagesUrls = [];

  if (!taskData.status) {
    taskData.status = "noIniciado";
  }
  console.log("Datos de la tarea recibidos:", taskData);
  try {
    // Manejo de prevImages
    if (req.files && req.files.prevImages) {
      for (const file of req.files.prevImages) {
        const uploadedImage = await cloudinary.uploader.upload(file.path, {
          upload_preset: "presets",
          allowed_formats: ["jpg", "png", "jpeg", "svg", "ico", "jfif", "webp"],
        });
        console.log("Archivos recibidos:", req.files);
        prevImagesUrls.push(uploadedImage.secure_url);
      }
      taskData.prevImages = prevImagesUrls;
    }

    // Manejo de finalImages
    if (req.files && req.files.finalImages) {
      for (const file of req.files.finalImages) {
        const uploadedImage = await cloudinary.uploader.upload(file.path, {
          upload_preset: "presets",
          allowed_formats: ["jpg", "png", "jpeg", "svg", "ico", "jfif", "webp"],
        });
        console.log("Archivos recibidos:", req.files);
        finalImagesUrls.push(uploadedImage.secure_url);
      }
      taskData.finalImages = finalImagesUrls;
    }

    const taskId = await taskDao.addTask(sectionKey, taskData);
    console.log("task id", taskId);
    res.status(201).json({ message: "Tarea creada exitosamente", taskId });
  } catch (error) {
    console.error("Error al agregar la tarea:", error.message);
    res.status(500).json({ error: "Error al agregar la tarea" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.user.userId;
    const task = await taskDao.getTaskById(taskId, userId);
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
  const userId = req.user.userId;
  const { projectId, sectionKey } = req.params;

  try {
    let tasks = await taskDao.getTasksBySection(projectId, sectionKey, userId);
    if (tasks && tasks.length > 0) {
      res.json(tasks);
    } else {
      res
        .status(404)
        .json({ message: "Tarea no encontrada para la sección escogida" });
    }
  } catch (error) {
    console.error("Error al obtener la tarea:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.userId;
    const taskData = { ...req.body, userId };

    if (!taskData.sectionKey) {
      return res.status(400).json({ error: "sectionKey cannot be null" });
    }

    const prevImagesUrls = [];
    const finalImagesUrls = [];

    if (!taskData.status) {
      taskData.status = "noIniciado";
    }

    // Manejo de prevImages
    if (req.files && req.files.prevImages) {
      for (const file of req.files.prevImages) {
        const uploadedImage = await cloudinary.uploader.upload(file.path, {
          upload_preset: "presets",
          allowed_formats: ["jpg", "png", "jpeg", "svg", "ico", "jfif", "webp"],
        });
        prevImagesUrls.push(uploadedImage.secure_url);
      }
      taskData.prevImages = prevImagesUrls;
    }else if (taskData.prevImages) {
      taskData.prevImages = Array.isArray(taskData.prevImages) ? taskData.prevImages : [taskData.prevImages];
    } else {
      taskData.prevImages = [];
    }

    // Manejo de finalImages
    if (req.files && req.files.finalImages) {
      for (const file of req.files.finalImages) {
        const uploadedImage = await cloudinary.uploader.upload(file.path, {
          upload_preset: "presets",
          allowed_formats: ["jpg", "png", "jpeg", "svg", "ico", "jfif", "webp"],
        });
        finalImagesUrls.push(uploadedImage.secure_url);
      }
      taskData.finalImages = finalImagesUrls;
    }else if (taskData.finalImages) {
      taskData.finalImages = Array.isArray(taskData.finalImages) ? taskData.finalImages : [taskData.finalImages];
    } else {
      taskData.finalImages = [];
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
    const userId = req.user.userId;
    await taskDao.deleteTask(taskId, userId);
    res.json({ message: "Tarea eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTask,
  deleteTask,
  updateTask,
  getTasksBySection,
  getAllTasks,
  getTaskById,
};
