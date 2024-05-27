const express = require("express");
const { addHours, getHoursByEmployeeId, deleteHour, updateHours } = require("../controllers/hoursController");
const hoursRouter = express.Router();


hoursRouter.get("/:employeeId", getHoursByEmployeeId);
hoursRouter.post("/:employeeId", addHours);
hoursRouter.delete("/:employeeId", deleteHour);
hoursRouter.patch("/:employeeId", updateHours);

module.exports = hoursRouter;
