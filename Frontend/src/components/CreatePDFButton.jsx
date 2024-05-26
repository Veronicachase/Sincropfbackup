
import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment } from '@mui/material';
import domtoimage from 'dom-to-image-more'; 
import VoiceInputNoFormik from './VoiceInputNoFormik'; 

const CreatePDFButton = ({ content, images = [], fileName = 'download.pdf' }) => {
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

  const handleGeneratePDF = async () => {
    const doc = new jsPDF();
    let y = 10;
    
    // Añadir el contenido principal
    content.forEach(line => {
      doc.text(line.text, 10, y);
      y += 10;
    });

    // Añadir el texto personalizado
    if (customText) {
      doc.text(`Nota personalizada: ${customText}`, 10, y);
      y += 10;
    }

    // Añadir las imágenes
    for (const imageUrl of images) {
      try {
        const image = await domtoimage.toPng(document.querySelector(`img[src="${imageUrl}"]`));
        const imgProps = doc.getImageProperties(image);
        const pdfWidth = doc.internal.pageSize.getWidth() - 20;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(image, 'PNG', 10, y, pdfWidth, pdfHeight);
        y += pdfHeight + 10;
      } catch (error) {
        console.error('Error generating image for PDF:', error);
      }
    }

    doc.save(fileName);
    setOpen(false);
  };

  return (
    <>
      <Button type='button' onClick={handleClickOpen} variant="contained" style={{ backgroundColor: '#84C7AE' }} aria-label="Create PDF">
        Crear PDF
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
            InputProps={{
              endAdornment: <VoiceInputNoFormik onTextChange={handleTextChange} />
            }}
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

export default CreatePDFButton;















// import { useState } from 'react';
// import { jsPDF } from 'jspdf';
// import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment } from '@mui/material';
// import domtoimage from 'dom-to-image-more'; 
// import VoiceInputNoFormik from './VoiceInputNoFormik'; // Asegúrate de que la ruta sea correcta

// const CreatePDFButton = ({ content, imageUrl, tasks, fileName = 'download.pdf' }) => {
//   const [open, setOpen] = useState(false);
//   const [customText, setCustomText] = useState('');

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleTextChange = (text) => {
//     setCustomText(text);
//   };

//   const handleGeneratePDF = async () => {
//     const doc = new jsPDF();
//     let y = 10;
    
//     // Añadir el contenido principal
//     content.forEach(line => {
//       doc.text(line.text, 10, y);
//       y += 10;
//     });

//     // Añadir el texto personalizado
//     if (customText) {
//       doc.text(`Nota personalizada: ${customText}`, 10, y);
//       y += 10;
//     }

//     // Añadir la imagen principal
//     if (imageUrl) {
//       try {
//         const image = await domtoimage.toPng(document.querySelector(imageUrl));
//         const imgProps = doc.getImageProperties(image);
//         const pdfWidth = doc.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//         doc.addImage(image, 'PNG', 10, y, pdfWidth - 20, pdfHeight);
//         y += pdfHeight + 10;
//       } catch (error) {
//         console.error('Error generating image for PDF:', error);
//       }
//     }

//     // Añadir las tareas organizadas por sección
//     for (const section in tasks) {
//       doc.text(`Sección: ${section}`, 10, y);
//       y += 10;
//       tasks[section].forEach(task => {
//         doc.text(`Tarea: ${task.taskName}`, 10, y);
//         y += 10;

//         // Añadir imágenes de la tarea
//         for (let i = 0; i < task.images.length; i += 3) {
//           const imgSet = task.images.slice(i, i + 3);
//           let x = 10;
//           imgSet.forEach(async (img, index) => {
//             try {
//               const image = await domtoimage.toPng(document.querySelector(img));
//               const imgProps = doc.getImageProperties(image);
//               const imgWidth = 50;
//               const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
//               doc.addImage(image, 'PNG', x, y, imgWidth, imgHeight);
//               x += imgWidth + 10;
//             } catch (error) {
//               console.error('Error generating image for PDF:', error);
//             }
//           });
//           y += 60;
//         }
//       });
//       y += 20;
//     }

//     doc.save(fileName);
//     setOpen(false);
//   };

//   return (
//     <>
//       <Button type='button' onClick={handleClickOpen} variant="contained" style={{ backgroundColor: '#84C7AE' }} aria-label="Create PDF">
//         Crear PDF
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Añadir Nota Personalizada</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="customText"
//             label="Nota Personalizada"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={customText}
//             onChange={(e) => setCustomText(e.target.value)}
//             InputProps={{
//               endAdornment: <VoiceInputNoFormik onTextChange={handleTextChange} />
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancelar</Button>
//           <Button onClick={handleGeneratePDF}>Generar PDF</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default CreatePDFButton;
