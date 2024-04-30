const express = require("express");
const {
  addTrabajador,
  getTrabajador,
  updateTrabajador,
  deleteTrabajador,
} = require("../controllers/trabajadorController");

const trabajadorRouter = express.Router();

trabajadorRouter.post("/", addTrabajador);

trabajadorRouter.get("/:employeeId", getTrabajador);

trabajadorRouter.put("/:employeeId", updateTrabajador);

trabajadorRouter.delete("/:employeeId", deleteTrabajador);

module.exports = trabajadorRouter;
