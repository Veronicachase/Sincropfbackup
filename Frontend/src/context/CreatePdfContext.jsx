/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';

export const CreatePdfContext = createContext();

export function useCreatePdfContext() {
    return useContext(CreatePdfContext);
}

export function CreatePdfContextProvider({ children }) {
    const [loading, setLoading] = useState(false);

    async function createPdf(trabajador, horasTrabajadas) {
        setLoading(true);
        const pdfDoc = await PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 11;
        let yOffset = height - 50;

        page.drawText(`Nombre: ${trabajador.name}`, { x: 50, y: yOffset, size: fontSize, font: timesRomanFont });
        yOffset -= 15;
        page.drawText(`Obra: ${trabajador.proyect}`, { x: 50, y: yOffset, size: fontSize, font: timesRomanFont });

        horasTrabajadas.forEach(time => {
            yOffset -= 15;
            page.drawText(`Fecha: ${time.date}, Horas Regulares: ${time.hour}, Extras: ${time.minutes}`, { x: 50, y: yOffset, size: fontSize, font: timesRomanFont });
        });

        const pdfBytes = await pdfDoc.save();
        setLoading(false);
        return pdfBytes;
    }

    return (
        <CreatePdfContext.Provider value={{ createPdf, loading }}>
            {children}
        </CreatePdfContext.Provider>
    );
}