const express = require("express");
const {
  addEmployee,
  getEmployeeById,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const authenticateToken = require("../middleWares/authenticateToken")

const employeeRouter = express.Router();
employeeRouter.use(authenticateToken); 
employeeRouter.post("/", authenticateToken, addEmployee);
employeeRouter.get("/:employeeId", authenticateToken, getEmployeeById);
employeeRouter.get("/", authenticateToken, getAllEmployees);
employeeRouter.patch("/:employeeId", authenticateToken, updateEmployee);
employeeRouter.delete("/:employeeId", authenticateToken, deleteEmployee);

module.exports = employeeRouter;
