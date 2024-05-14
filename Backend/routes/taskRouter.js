const express = require("express");
const { addTask,getTaskById, deleteTask, updateTask, getTasksBySection, getAllTasks  } = require("../controllers/taskControllers");
const taskRouter = express.Router();

taskRouter.get("/:taskId",getTaskById );
taskRouter.post("/", addTask);
taskRouter.delete("/:taskId", deleteTask);
taskRouter.patch("/:taskId", updateTask);
taskRouter.get("/:projectId/:sectionKey", getTasksBySection);
taskRouter.get("/", getAllTasks)

module.exports = taskRouter;
