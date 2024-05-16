const employeeDao = require("../services/DAO/employeeDao");
const { jwtVerify } = require("jose");

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
      console.log(employees)
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
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401); 
  const token = authorization.split(" ")[1];

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(token, encoder.encode(process.env.JWT_SECRET));

    const employeeData = {
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      name: payload.name, 
      position: req.body.position,
      employee: req.body.name,
      mandatoryEquipment: req.body.mandatoryEquipment,
      comments: req.body.comments,
    };

    const nuevoEmployee = await employeeDao.addEmployee(employeeData);
    return res.status(201).send(`trabajador añadido con ID: ${nuevoEmployee.insertId}`);
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
    if (result.affectedRows === 0) return res.status(404).send("employee no encontrado");
    return res.status(200).send("Trabajador eliminado correctamente");
  } catch (e) {
    return res.status(500).send("Error al eliminar Trabajador");
  }
};

module.exports = { getEmployeeById,getAllEmployees, addEmployee, updateEmployee, deleteEmployee };
