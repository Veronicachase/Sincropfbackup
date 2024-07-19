const express = require("express");

const upload = require("../public/cloudinary/uploadMiddleware");
const {
  addProject,
  getProject,
  getAllProjects,
  deleteProject,
  updateProject,
  updateSection,
  deleteSection,
  addSectionToProject,
  getSections,
  uploadPDFReport,
  deleteReport,
  getAllReports,
} = require("../controllers/projectController");
const authenticateToken = require("../middleWares/authenticateToken");

const projectRouter = express.Router();
projectRouter.use(authenticateToken);

projectRouter.get("/:projectId", getProject);
projectRouter.get("/", getAllProjects);
projectRouter.post("/", upload.single("image"), addProject);
projectRouter.delete("/:projectId", deleteProject);
projectRouter.patch("/:projectId", upload.single("image"), updateProject);

/* Estas rutas son específicas para manejar las secciones (editar, borrar y agragar una sección (JSON) dentro de projects) */
projectRouter.post("/:projectId/sections", addSectionToProject);
projectRouter.patch("/:projectId/sections/:sectionKey", updateSection);
projectRouter.delete("/:projectId/sections/:sectionKey", deleteSection);
projectRouter.get("/:projectId", getSections);

// rutas para Reports
projectRouter.post("/:projectId/upload-report",upload.single("file"),uploadPDFReport);
projectRouter.delete("/:projectId/reports/:reportId", deleteReport);
projectRouter.get("/reports/all", getAllReports);

module.exports = projectRouter;
