


import { useCreatePdfContext } from '../../context/CreatePdfContext';
import {TrabajadorFormSchema} from '../../forms/Trabajadores/trabajador/TrabajadorFormSchema'
import { useState } from 'react';
import { Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Formik, Form, Field } from 'formik';
function Trabajador() {

    const [trabajador, setTrabajador] = useState({});
    const [horasTrabajadas, setHorasTrabajadas] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    async function getTrabajadorInfo() {
        const response = await fetch("http://localhost:3000/api/traerdedb");
        const data = await response.json();
        setTrabajador(data);
    }

    async function getHoras() {
        const response = await fetch(`http://localhost:3000/api/traerdebdhoras?start=${fechaInicio}&end=${fechaFin}`);
        const data = await response.json();
        setHorasTrabajadas(data);
    }

    const { CreatePdf } = useCreatePdfContext()

    const handleSubmithoras = (values, actions) => {
        setHorasTrabajadas([...horasTrabajadas, values]);
        actions.resetForm();
    };

    return (
        <>
            <Box>
                <h4>Información del trabajador</h4>
                <TextField label="Nombre" value={trabajador.name || ''} disabled />
                <TextField label="Posición" value={trabajador.posicion || ''} disabled />
                <TextField label="Obra" value={trabajador.obra || ''} disabled />
                <Button onClick={getTrabajadorInfo}>Cargar Datos</Button>
            </Box>
            <Formik
            initialValues={{ horas: 0, minutos: 0, horasExtra: 0, minutosExtra
                : 0 }}
            validationSchema={TrabajadorFormSchema}
            onSubmit={handleSubmithoras}
        >
            {({ errors, touched }) => (
                <Form>
                    <h4>Ingresar Horas Trabajadas</h4>
                    <Field name="horas" type="number" as={TextField} label="Horas Regulares" error={touched.horas && Boolean(errors.horas)} helperText={touched.horas && errors.horas} />
                    <Field name="minutos" type="number" as={TextField} label="Minutos Regulares" error={touched.minutos && Boolean(errors.minutos)} helperText={touched.minutos && errors.minutos} />
                    <Field name="horasExtra" type="number" as={TextField} label="Horas Extras" error={touched.horasExtra && Boolean(errors.horasExtra)} helperText={touched.horasExtra && errors.horasExtra} />
                    <Field name="minutosExtra" type="number" as={TextField} label="Minutos Extras" error={touched.minutosExtra && Boolean(errors.minutosExtra)} helperText={touched.minutosExtra && errors.minutosExtra} />
                    <Button type="submit">Guardar Horas</Button>
                </Form>
            )}
        </Formik>



            <Box>
                <h4>Historial de horas</h4>
                <p>Escoger fechas</p>
                <TextField label="Inicial" type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
                <TextField label=" Final" type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
                <Button onClick={getHoras}>Buscar</Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell align="right">Regulares</TableCell>
                                <TableCell align="right">Extras</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {horasTrabajadas.map((tiempo, index) => (
                                <TableRow key={index}>
                                    <TableCell>{tiempo.getDate}</TableCell>
                                    <TableCell align="right">{tiempo.hora}</TableCell>
                                    <TableCell align="right">{tiempo.minutos}</TableCell>
                                    <TableCell align="right">{tiempo.hora + tiempo.minutos}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button onClick={CreatePdf}>Crear reporte PDF</Button>
            </Box>
        </>
    );
}

export default Trabajador;
























// // Suponiendo que obtienes los datos del trabajador de algún lado:
// const trabajadorData = {
//   nombre: "Pedrito Perez",
//   posicion: "Capataz",
//   obra: "Camino de Piedras, unidad 3",
//   equipoEntregado: "Pendiente",
//   comentarios: "Cualquier comentario"
// };

// export default function Trabajador() {
//   // Imaginamos que estas funciones interactúan con tu base de datos:
//   const fetchTrabajador = (id) => { /* ... */ };
//   const saveTrabajadorhoras = (data) => { /* ... */ };

//   const initialValues = {
//     fecha: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD
//     horas: '',
//     minutos: '',
//     horasExtras: '',
//     minutosExtras: '',
//   };

//   return (
//     <>  
//       <Box>
//         <h4>{trabajadorData.nombre}</h4>
//         <p>Información del Trabajador</p>
//         <Box>
//           <p><strong>Posición:</strong> {trabajadorData.posicion}</p>
//           <p><strong>Obra:</strong> {trabajadorData.obra}</p>
//           <p>
//             <strong>Equipo entregado:</strong> {trabajadorData.equipoEntregado}
//             {/* Aquí agregarías un Link o un botón para editar */}
//           </p>
//           <Box>
//             <p><strong>Comentarios:</strong> {trabajadorData.comentarios}</p>
//           </Box>
//         </Box>
//       </Box>

//       <Formik
//         initialValues={initialValues}
//         validationSchema={TrabajadorFormSchema}
//         onSubmit={(values, actions) => {
//           saveTrabajadorhoras(values);
//           actions.setSubmitting(false);
//           // Aquí hay que restablecer el formulario o manejar la navegación
//         }}
//       >
//         {({ values, handleChange, handleSubmit }) => (
//           <Form onSubmit={handleSubmit}> 
//             <Box>
//               <Field
//                 as={TextField}
//                 id="fecha"
//                 name="fecha"
//                 label="Fecha"
//                 type="date"
//                 onChange={handleChange}
//                 value={values.fecha}
//               />

//               <p>Horas trabajadas</p>

//               <Field
//                 as={TextField}
//                 name="horas"
//                 type="number"
//                 onChange={handleChange}
//               />

//               <Field
//                 as={TextField}
//                 name="minutos"
//                 type="number"
//                 onChange={handleChange}
//               />

//               <p>Horas Extras</p>

//               <Field
//                 as={TextField}
//                 name="horasExtras"
//                 type="number"
//                 onChange={handleChange}
//               />

//               <Field
//                 as={TextField}
//                 name="minutosExtras"
//                 type="number"
//                 onChange={handleChange}
//               />
              
//               <Button type="submit">Guardar</Button>
//             </Box>
//           </Form>
//         )}
//       </Formik>

//       {/* Aquí implementarías la lógica para mostrar y filtrar el historial */}

//       {/* Para la edición, podrías usar un estado y renderizar condicionalmente 
//           un componente de Formik o habilitar los campos del formulario. */}

//       {/* Para generar un PDF, podrías usar una librería como jsPDF y pasarle los 
//           datos del trabajador y las horas trabajadas para formatear el documento. */}
//     </>
//   );
// }

// // {/* idea para hacer lo del PDF  para la sección de empleado.  debe incluir nombre  posicion, fecha y horas desde tal fecha hasta tal fecha
// // function PdfGenerator() {
// //   const generatePDF = () => {
// //       const doc = new jsPDF();
// //       doc.text("Hello world!", 10, 10);
// //       const pdfData = doc.output("arraybuffer");

// //       // Enviar PDF a Node.js backend
// //       fetch('http://localhost:3000/api/save-pdf', {
// //           method: 'POST',
// //           headers: {
// //               'Content-Type': 'application/pdf',
// //           },
// //           body: pdfData
// //       }).then(res => res.json())
// //         .then(data => console.log(data))
// //         .catch(err => console.error('Error:', err));
// //   };

// //   return (
// //       <div>
// //           <button onClick={generatePDF}>Generate PDF</button>
// //       </div>
// //   );
// // }

// // export default PdfGenerator;*/}



// // hacer un useContext para obtener la info desde crear trabajador
// //crear un get y un map con la lista de los trabajadores activos en base de datos