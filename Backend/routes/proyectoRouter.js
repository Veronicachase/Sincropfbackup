const express = require("express");
const { addproyecto } = require("../controllers/proyectoController");
const proyectoRouter = express.Router();

proyectoRouter.get("/:id", getProyecto);
proyectoRouter.post("/", addproyecto);
proyectoRouter.delete("/:id", deleteProyecto);
proyectoRouter.patch("/:id", updateProyecto);

module.exports = proyectoRouter;

