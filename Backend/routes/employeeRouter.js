const express = require("express");
const {
  addEmployee,
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const employeeRouter = express.Router();

employeeRouter.post("/", addEmployee);

employeeRouter.get("/:employeeId", getEmployee);

employeeRouter.get("/", getAllEmployees);

employeeRouter.put("/:employeeId", updateEmployee);

employeeRouter.delete("/:employeeId", deleteEmployee);

module.exports = employeeRouter;
