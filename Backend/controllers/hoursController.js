const { jwtVerify } = require("jose");
const HoursDao = require("../services/DAO/hoursDao");
const employeeDao = require("../services/DAO/employeeDao"); 

const getHoursById = async (req, res) => {
  try {
    const { employeeId } = req.params; 
    const hours = await HoursDao.gethoursByEmployeeId(employeeId);
    if (!hours || hours.length === 0) return res.status(404).send("Horas no encontradas para este trabajador");
    return res.status(200).json(hours);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Error al obtener las horas del trabajador");
  }
};

const addHours = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401); 
  const token = authorization.split(" ")[1];

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(token, encoder.encode(process.env.JWT_SECRET));

    const hoursData = {
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      regularHours: req.body.regularHours,
      regularMinutes: req.body.regularMinutes,
      extraHours: req.body.extraHours,
      extraMinutes: req.body.extraMinutes,
      employeeId: req.body.employeeId
    };

    const newHours = await HoursDao.addHours(req.body.employeeId, hoursData);
    return res.status(201).send(`Horas añadidas con ID: ${newHours.insertId}`);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Internal Server Error");
  }
};

const updateHours = async (req, res) => {
  const { employeeId } = req.params; 
  const { regularHours, regularMinutes, extraHours, extraMinutes } = req.body;
  try {
    const hoursData = { regularHours, regularMinutes, extraHours, extraMinutes };
    const result = await HoursDao.updateHours(employeeId, hoursData);
    if (result.affectedRows === 0) return res.status(404).send("Horas no encontradas para este trabajador");
    return res.status(200).send("Horas del trabajador actualizadas correctamente");
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Error al actualizar horas");
  }
};

const deleteHour = async (req, res) => {
  try {
    const { employeeId } = req.params; 
    const result = await HoursDao.deleteHour(employeeId);
    if (result.affectedRows === 0) return res.status(404).send("Horas no encontradas para este trabajador");
    return res.status(200).send("Horas eliminadas correctamente");
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Error al eliminar horas");
  }
};

module.exports = { getHoursById, addHours, updateHours, deleteHour };
