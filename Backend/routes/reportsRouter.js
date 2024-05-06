const express = require("express");
const { addReport,getReport, deleteReport, updateReport  } = require("../controllers/reportsController");
const reportRouter = express.Router();

reportRouter.get("/:reportId",getReport );
reportRouter.post("/", addReport);
reportRouter.delete("/:reportId", deleteReport);
reportRouter.patch("/:reportId", updateReport);

module.exports = reportRouter;