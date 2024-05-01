const express = require("express");
const { addproyecto } = require("../controllers/proyectoController");
const proyectoRouter = express.Router();

proyectoRouter.get("/:projectId", getProyecto);
proyectoRouter.post("/", addproyecto);
proyectoRouter.delete("/:projectId", deleteProyecto);
proyectoRouter.patch("/:projectId", updateProyecto);

module.exports = proyectoRouter;

