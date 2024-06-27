import jsPDF from "jspdf";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { sectionMapping } from "./SectionMappingIcons";

const CreatePDFButtonPData = ({ project, tasks, fileName }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const imageWidth = 50;
    const imageHeight = 50;
    const imagesPerRow = 3;

    // Helper function to check if there is enough space on the current page
    const checkPageSpace = (doc, currentY, requiredSpace) => {
      if (currentY + requiredSpace > 270) {
        doc.addPage();
        return 10; // Reset y to the top margin of the new page
      }
      return currentY;
    };

    // Datos generales del proyecto
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("DATOS DEL PROYECTO", 10, 10);
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
    doc.text(`Provincia: ${project.province}`, 10, y);
    y += 20; // Espacio extra antes de las secciones y tareas

    // Verificar que tasks esté definido
    if (!tasks) {
      console.error("tasks no está definido");
      return;
    }

    // Secciones y tareas
    const sectionsWithTasks = Object.keys(tasks).filter(
      (section) => tasks[section] && tasks[section].length > 0
    );

    sectionsWithTasks.forEach((section) => {
      y = checkPageSpace(doc, y, 20);
      doc.setFont("helvetica", "bold");
      doc.text(sectionMapping[section]?.name || section, 10, y);
      y += 10;

      tasks[section].forEach((task) => {
        y = checkPageSpace(doc, y, 40);
        doc.setFont("helvetica", "normal");
        doc.text(`Tarea: ${task.taskName}`, 10, y);
        y += 10;
        doc.text(`Descripción: ${task.taskDescription}`, 10, y);
        y += 10;
        doc.text(`Fecha de inicio: ${task.startDate}, Fecha de terminación: ${task.endDate}`, 10, y);
        y += 10;

        // Imágenes anteriores
        if (task.prevImages && task.prevImages.length > 0) {
          doc.text("Imágenes anteriores:", 10, y);
          y += 10;
          let imageRowIndex = 0;
          task.prevImages.forEach((image, index) => {
            if (index % imagesPerRow === 0 && index !== 0) {
              y += imageHeight + 10;
              imageRowIndex = 0;
              y = checkPageSpace(doc, y, imageHeight + 10);
            }
            if (y + imageHeight > 270) {
              doc.addPage();
              y = 10;
            }
            doc.addImage(image, 'JPEG', 10 + imageRowIndex * (imageWidth + 10), y, imageWidth, imageHeight);
            imageRowIndex++;
          });
          y += imageHeight + 10; // Espacio extra después de las imágenes
        }

        // Imágenes finales
        if (task.finalImages && task.finalImages.length > 0) {
          doc.text("Imágenes finales:", 10, y);
          y += 10;
          let imageRowIndex = 0;
          task.finalImages.forEach((image, index) => {
            if (index % imagesPerRow === 0 && index !== 0) {
              y += imageHeight + 10;
              imageRowIndex = 0;
              y = checkPageSpace(doc, y, imageHeight + 10);
            }
            if (y + imageHeight > 270) {
              doc.addPage();
              y = 10;
            }
            doc.addImage(image, 'JPEG', 10 + imageRowIndex * (imageWidth + 10), y, imageWidth, imageHeight);
            imageRowIndex++;
          });
          y += imageHeight + 10; // Espacio extra después de las imágenes
        }

        y += 20; // Espacio extra antes de la siguiente tarea
      });
    });

    // Guardar el PDF
    doc.save(fileName);
  };

  return <Button variant="contained" onClick={generatePDF}>Crear PDF</Button>;
};

CreatePDFButtonPData.propTypes = {
  project: PropTypes.object,
  tasks: PropTypes.object,
  fileName: PropTypes.string,
};

export default CreatePDFButtonPData;
