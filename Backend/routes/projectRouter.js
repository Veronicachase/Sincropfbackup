const express = require("express");
const { addProject } = require("../controllers/projectController");
const { getProject, deleteProject, updateProject } = require("../services/DAO/projectDao");
const projectRouter = express.Router();

projectRouter.get("/:projectId",getProject );
projectRouter.post("/", addProject);
projectRouter.delete("/:projectId", deleteProject);
projectRouter.patch("/:projectId", updateProject);

module.exports = projectRouter;

