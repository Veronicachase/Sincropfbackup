const pendingDao = require("../services/DAO/pendingDao");
const path = require("path");

const addPending = async (req, res) => {
  try {
    const userId = req.user.userId;
    const data = req.body;
    const pendingId = await pendingDao.addPending({ ...data, userId });
    res
      .status(201)
      .json({
        message: "Pedido de pending creado exitosamente",
        pendingId,
        userId,
      });
  } catch (error) {
    console.error("Error al agregar el pendiente:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getPendingById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const pendingId = req.params.pendingId;
    const pending = await pendingDao.getPendingById(pendingId, userId);
    if (pending) {
      res.json(pending);
    } else {
      res.status(404).json({ message: "el pendiente  no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el pediente:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getAllPendings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const pendings = await pendingDao.getAllPendings(userId);
    if (pendings) {
      res.json(pendings);
    } else {
      res.status(404).json({ message: "No hay pedidos creados" });
    }
  } catch (error) {
    console.error("Error al obtener tus pedidos:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const updatePending = async (req, res) => {
  try {
    //const userId = req.user.userId;
    const pendingId = req.params.pendingId;
    const updatedData = req.body;
    await pendingDao.updatePending(pendingId, updatedData);
    res.json({ message: "Pendiente actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el pendiente:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deletePending = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { pendingId } = req.params;
    if (!pendingId || (typeof pendingId !== 'number' && typeof pendingId !== 'string')) {
        return res.status(400).send("ID de pendiente no válido");
      }
    const result = await pendingDao.deletePending(pendingId, userId);
    if (result.affectedRows === 0) {
      return res.status(404).send("Pendiente no encontrado");
    }
    return res.status(200).send("Pendiente  eliminado correctamente");
  } catch (error) {
    return res.status(500).send("Error al eliminar el pendiente");
  }
};

module.exports = {
  addPending,
  deletePending,
  updatePending,
  getPendingById,
  getAllPendings,
};
