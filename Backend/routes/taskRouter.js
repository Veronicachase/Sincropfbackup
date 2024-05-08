const express = require("express");
const { addTask,getTask, deleteTask, updateTask  } = require("../controllers/taskControllers");
const projectRouter = express.Router();

projectRouter.get("/:taskId",getTask );
projectRouter.post("/", addTask);
projectRouter.delete("/:taskId", deleteTask);
projectRouter.patch("/:taskId", updateTask);

module.exports = projectRouter;
