import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const CreateEmployeePDFButton = ({ employee, hoursWorked, fileName = `${employee.name}.pdf` }) => {
  const [open, setOpen] = useState(false);
  const [customText, setCustomText] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextChange = (text) => {
    setCustomText(text);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    let y = 10;

    // Comprobación de que employee está definido y tiene las propiedades necesarias
    if (employee) {
      // Añadir información del empleado
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Nombre:', 10, y);
      doc.setFont('helvetica', 'normal');
      doc.text(employee.name || 'N/A', 40, y);
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.text('Obra:', 10, y);
      doc.setFont('helvetica', 'normal');
      doc.text(employee.project || 'N/A', 40, y);
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.text('Posición:', 10, y);
      doc.setFont('helvetica', 'normal');
      doc.text(employee.position || 'N/A', 40, y);
      y += 10;
    } else {
      doc.text('Información del empleado no disponible.', 10, y);
      y += 10;
    }

    // Añadir texto personalizado
    if (customText) {
      doc.text(`Nota personalizada: ${customText}`, 10, y);
      y += 10;
    }

    // Añadir horas trabajadas en una tabla
    doc.setFontSize(14);
    doc.text('Horas trabajadas:', 10, y);
    y += 10;

    if (hoursWorked && hoursWorked.length > 0) {
      const tableColumn = ["Fecha", "Horas Regulares", "Horas Extras", "Total"];
      const tableRows = [];

      hoursWorked.forEach(entry => {
        const rowData = [
          new Date(entry.date).toLocaleDateString("es-ES", {
            weekday: "short",
            day: "numeric",
          }),
          `${entry.regularHours.toFixed(1)}h ${entry.regularMinutes}m`,
          `${(entry.extraHours || 0).toFixed(1)}h ${entry.extraMinutes || 0}m`,
          `${(entry.regularHours + (entry.extraHours || 0)).toFixed(1)}h ${((entry.regularMinutes || 0) + (entry.extraMinutes || 0)) % 60}m`
        ];
        tableRows.push(rowData);
      });

      autoTable(doc, {
        startY: y,
        head: [tableColumn],
        body: tableRows,
        theme: 'grid'
      });
    } else {
      doc.text('No se encontraron horas trabajadas en la última semana.', 10, y);
      y += 10;
    }

    doc.save(fileName);
    setOpen(false);
  };

  return (
    <>
      <Button type='button' onClick={handleClickOpen} variant="contained" style={{ backgroundColor: "#1976d2" }} aria-label="Create PDF">
        Crear PDF del Empleado
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Añadir Nota Personalizada</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="customText"
            label="Nota Personalizada"
            type="text"
            fullWidth
            variant="standard"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleGeneratePDF}>Generar PDF</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

CreateEmployeePDFButton.propTypes = {
  employee: PropTypes.shape({
    name: PropTypes.string,
    project: PropTypes.string,
    position: PropTypes.string,
  }),
  hoursWorked: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      regularHours: PropTypes.number.isRequired,
      regularMinutes: PropTypes.number.isRequired,
      extraHours: PropTypes.number,
      extraMinutes: PropTypes.number,
    })
  ),
  fileName: PropTypes.string,
};

export default CreateEmployeePDFButton;








