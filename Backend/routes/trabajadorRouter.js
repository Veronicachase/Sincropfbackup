const express = require("express");
const { addtrabajador } = require("../controllers/trabajadorController");
const trabajadorRouter = express.Router();

trabajadorRouter.post("/", addtrabajador);

module.exports = trabajadorRouter;
