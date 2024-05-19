const orderDao = require("../services/DAO/orderDao");
const path = require("path");

const addOrder = async (req, res) => {
    try {
        const orderId = await orderDao.addOrder(req.body);
        res.status(201).json({ message: "Pedido de order creado exitosamente", orderId });
    } catch (error) {
        console.error("Error al agregar el pedido:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await orderDao.getOrder(orderId);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "pedido no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el pedido:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderDao.getAllOrders();
        if (orders) {
            res.json(orders);
        } else {
            res.status(404).json({ message: "No hay pedidos creados" });
        }
    } catch (error) {
        console.error("Error al obtener tus pedidos:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const updatedData = req.body;
        await orderDao.updateOrder(orderId, updatedData);
        res.json({ message: "Pedido actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el pedido:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const result = await orderDao.deleteOrder(orderId);
      if (result.affectedRows === 0) {
        return res.status(404).send("Pedido no encontrado");
      }
      return res.status(200).send("Pedido eliminado correctamente");
    } catch (error) {
      return res.status(500).send("Error al eliminar el pedido");
    }
  };



module.exports = { addOrder,deleteOrder, updateOrder, getOrder,getAllOrders };
