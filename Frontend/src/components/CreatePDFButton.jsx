
import  { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CreatePDFButton = ({ project, tasks, fileName }) => {
  const [additionalInfo, setAdditionalInfo] = useState('');

  const generatePDF = () => {
    const doc = new jsPDF();

    tasks.forEach((task, index) => {
      doc.text(`Task Name: ${task.taskName}`, 10, 10 + index * 10);
      doc.text(`Description: ${task.taskDescription}`, 10, 20 + index * 10);
      doc.text(`Start Date: ${task.startDate}`, 10, 30 + index * 10);
      doc.text(`End Date: ${task.endDate}`, 10, 40 + index * 10);

      if (task.prevImages && task.prevImages.length > 0) {
        task.prevImages.forEach((image, imgIndex) => {
          doc.addImage(image, 'JPEG', 10 + imgIndex * 30, 50 + index * 10, 20, 20);
        });
      }

      if (task.finalImages && task.finalImages.length > 0) {
        task.finalImages.forEach((image, imgIndex) => {
          doc.addImage(image, 'JPEG', 10 + imgIndex * 30, 80 + index * 10, 20, 20);
        });
      }

      doc.text(`Additional Info: ${additionalInfo}`, 10, 110 + index * 10);
    });

    doc.save(fileName);
  };

  return (
    <Box mt={2}>
      <TextField
        label="Additional Information"
        multiline
        rows={4}
        fullWidth
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={generatePDF} sx={{ mt: 2 }}>
        Generate PDF
      </Button>
    </Box>
  );
};

export default CreatePDFButton;
