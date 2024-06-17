const express = require("express");
const upload = require('../public/cloudinary/uploadMiddleware');
const {
  addProject,
  getProject,
  getAllProjects,
  deleteProject,
  updateProject,
  updateSection,
  deleteSection,
  addSection,
} = require("../controllers/projectController");
const { getSections } = require("../controllers/sectionsController");
const sectionsRouter = express.Router();

const projectRouter = express.Router();

projectRouter.get("/:projectId", getProject);
projectRouter.get("/", getAllProjects);
projectRouter.post("/", upload.single("image"), addProject);
projectRouter.delete("/:projectId", deleteProject);
projectRouter.patch("/:projectId", updateProject);
/* Estas rutas son específicas para manejar las secciones (editar, borrar y agragar una sección (JSON) dentro de projects) */
projectRouter.post("/:projectId/sections", addSection);
projectRouter.patch("/:projectId/sections/:sectionKey", updateSection);
projectRouter.delete("/:projectId/sections/:sectionKey", deleteSection);
sectionsRouter.get("/:projectId",getSections );
module.exports = projectRouter;
