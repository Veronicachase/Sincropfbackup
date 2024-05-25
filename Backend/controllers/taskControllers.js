const { cloudinary } = require("../public/cloudinary/cloudinary");
const uploadImage = require("../public/cloudinary/uploadImage");
const taskDao = require("../services/DAO/taskDao");

const addTask = async (req, res) => {
  try {
    const sectionKey = req.params.sectionKey;
    const taskData = req.body;

    console.log(taskData)

    if (taskData && taskData.prevImages) {
      const publicIds = [];

      for (const image of taskData.prevImages) {
        try {
          const uploadedImage = await cloudinary.uploader.upload(image, {
            upload_preset: "presets",
            public_id: `${new Date().getTime()}`, 
            allowed_formats: ["jpg", "png", "jpeg", "svg", "ico", "jfif", "webp"],
          });

          publicIds.push(uploadedImage.public_id);

          console.log("Imagen subida:", uploadedImage);
        } catch (error) {
          // Manejar cualquier error ocurrido durante la subida
          console.error("Error al subir la imagen:", error);
        }
      }

      // Asignar el array de public_ids a taskData.prevImages
      taskData.prevImages = publicIds;
    }

    if (taskData.finalImages) {
      // Subir todas las imágenes finales a Cloudinary en paralelo
      const finalImagesUploadPromises = taskData.finalImages.map(file => uploadImage(file));
      const finalImagesResults = await Promise.all(finalImagesUploadPromises);
      
      // Asignar los public_ids de las imágenes finales a taskData.finalImages
      taskData.finalImages = finalImagesResults.map(result => result.public_id);
    }

    // Agregar la tarea a la base de datos
    const taskId = await taskDao.addTask(sectionKey, taskData);
    
    // Enviar respuesta al cliente
    res.status(201).json({ message: "Tarea creada exitosamente", taskId });
  } catch (error) {
    // Manejar errores
    console.error("Error al agregar la tarea:", error.message);
    res.status(500).json({ error: "Error al agregar la tarea" });
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
