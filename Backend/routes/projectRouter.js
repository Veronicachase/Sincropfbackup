const express = require("express");
const { addProject,getProject, deleteProject, updateProject  } = require("../controllers/projectController");
const projectRouter = express.Router();

projectRouter.get("/:projectId",getProject );
projectRouter.post("/", addProject);
projectRouter.delete("/:projectId", deleteProject);
projectRouter.patch("/:projectId", updateProject);
/* Estas rutas son específicas para manejar las secciones (editar, borrar y agragar una sección (JSON) dentro de projects) */
projectRouter.patch("/:projectId/sections/:sectionKey", updateSection);
projectRouter.delete("/:projectId/sections/:sectionKey", deleteSection);
projectRouter.post("/:projectId/sections", addSection); 
module.exports = projectRouter;

/* falta crea los controladores de estas ultimas rutas e importarlos aquí.  */