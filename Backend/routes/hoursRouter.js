const express = require("express");
const { addHours, getHoursById, deleteHour, updateHours } = require("../controllers/hoursController");
const hoursRouter = express.Router();


hoursRouter.get("/:employeeId", getHoursById);
hoursRouter.post("/", addHours);
hoursRouter.delete("/:employeeId", deleteHour);
hoursRouter.patch("/:employeeId", updateHours);

module.exports = hoursRouter;
