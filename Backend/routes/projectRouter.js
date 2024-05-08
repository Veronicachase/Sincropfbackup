const express = require("express");
const { addProject,getProject,getAllProjects, deleteProject, updateProject, updateSection, deleteSection, addSection  } = require("../controllers/projectController");
const projectRouter = express.Router();

projectRouter.get("/:projectId",getProject );
projectRouter.get("/",getAllProjects );
projectRouter.post("/", addProject);
projectRouter.delete("/:projectId", deleteProject);
projectRouter.patch("/:projectId", updateProject);
/* Estas rutas son específicas para manejar las secciones (editar, borrar y agragar una sección (JSON) dentro de projects) */
projectRouter.patch("/:projectId/sections/:sectionKey", updateSection);
projectRouter.delete("/:projectId/sections/:sectionKey", deleteSection);
projectRouter.post("/:projectId/sections", addSection); 
module.exports = projectRouter;

/**Aquí falta ingresar getAllProjects del controlador */