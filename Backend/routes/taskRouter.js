const express = require("express");
const upload = require("../public/cloudinary/uploadMiddleware");
const { addTask, getTaskById, deleteTask, updateTask, getTasksBySection, getAllTasks } = require("../controllers/taskControllers");
const taskRouter = express.Router();
const authenticateToken = require("../middleWares/authenticateToken");

taskRouter.use(authenticateToken);
// Definición de las rutas
taskRouter.get("/:taskId", getTaskById);
taskRouter.post("/:sectionKey", upload.fields([{ name: 'prevImages', maxCount: 10 }, { name: 'finalImages', maxCount: 10 }]), addTask);
taskRouter.delete("/:taskId", deleteTask);
taskRouter.patch("/:taskId", upload.fields([{ name: 'prevImages', maxCount: 10 }, { name: 'finalImages', maxCount: 10 }]), updateTask);
taskRouter.get("/:projectId/:sectionKey", getTasksBySection);
taskRouter.get("/", getAllTasks);

module.exports = taskRouter;
