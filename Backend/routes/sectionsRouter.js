const express = require("express");
const { getSections } = require("../controllers/sectionsController");
const sectionsRouter = express.Router();

sectionsRouter.get("/",getSections );
// sectionsRouter.post("/", addReport);
// sectionsRouter.delete("/:reportId", deleteReport);
// sectionsRouter.patch("/:reportId", updateReport);

module.exports = sectionsRouter;