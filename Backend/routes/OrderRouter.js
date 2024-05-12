const express = require("express");
const { addOrder,getOrder,getAllOrders, deleteOrder, updateOrder  } = require("../controllers/orderController");
const orderRouter = express.Router();

orderRouter.get("/:orderId",getOrder );
orderRouter.get("/",getAllOrders );
orderRouter.post("/", addOrder);
orderRouter.delete("/:orderId", deleteOrder);
orderRouter.patch("/:orderId", updateOrder);

module.exports = orderRouter;

