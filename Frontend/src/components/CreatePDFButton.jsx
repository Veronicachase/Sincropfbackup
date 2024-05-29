import jsPDF from "jspdf";
import PropTypes from "prop-types";

// Función para convertir una URL de imagen a base64
const toBase64 = (url) =>
  fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }));

export const CreatePDFButton = ({ tasks, fileName, additionalInfo }) => {
  const generatePDF = async () => {
    const doc = new jsPDF();

    for (const [index, task] of tasks.entries()) {
      const y = 10 + index * 130; // Incremento en 'y' para evitar superposición de contenido
      
      doc.setFontSize(12); // Tamaño de letra para el título de la tarea
      doc.setFont("helvetica", "bold"); // Cambiar la fuente a negrita
      doc.text("REPORTE", 10, y);

      // Añadir espacio debajo de "REPORTE"
      const marginBottom = 10; // Tamaño del margen inferior
      const nextSectionY = y + marginBottom + 10;

      doc.text(`Tarea:  ${task.taskName}`, 10, nextSectionY);
      doc.setFont("helvetica", "normal"); // Cambiar la fuente a normal
      doc.setFontSize(10); // Tamaño de letra para el contenido de la tarea
      doc.text(`Descripción del trabajo: ${task.taskDescription}`, 10, nextSectionY + 10);
      doc.text(`Fecha de inicio: ${task.startDate}`, 10, nextSectionY + 20);
      doc.text(`Fecha de entrega: ${task.endDate}`, 10, nextSectionY + 30);
      doc.text(`Descripción de trabajo realizado: ${additionalInfo}`, 10, nextSectionY + 40);

      // Línea divisoria
      doc.setLineWidth(0.1);
      doc.line(10, nextSectionY + 50, 200, nextSectionY + 50);

      // Texto antes de las imágenes
      doc.setFont("helvetica", "bold");
      doc.text(`Imágenes Iniciales:`, 10, nextSectionY + 60);

      if (task.prevImages && task.prevImages.length > 0) {
        for (const [imgIndex, imageUrl] of task.prevImages.entries()) {
          const base64Image = await toBase64(imageUrl);
          const imageX = 10 + imgIndex * 70;
          const imageY = nextSectionY + 70;
          const width = 50; // Ancho de la imagen
          const height = 50; // Alto de la imagen

          // Dibujando un rectángulo alrededor de la imagen
          doc.setDrawColor(0); // Negro
          doc.setFillColor(255, 255, 255); // Blanco
          doc.rect(imageX - 2, imageY - 2, width + 4, height + 4, "FD"); // 'FD' para llenar el rectángulo (Fill, Draw)

          // Agregando la imagen
          doc.addImage(base64Image, "JPEG", imageX, imageY, width, height);
        }
      }

      // Texto antes de las imágenes finales
      doc.text(`Imágenes Finales:`, 10, nextSectionY + 130);

      if (task.finalImages && task.finalImages.length > 0) {
        for (const [imgIndex, imageUrl] of task.finalImages.entries()) {
          const base64Image = await toBase64(imageUrl);
          const imageX = 10 + imgIndex * 70;
          const imageY = nextSectionY + 140;
          const width = 50; // Ancho de la imagen
          const height = 50; // Alto de la imagen

          // Dibujando un rectángulo alrededor de la imagen
          doc.setDrawColor(0); // Negro
          doc.setFillColor(255, 255, 255); // Blanco
          doc.rect(imageX - 2, imageY - 2, width + 4, height + 4, "FD"); // 'FD' para llenar el rectángulo (Fill, Draw)

          // Agregando la imagen
          doc.addImage(base64Image, "JPEG", imageX, imageY, width, height);
        }
      }
    }

    doc.save(fileName);
  };

  return <button style={{marginTop:"2em", backgroundColor:"#1976D2", color:"#fff", border:"none", padding:".5em 1em", borderRadius:"5px"}} onClick={generatePDF}>Crear PDF</button>;
};

CreatePDFButton.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  fileName: PropTypes.string,
  additionalInfo: PropTypes.string,
};
