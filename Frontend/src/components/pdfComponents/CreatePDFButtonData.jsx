import jsPDF from "jspdf";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;

const CreatePDFButtonPData = ({ project, tasks, projectId }) => {
  const generatePDF = async () => {
    const doc = new jsPDF();
    const imageWidth = 50;
    const imageHeight = 50;
    const imagesPerRow = 3;

    const checkPageSpace = (doc, currentY, requiredSpace) => {
      if (currentY + requiredSpace > 270) {
        doc.addPage();
        return 10;
      }
      return currentY;
    };

    // Datos generales del proyecto
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 0, 0);
    doc.text("MARVEL CONSTRUCCIONES", 10, 10);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Datos del Proyecto", 10, 20);

    doc.setDrawColor(211, 211, 211);
    doc.line(10, 25, 200, 25);

    let y = 30;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Nombre del proyecto: ${project.projectName}`, 10, y);
    y += 10;
    doc.text(`Fecha de inicio: ${project.startDate}`, 10, y);
    y += 10;
    doc.text(`Fecha de entrega: ${project.endDate}`, 10, y);
    y += 10;
   
    doc.text(`Empresa contratante: ${project.hiringCompany}`, 10, y);
    y += 10;
    doc.text(
      `Descripción general del proyecto: ${project.projectDescription}`,
      10,
      y
    );
    y += 20;

    doc.setDrawColor(211, 211, 211);
    doc.line(10, y, 200, y);
    y += 10;

    if (!tasks) {
      console.error("tasks no está definido");
      return;
    }

    const sectionsWithTasks = Object.keys(tasks).filter(
      (section) => tasks[section] && tasks[section].length > 0
    );

    sectionsWithTasks.forEach((section) => {
      y = checkPageSpace(doc, y, 20);
      doc.setFont("helvetica", "bold");
      doc.text(section, 10, y);
      y += 10;

      tasks[section].forEach((task) => {
        y = checkPageSpace(doc, y, 40);
        doc.setFont("helvetica", "normal");
        doc.text(`Tarea: ${task.taskName}`, 10, y);
        y += 10;
        doc.text(`Descripción: ${task.taskDescription}`, 10, y);
        y += 10;
        doc.text(
          `Fecha de inicio: ${task.startDate}, Fecha de terminación: ${task.endDate}`,
          10,
          y
        );
        y += 10;

        if (task.prevImages && task.prevImages.length > 0) {
          y = checkPageSpace(doc, y, imageHeight + 20);
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
            doc.addImage(
              image,
              "JPEG",
              10 + imageRowIndex * (imageWidth + 10),
              y,
              imageWidth,
              imageHeight
            );
            imageRowIndex++;
          });
          y += imageHeight + 10;
        }

        if (task.finalImages && task.finalImages.length > 0) {
          y = checkPageSpace(doc, y, imageHeight + 20);
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
            doc.addImage(
              image,
              "JPEG",
              10 + imageRowIndex * (imageWidth + 10),
              y,
              imageWidth,
              imageHeight
            );
            imageRowIndex++;
          });
          y += imageHeight + 10;
        }

        doc.setDrawColor(211, 211, 211);
        doc.line(10, y, 200, y);
        y += 10;

        y += 20;
      });
    });
    // Convertir el PDF a Blob
    const pdfBlob = doc.output("blob");
    const currentDate = new Date().toISOString().split("T")[0];
    const fileName = `reporte_${project.projectName}_${currentDate}.pdf`;
    const pdfFile = new File([pdfBlob], fileName, { type: pdfBlob.type });

    // Crear un FormData para enviar el PDF
    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("projectId", projectId);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      // Subir el PDF a Cloudinary
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiUrl}/projects/${projectId}/upload-report`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();

      toast.success("Reporte creado exitosamente");
    } catch (error) {
      console.error("Error subiendo el PDF:", error);
    }
  };

  return (
    <Button variant="contained" onClick={generatePDF}>
      Crear PDF
    </Button>
  );
};

CreatePDFButtonPData.propTypes = {
  project: PropTypes.object,
  tasks: PropTypes.object,
  fileName: PropTypes.string,
  projectId: PropTypes.string.isRequired,
};

export default CreatePDFButtonPData;
