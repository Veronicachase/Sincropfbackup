const trabajadorDao = require("../services/DAO/trabajadorDao");
const { jwtVerify } = require("jose");

const getTrabajador = async (req, res) => {
  try {
    const { employeeId } = req.params; 
    const trabajador = await trabajadorDao.getTrabajadorByReference(employeeId);
    if (!trabajador) return res.status(404).send("Trabajador no encontrado");
    return res.status(200).json(trabajador);
  } catch (e) {
    return res.status(500).send("Error al obtener el trabajador");
  }
};

const addTrabajador = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401); 
  const token = authorization.split(" ")[1];

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(token, encoder.encode(process.env.JWT_SECRET));

    const trabajadorData = {
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      name: payload.name, 
      position: req.body.position,
      project: req.body.project,
      mandatoryEquipment: req.body.mandatoryEquipment,
      comments: req.body.comments,
    };

    const nuevoTrabajador = await trabajadorDao.addtrabajador(trabajadorData);
    return res.status(201).send(`Trabajador añadido con ID: ${nuevoTrabajador.insertId}`);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Internal Server Error");
  }
};

const updateTrabajador = async (req, res) => {
  const { employeeId } = req.params; 
  const { name, position, project, mandatoryEquipment, comments } = req.body;
  try {
    const trabajadorData = { name, position, project, mandatoryEquipment, comments };
    const result = await trabajadorDao.updateTrabajador(employeeId, trabajadorData);
    if (result.affectedRows === 0) return res.status(404).send("Trabajador no encontrado");
    return res.status(200).send("Trabajador actualizado correctamente");
  } catch (e) {
    return res.status(500).send("Error al actualizar trabajador");
  }
};

const deleteTrabajador = async (req, res) => {
  try {
    const { employeeId } = req.params; 
    const result = await trabajadorDao.deleteTrabajador(employeeId);
    if (result.affectedRows === 0) return res.status(404).send("Trabajador no encontrado");
    return res.status(200).send("Trabajador eliminado correctamente");
  } catch (e) {
    return res.status(500).send("Error al eliminar trabajador");
  }
};

module.exports = { getTrabajador, addTrabajador, updateTrabajador, deleteTrabajador };
