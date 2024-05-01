const express = require("express");
const {
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const employeeRouter = express.Router();

employeeRouter.post("/", addEmployee);

employeeRouter.get("/:employeeId", getEmployee);

employeeRouter.put("/:employeeId", updateEmployee);

employeeRouter.delete("/:employeeId", deleteEmployee);

module.exports = employeeRouter;
