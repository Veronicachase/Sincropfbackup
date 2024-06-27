//const { jwtVerify } = require("jose");
const { jwtVerify } = require("jose");
const HoursDao = require("../services/DAO/hoursDao");
const employeeDao = require("../services/DAO/employeeDao"); 
const moment = require('moment');

const getHoursByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { start, end } = req.query; // aqui obtengo start y end de req.query
    const hours = await HoursDao.gethoursByEmployeeId(employeeId, start, end);
    if (!hours || hours.length === 0) return res.status(404).send("Horas no encontradas para este trabajador");
    return res.status(200).json(hours);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Error al obtener las horas del trabajador");
  }
};

const addHours = async (req, res) => {
  try {
    const { employeeId } = req.params; 
    const { date, regularHours, regularMinutes, extraHours, extraMinutes } = req.body; 

    if (!employeeId) {
      return res.status(400).send("ID del empleado es requerido");
    }

    const hoursData = {
      date: moment().format("YYYY-MM-DD"),
      regularHours,
      regularMinutes,
      extraHours,
      extraMinutes,
      employeeId, 
    };

    const newHours = await HoursDao.addHours(employeeId, hoursData);
    if (newHours && newHours.insertId) {
      return res.status(201).json({ message: `Horas añadidas con ID: ${newHours.insertId}` });
    } else if (newHours && newHours.insertId === undefined) {
      return res.status(201).json({ message: "Horas añadidas correctamente (sin ID)" });
    } else {
      return res.status(500).json({ message: "Error al agregar las horas, ID no disponible." });
    }
  } catch (e) {
    console.error('Error al agregar las horas:', e.message);
    return res.status(500).json({ message: "Error interno del servidor" });
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


module.exports = { getHoursByEmployeeId, addHours, updateHours, deleteHour };
