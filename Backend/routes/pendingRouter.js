const express = require("express");
const { addPending,getPendingById,getAllPendings, deletePending, updatePending } = require("../controllers/pendingController");
const pendingRouter = express.Router();

pendingRouter.get("/:pendingId",getPendingById );
pendingRouter.get("/",getAllPendings );
pendingRouter.post("/", addPending);
pendingRouter.delete("/:pendingId", deletePending);
pendingRouter.patch("/:pendingId", updatePending);

module.exports = pendingRouter;
