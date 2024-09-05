const employeeDao = require("../services/DAO/employeeDao");
const moment = require("moment");

const getEmployeeById = async (req, res) => {
  try {
    const { employeeId } = req.params; 
    const employee = await employeeDao.getEmployeeById(employeeId);
    if (!employee) return res.status(404).send("Trabajador no encontrado");
    return res.status(200).json(employee);
  } catch (e) {
    return res.status(500).send("Error al obtener el Trabajador");
  }
};

const getAllEmployees = async (req, res) => {
  try {
      const employees = await employeeDao.getAllEmployees();
     
      if (employees) {
          res.json(employees);
      } else {
          res.status(404).json({ message: "No hay Trabajadores creados" });
      }
  } catch (error) {
      console.error("Error al obtener trabajadores:", error.message);
      res.status(500).json({ error: error.message });
  }
};

const addEmployee = async (req, res) => {
  try {
    const userId = req.user.userId; 
    
    const employeeData = {
      date: moment().format('YYYY-MM-DD'),
      name: req.body.name, 
      position: req.body.position,
      project: req.body.project,
      mandatoryEquipment: req.body.mandatoryEquipment,
      comments: req.body.comments,
      userId, 
    };

    const nuevoEmployee = await employeeDao.addEmployee(userId, employeeData);
    return res.status(201).json(`Trabajador añadido con ID: ${nuevoEmployee.insertId}`);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Internal Server Error");
  }
};

const updateEmployee = async (req, res) => {
  const { employeeId } = req.params; 
  const { name, position, project, mandatoryEquipment, comments } = req.body;
  try {
    const employeeData = { name, position, project, mandatoryEquipment, comments };
    const result = await employeeDao.updateEmployee(employeeId, employeeData);
    if (result.affectedRows === 0) return res.status(404).send("Trabajador no encontrado");
    return res.status(200).send("Trabajador actualizado correctamente");
  } catch (e) {
    return res.status(500).send("Error al actualizar Trabajador");
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params; 
    const result = await employeeDao.deleteEmployee(employeeId);
    if (result.affectedRows === 0) return res.status(404).send("Trabajador no encontrado");
    return res.status(200).send("Trabajador eliminado correctamente");
  } catch (e) {
    return res.status(500).send("Error al eliminar Trabajador");
  }
};

module.exports = { getEmployeeById, getAllEmployees, addEmployee, updateEmployee, deleteEmployee };
