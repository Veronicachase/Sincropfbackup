const express = require("express");
const { addProject,getProject, deleteProject, updateProject  } = require("../controllers/projectController");
const projectRouter = express.Router();

projectRouter.get("/:projectId",getProject );
projectRouter.post("/", addProject);
projectRouter.delete("/:projectId", deleteProject);
projectRouter.patch("/:projectId", updateProject);
projectRouter.patch("/:projectId/sections/:sectionKey", updateSection);
projectRouter.delete("/:projectId/sections/:sectionKey", deleteSection);

module.exports = projectRouter;

