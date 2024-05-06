const reportsDao = require("../services/DAO/reportsDao");
const { jwtVerify } = require("jose");

const getReport = async (req, res) => {
  try {
    const { reportId } = req.params; 
    const report = await reportsDao.getreportByReference(reportId);
    if (!report) return res.status(404).send("Reporte no encontrado");
    return res.status(200).json(report);
  } catch (e) {
    return res.status(500).send("Error al obtener el Reporte");
  }
};

const addReport = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401); 
  const token = authorization.split(" ")[1];

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(token, encoder.encode(process.env.JWT_SECRET));

    const reportData = {
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      name: payload.name, 
      reportName: req.body.reportName,
      reportDate: req.body.reportDate,
      reportType:req.body.reportType
    };

    const newReport = await reportsDao.addreport(reportData);
    return res.status(201).send(`Reporte añadido con ID: ${newReport.insertId}`);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Internal Server Error");
  }
};

const updateReport = async (req, res) => {
  const { reportId } = req.params; 
  const { reportName, reportDate, reportType } = req.body;
  try {
    const reportData = { reportName, reportDate, reportType};
    const result = await reportsDao.updateReport(reportId, reportData);
    if (result.affectedRows === 0) return res.status(404).send("Reporte no encontrado");
    return res.status(200).send("Reporte actualizado correctamente");
  } catch (e) {
    return res.status(500).send("Error al actualizar el reporte");
  }
};

const deleteReport = async (req, res) => {
  try {
    const { reportId } = req.params; 
    const result = await reportDao.deleteReport(reportId);
    if (result.affectedRows === 0) return res.status(404).send("Reporte no encontrado");
    return res.status(200).send("Reporte eliminado correctamente");
  } catch (e) {
    return res.status(500).send("Error al eliminar reporte");
  }
};

module.exports = { getReport, addReport, updateReport, deleteReport };
