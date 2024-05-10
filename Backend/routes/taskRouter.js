const express = require("express");
const { addTask,getTask, deleteTask, updateTask, getTasksBySection  } = require("../controllers/taskControllers");
const taskRouter = express.Router();

taskRouter.get("/:taskId",getTask );
taskRouter.post("/", addTask);
taskRouter.delete("/:taskId", deleteTask);
taskRouter.patch("/:taskId", updateTask);
taskRouter.get("/task/:projectId/:sectionKey", getTasksBySection);

module.exports = taskRouter;
