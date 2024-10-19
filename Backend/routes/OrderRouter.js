const express = require("express");
const { addOrder,getOrder,getAllOrders, deleteOrder, updateOrder  } = require("../controllers/orderController");
const orderRouter = express.Router();
const authenticateToken = require("../middleWares/authenticateToken");
const upload = require("../public/cloudinary/uploadMiddleware");



orderRouter.get("/:orderId",getOrder );
orderRouter.get("/",getAllOrders );
orderRouter.post("/", authenticateToken, upload.single("image"), addOrder);
orderRouter.delete("/:orderId", deleteOrder);
orderRouter.patch("/:orderId", updateOrder);


module.exports = orderRouter;

