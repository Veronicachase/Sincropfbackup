const express = require("express");
const {
  addEmployee,
  getEmployeeById,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");


const employeeRouter = express.Router();

employeeRouter.post("/", addEmployee);

employeeRouter.get("/:employeeId", getEmployeeById);

employeeRouter.get("/", getAllEmployees);

employeeRouter.patch("/:employeeId", updateEmployee);

employeeRouter.delete("/:employeeId", deleteEmployee);

module.exports = employeeRouter;
