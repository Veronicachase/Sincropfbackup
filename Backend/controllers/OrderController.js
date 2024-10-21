const orderDao = require("../services/DAO/orderDao");
const path = require("path");
const uploadImage = require("../public/cloudinary/uploadImage")


const addOrder = async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
  
      const userId = req.user.userId;
      const orderData = req.body;
      
      if (req.file) {
      
        orderData.image = req.file.path;
      }

      const completeOrderData = {
        date: orderData.date || moment().format("YYYY-MM-DD"),
        projectId: orderData.projectId || null,
        projectName: orderData.projectName || null,
        productName: orderData.productName || null,
        provider: orderData.provider || null,
        amount: orderData.amount || null,
        brand: orderData.brand || null,
        details: orderData.details || null,
        status: orderData.status || 'pendiente',
        image: orderData.image || null,
       
      };
   
      const orderId = await orderDao.addOrder(completeOrderData, userId);
      res.status(201).json({ message: "Pedido de orden creado exitosamente", orderId });
    } catch (error) {
      console.error("Error al agregar el pedido:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

const getOrder = async (req, res) => {
    try {
      const userId = req.user.userId;
        const orderId = req.params.orderId;
        const order = await orderDao.getOrder(orderId, userId);
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
      const userId = req.user.userId;
        const orders = await orderDao.getAllOrders(userId);
        
        if (orders && orders.length > 0) {
            res.status(200).json(orders)
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        console.error("Error al obtener tus pedidos:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const userId = req.user.userId;
        const updatedData = req.body;
        await orderDao.updateOrder(orderId, updatedData, userId);
        res.json({ message: "Pedido actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el pedido:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { orderId } = req.params;
      const result = await orderDao.deleteOrder(orderId, userId);
      if (result.affectedRows === 0) {
        return res.status(404).send("Pedido no encontrado");
      }
      return res.status(200).send("Pedido eliminado correctamente");
    } catch (error) {
      return res.status(500).send("Error al eliminar el pedido");
    }
  };



module.exports = { addOrder,deleteOrder, updateOrder, getOrder,getAllOrders };
