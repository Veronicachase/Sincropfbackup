/* eslint-disable react/prop-types */

import { jsPDF } from 'jspdf';
import { Button } from '@mui/material';
import domtoimage from 'dom-to-image';

const CreatePDFButton = ({ content, imageUrl, fileName = 'download.pdf' }) => {
    const createPdf = async () => {
        const doc = new jsPDF();

        let y = 10; 
        content.forEach(line => {
            doc.text(line.text, 10, y);
            y += 10; 
        });

        if (imageUrl) {
            const image = await domtoimage.toPng(document.querySelector(imageUrl));
            const imgProps = doc.getImageProperties(image);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            doc.addImage(image, 'PNG', 10, y, pdfWidth - 20, pdfHeight);
            y += pdfHeight + 10;
        }

        doc.save(fileName);
    };

    return (
        <Button onClick={createPdf} variant="contained" color="#84C7AE">
            Crear PDF
        </Button>
    );
};

export default CreatePDFButton;
