const express = require("express");
const { addTask,getTask, deleteTask, updateTask, getTasksBySection, getAllTasks  } = require("../controllers/taskControllers");
const { getAllTasks } = require("../services/DAO/taskDao");
const taskRouter = express.Router();

taskRouter.get("/:taskId",getTask );
taskRouter.post("/", addTask);
taskRouter.delete("/:taskId", deleteTask);
taskRouter.patch("/:taskId", updateTask);
taskRouter.get("/:projectId/:sectionKey", getTasksBySection);
taskRouter.get("/", getAllTasks)

module.exports = taskRouter;
