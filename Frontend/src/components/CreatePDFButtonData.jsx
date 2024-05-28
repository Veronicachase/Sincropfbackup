import jsPDF from "jspdf";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const CreatePDFButtonPData = ({ project, fileName }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Datos generales del proyecto
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("DATOS DEL PROYECTO", 10, 10);
    const marginBottom = 10;
    let y = 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Nombre del proyecto: ${project.projectName}`, 10, y);
    y += 10;
    doc.text(`Identificador: ${project.identifier}`, 10, y);
    y += 10;
    doc.text(`Empresa contratante: ${project.hiringCompany}`, 10, y);
    y += 10;
    doc.text(`Tipo de Proyecto: ${project.typeOfWork}`, 10, y);
    y += 10;
    doc.text(`Tipo de construcción: ${project.constructionType}`, 10, y);
    y += 10;
    doc.text(`Descripción general del proyecto: ${project.projectDescription}`, 10, y);
    y += 10;
    doc.text(`Fecha de inicio: ${project.startDate}`, 10, y);
    y += 10;
    doc.text(`Fecha de entrega: ${project.endDate}`, 10, y);
    y += 10;
    doc.text(`Estado: ${project.status}`, 10, y);
    y += 20; // Espacio extra antes de la sección de dirección

    // Dirección del proyecto
    doc.setFont("helvetica", "bold");
    doc.text("DIRECCIÓN DEL PROYECTO", 10, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.text(`Dirección: ${project.addressDescription}`, 10, y);
    y += 10;
    doc.text(`Bloque: ${project.block}`, 10, y);
    y += 10;
    doc.text(`No.: ${project.unit}`, 10, y);
    y += 10;
    doc.text(`Código Postal: ${project.zipCode}`, 10, y);
    y += 10;
    doc.text(`Provincia: ${project.province}`, 10, y);

    // Guardar el PDF
    doc.save(fileName);
  };

  return <Button variant="contained" onClick={generatePDF}>Crear PDF</Button>;
};

CreatePDFButtonPData.propTypes = {
  project: PropTypes.object,
  fileName: PropTypes.string,
};

export default CreatePDFButtonPData;
