
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { getEmployeeById } from "../../api/getEmployeeById";
import { getHoursWorked } from "../../api/getHoursWorked";
import { updateEmployeeById } from "../../api/updateEmployeeById";
import { addHours } from "../../api/addHours";
import CurrentDate from "../../components/CurrentDate";
import { calculateTotalHours } from "../../components/CalculatedTotalHours";
import CreateEmployeePDFButton from "../../components/CreateEmployeePDFButton"; // Asegúrate de importar correctamente
import toast, { Toaster } from 'react-hot-toast';


const validationSchemaEmployee = yup.object({
  mandatoryEquipment: yup
    .string()
    .oneOf(["Si", "No", "Incompleto"], "Opción no válida")
    .required("El equipo entregado es obligatorio"),
  comments: yup.string().required("Los comentarios son obligatorios"),
});

const validationSchemaHours = yup.object({
  regularHour: yup.number().required("Horas regulares son obligatorias"),
  regularMinutes: yup.number().required("Minutos regulares son obligatorios"),
  extraHour: yup.number().required("Horas extras son obligatorias"),
  extraMinutes: yup.number().required("Minutos extras son obligatorios"),
});

export default function Employee() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hoursWorked, setHoursWorked] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const fetchedEmployee = await getEmployeeById(employeeId);
        if (fetchedEmployee && fetchedEmployee.length > 0) {
          setEmployee(fetchedEmployee[0]);
        } else {
          console.error("No se encontró el empleado");
        }
      } catch (error) {
        console.error("Fallo al obtener el trabajador, página employee fetch/useEffect", error);
      }
    };
    if (employeeId) {
      fetchEmployee();
    }

    const today = new Date().toISOString().split('T')[0];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    setEndDate(today);
    setStartDate(oneWeekAgo.toISOString().split('T')[0]);

    const fetchHours = async () => {
      try {
        const fetchedHours = await getHoursWorked(employeeId, oneWeekAgo.toISOString().split('T')[0], today);
        setHoursWorked(fetchedHours);
      } catch (error) {
        console.error("Failed to fetch hours worked", error);
        setHoursWorked([]);
      }
    };
    fetchHours();
  }, [employeeId]);

  const handleFetchHours = async () => {
    try {
      const fetchedHours = await getHoursWorked(employeeId, startDate, endDate);
      setHoursWorked(fetchedHours);
    } catch (error) {
      console.log("Failed to fetch hours worked", error);
      setHoursWorked([]);
    }
  };

  if (!employee) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box backgroundColor="#EDF5F4">
      <Box sx={{ marginLeft: "3em", marginBottom: "2em" }}>
        <Typography variant="h6" textAlign="left">Información del trabajador</Typography>
        <Typography sx={{ textAlign: "left" }} variant="subtitle1"> <strong>Nombre: </strong>{employee.name}</Typography>
        <Typography sx={{ textAlign: "left" }} variant="subtitle1"> <strong>Obra: </strong>{employee.project}</Typography>
        <Typography sx={{ textAlign: "left" }} variant="subtitle1"><strong>Posición: </strong>{employee.position}</Typography>
      </Box>

      <Formik
        initialValues={{
          mandatoryEquipment: employee.mandatoryEquipment || "",
          comments: employee.comments || "",
        }}
        enableReinitialize
        validationSchema={validationSchemaEmployee}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateEmployeeById(employeeId, {
              mandatoryEquipment: values.mandatoryEquipment,
              comments: values.comments,
            });
           
            toast.success('Información del trabajador actualizada exitosamente!')
            
          } catch (error) {
            console.error("Failed to update employee information", error);
            toast.error("error al ingresar la información.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Box sx={{ width: "90%", margin: "0 auto" }}>
              <FormControl fullWidth margin="normal" sx={{ backgroundColor: "#fff" }}>
                <InputLabel>Equipo entregado</InputLabel>
                <Field
                  as={Select}
                  name="mandatoryEquipment"
                  error={touched.mandatoryEquipment && Boolean(errors.mandatoryEquipment)}
                >
                  <MenuItem value="">Seleccione</MenuItem>
                  <MenuItem value="Si">Si</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                  <MenuItem value="Incompleto">Incompleto</MenuItem>
                </Field>
                {touched.mandatoryEquipment && errors.mandatoryEquipment && (
                  <Typography color="error">{errors.mandatoryEquipment}</Typography>
                )}
              </FormControl>
              <Field
                as={TextField}
                name="comments"
                label="Comentarios"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "#fff" }}
                error={touched.comments && Boolean(errors.comments)}
                helperText={touched.comments && errors.comments}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  sx={{ marginTop: "1em", marginBottom: "1em" }}
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  Editar Información
                </Button>
              </Box>
              <Box sx={{ border: "1px solid #84C7AE", marginBottom: "2em" }}></Box>
            </Box>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={{
          regularHour: 0,
          regularMinutes: 0,
          extraHour: 0,
          extraMinutes: 0,
        }}
        validationSchema={validationSchemaHours}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await addHours(employeeId, {
              regularHours: values.regularHour,
              regularMinutes: values.regularMinutes,
              extraHours: values.extraHour,
              extraMinutes: values.extraMinutes,
            });
            toast.error("Horas trabajadas agregadas exitosamente.")
          
          } catch (error) {
            console.error("Failed to update hours worked", error);
            toast.error("Error al actualizar las horas trabajadas.")
           
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Box sx={{ width: "90%", margin: "0 auto", marginTop: "2em", backgroundColor: "#fff", padding: "2em", borderRadius: "10px" }}>
              <Typography variant="h6" textAlign="left">Horas trabajadas</Typography>
              <Typography textAlign="left">
                <strong>Fecha:</strong> <CurrentDate />
              </Typography>
              <Typography textAlign="left" marginBottom="2em">Introducir horas trabajadas</Typography>
              <Box display="flex" flexWrap="wrap" justifyContent="space-between" marginBottom="1em">
                <Field
                  as={TextField}
                  name="regularHour"
                  label="Horas regulares"
                  placeholder="Horas Regulares"
                  margin="normal"
                  error={touched.regularHour && Boolean(errors.regularHour)}
                  helperText={touched.regularHour && errors.regularHour}
                />
                <Field
                  as={TextField}
                  name="regularMinutes"
                  label="Minutos regulares"
                  placeholder="Minutos Regulares"
                  margin="normal"
                  error={touched.regularMinutes && Boolean(errors.regularMinutes)}
                  helperText={touched.regularMinutes && errors.regularMinutes}
                />
                <Field
                  as={TextField}
                  name="extraHour"
                  label="Horas extra"
                  placeholder="Horas Extras"
                  margin="normal"
                  error={touched.extraHour && Boolean(errors.extraHour)}
                  helperText={touched.extraHour && errors.extraHour}
                />
                <Field
                  as={TextField}
                  name="extraMinutes"
                  label="Minutos Extra"
                  placeholder="Minutos Extras"
                  margin="normal"
                  error={touched.extraMinutes && Boolean(errors.extraMinutes)}
                  helperText={touched.extraMinutes && errors.extraMinutes}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  Agregar horas
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      <Box sx={{ border: "1px solid #84C7AE", marginBottom: "2em", marginTop: "2em" }}></Box>
      <Box sx={{ marginTop: "2em", backgroundColor: "#fff", width: "90%", margin: "2em auto", padding: "2em", borderRadius: "10px" }}>
        <Typography variant="h6" textAlign="left" marginBottom="2em">Consultar Horas Trabajadas</Typography>
        <TextField
          label="Desde"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ marginRight: 2, marginBottom: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Hasta"
          type="date"
          value={endDate}
          sx={{ marginRight: 2, marginBottom: 2 }}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchHours}
            sx={{ marginLeft: 2 }}
          >
            Consultar
          </Button>
        </Box>
        {hoursWorked.length > 0 && <HoursTable hoursWorked={hoursWorked} />}
      </Box>

      {employee && <CreateEmployeePDFButton employee={employee} hoursWorked={hoursWorked} />}
    </Box>
  );
}

// Componente para mostrar la tabla de horas trabajadas
const HoursTable = ({ hoursWorked }) => {
  const totals = calculateTotalHours(hoursWorked);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Horas Trabajadas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell align="right">Horas Regulares</TableCell>
              <TableCell align="right">Horas Extras</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hoursWorked.map((entry, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {new Date(entry.date).toLocaleDateString("es-ES", {
                    weekday: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell align="right">
                  {entry.regularHours.toFixed(1)}h {entry.regularMinutes}m
                </TableCell>
                <TableCell align="right">
                  {(entry.extraHours || 0).toFixed(1)}h {entry.extraMinutes || 0}m
                </TableCell>
                <TableCell align="right">
                  {(entry.regularHours + (entry.extraHours || 0)).toFixed(1)}h{" "}
                  {((entry.regularMinutes || 0) + (entry.extraMinutes || 0)) % 60}m
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell component="th" scope="row">
                <strong>Total</strong>
              </TableCell>
              <TableCell align="right">
                <strong>
                  {totals.totalRegularHours.toFixed(1)}h {totals.totalRegularMinutes}m
                </strong>
              </TableCell>
              <TableCell align="right">
                <strong>
                  {totals.totalExtraHours.toFixed(1)}h {totals.totalExtraMinutes}m
                </strong>
              </TableCell>
              <TableCell align="right">
                <strong>
                  {totals.totalFinalHours.toFixed(1)}h {totals.totalFinalMinutes}m
                </strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "1em" }}>
        {/* Aquí se mantiene el botón para crear el PDF */}
      </Box>
    </Box>
  );
};

HoursTable.propTypes = {
  hoursWorked: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      regularHours: PropTypes.number.isRequired,
      regularMinutes: PropTypes.number.isRequired,
      extraHours: PropTypes.number,
      extraMinutes: PropTypes.number,
    })
  ).isRequired,
};


















// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import PropTypes from "prop-types";
// import  CreateEmployeePDFButton  from "../../components/CreateEmployeePDFButton";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { Formik, Form, Field } from "formik";
// import * as yup from "yup";
// import { getEmployeeById } from "../../api/getEmployeeById";
// import { getHoursWorked } from "../../api/getHoursWorked";
// import { updateEmployeeById } from "../../api/updateEmployeeById";
// import { addHours } from "../../api/addHours"
// import CurrentDate from "../../components/CurrentDate";
// import { calculateTotalHours } from "../../components/CalculatedTotalHours";


// const validationSchemaEmployee = yup.object({
//   name:yup.string(),
//   mandatoryEquipment: yup
//     .string()
//     .oneOf(["Si", "No", "Incompleto"], "Opción no válida")
//     .required("El equipo entregado es obligatorio"),
//   comments: yup.string(),
// });

// const validationSchemaHours = yup.object({
//   regularHour: yup.number(),
//   regularMinutes: yup.number(),
//   extraHour: yup.number(),
//   extraMinutes: yup.number(),
// });

// export default function Employee() {
//   const { employeeId } = useParams();
//   const [employee, setEmployee] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [hoursWorked, setHoursWorked] = useState([]);

//   useEffect(() => {
//     const fetchEmployee = async () => {
//       try {
//         const fetchedEmployee = await getEmployeeById(employeeId);
//         if (fetchedEmployee && fetchedEmployee.length > 0) {
//           setEmployee(fetchedEmployee[0]);
//         } else {
//           console.error("No se encontró el empleado");
//         }
//       } catch (error) {
//         console.error("Fallo al obtener el trabajador, página employee fetch/useEffect", error);
//       }
//     };
//     if (employeeId) {
//       fetchEmployee();
//     }

//     const today = new Date().toISOString().split('T')[0];
//     const oneWeekAgo = new Date();
//     oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//     setEndDate(today);
//     setStartDate(oneWeekAgo.toISOString().split('T')[0]);

//     const fetchHours = async () => {
//       try {
//         const fetchedHours = await getHoursWorked(employeeId, oneWeekAgo.toISOString().split('T')[0], today);
//         setHoursWorked(fetchedHours);
//       } catch (error) {
//         console.error("Failed to fetch hours worked", error);
//         setHoursWorked([]);
//       }
//     };
//     fetchHours();
//   }, [employeeId]);

//   const handleFetchHours = async () => {
//     try {
//       const fetchedHours = await getHoursWorked(employeeId, startDate, endDate);
//       setHoursWorked(fetchedHours);
//     } catch (error) {
//       console.log("Failed to fetch hours worked", error);
//       setHoursWorked([]);
//     }
//   };

//   if (!employee) {
//     return <Typography>Cargando...</Typography>;
//   }

//   return (
//     <Box backgroundColor="#EDF5F4">
//       <Box sx={{marginLeft:"3em", marginBottom:"2em"}}> 
//         <Typography variant="h6" textAlign="left">Información del trabajador</Typography>
//         <Typography sx={{textAlign:"left"}} variant="subtitle1"> <strong>Nombre: </strong>{employee.name}</Typography>
//         <Typography sx={{textAlign:"left"}}  variant="subtitle1"> <strong>Obra: </strong>{employee.project}</Typography>
//         <Typography sx={{textAlign:"left"}}  variant="subtitle1"><strong>Posición: </strong>{employee.position}</Typography>
//       </Box>
      
//       <Formik
//         initialValues={{
//           name:employee.name || "",
//           mandatoryEquipment: employee.mandatoryEquipment || "",
//           comments: employee.comments || "",
//         }}
//         enableReinitialize
//         validationSchema={validationSchemaEmployee}
//         onSubmit={async (values, { setSubmitting }) => {
//           try {
//             await updateEmployeeById(employeeId, {
//               mandatoryEquipment: values.mandatoryEquipment,
//               comments: values.comments,
//             });
//             alert("Información del trabajador actualizada exitosamente.");
//           } catch (error) {
//             console.error("Failed to update employee information", error);
//             alert("Error al actualizar la información del trabajador.");
//           } finally {
//             setSubmitting(false);
//           }
//         }}
//       >
//         {({ isSubmitting, errors, touched }) => (
//           <Form>
//             <Box sx={{ width: "90%", margin: "0 auto" }}>
//               <FormControl fullWidth margin="normal" sx={{ backgroundColor: "#fff" }}>
//                 <InputLabel>Equipo entregado</InputLabel>
//                 <Field
//                   as={Select}
//                   name="mandatoryEquipment"
//                   error={touched.mandatoryEquipment && Boolean(errors.mandatoryEquipment)}
//                 >
//                   <MenuItem value="">Seleccione</MenuItem>
//                   <MenuItem value="Si">Si</MenuItem>
//                   <MenuItem value="No">No</MenuItem>
//                   <MenuItem value="Incompleto">Incompleto</MenuItem>
//                 </Field>
//                 {touched.mandatoryEquipment && errors.mandatoryEquipment && (
//                   <Typography color="error">{errors.mandatoryEquipment}</Typography>
//                 )}
//               </FormControl>
//               <Field
//                 as={TextField}
//                 name="comments"
//                 label="Comentarios"
//                 fullWidth
//                 margin="normal"
//                 sx={{ backgroundColor: "#fff" }}
//                 error={touched.comments && Boolean(errors.comments)}
//                 helperText={touched.comments && errors.comments}
//               />
//               <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//                 <Button
//                   sx={{ marginTop: "1em", marginBottom: "1em" }}
//                   type="submit"
//                   disabled={isSubmitting}
//                   variant="contained"
//                   color="primary"
//                 >
//                   Editar Información
//                 </Button>
//               </Box>
//               <Box sx={{ border: "1px solid #84C7AE", marginBottom: "2em" }}></Box>
//             </Box>
//           </Form>
//         )}
//       </Formik>
      
//       <Formik
//         initialValues={{
//           regularHour: 0,
//           regularMinutes: 0,
//           extraHour: 0,
//           extraMinutes: 0,
//         }}
//         validationSchema={validationSchemaHours}
//         onSubmit={async (values, { setSubmitting }) => {
//           try {
//             await addHours(employeeId, {
//               regularHours: values.regularHour,
//               regularMinutes: values.regularMinutes,
//               extraHours: values.extraHour,
//               extraMinutes: values.extraMinutes,
              
//             });
//             alert("Horas trabajadas agregadas exitosamente.");
//           } catch (error) {
//             console.error("Failed to update hours worked", error);
//             alert("Error al actualizar las horas trabajadas.");
//           } finally {
//             setSubmitting(false);
//           }
//         }}
//       >
//         {({ isSubmitting, errors, touched }) => (
//           <Form>
//             <Box sx={{ width: "90%", margin: "0 auto", marginTop: "2em", backgroundColor: "#fff", padding: "2em", borderRadius: "10px" }}>
//               <Typography variant="h6" textAlign="left">Horas trabajadas</Typography>
//               <Typography textAlign="left">
//                 <strong>Fecha:</strong> <CurrentDate />
//               </Typography>
//               <Typography textAlign="left" marginBottom="2em">Introducir horas trabajadas</Typography>
//               <Box display="flex" flexWrap="wrap" justifyContent="space-between" marginBottom="1em">
//                 <Field
//                   as={TextField}
//                   name="regularHour"
//                   label="Horas regulares"
//                   placeholder="Horas Regulares"
//                   margin="normal"
//                   error={touched.regularHour && Boolean(errors.regularHour)}
//                   helperText={touched.regularHour && errors.regularHour}
//                 />
//                 <Field
//                   as={TextField}
//                   name="regularMinutes"
//                   label="Minutos regulares"
//                   placeholder="Minutos Regulares"
//                   margin="normal"
//                   error={touched.regularMinutes && Boolean(errors.regularMinutes)}
//                   helperText={touched.regularMinutes && errors.regularMinutes}
//                 />
//                 <Field
//                   as={TextField}
//                   name="extraHour"
//                   label="Horas extra"
//                   placeholder="Horas Extras"
//                   margin="normal"
//                   error={touched.extraHour && Boolean(errors.extraHour)}
//                   helperText={touched.extraHour && errors.extraHour}
//                 />
//                 <Field
//                   as={TextField}
//                   name="extraMinutes"
//                   label="Minutos Extra"
//                   placeholder="Minutos Extras"
//                   margin="normal"
//                   error={touched.extraMinutes && Boolean(errors.extraMinutes)}
//                   helperText={touched.extraMinutes && errors.extraMinutes}
//                 />
//               </Box>
//               <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//                 <Button
//                   type="submit"
//                   disabled={isSubmitting}
//                   variant="contained"
//                   color="primary"
//                 >
//                   Agregar horas
//                 </Button>
//               </Box>
//             </Box>
//           </Form>
//         )}
//       </Formik>
//       <Box sx={{ border: "1px solid #84C7AE", marginBottom: "2em", marginTop: "2em" }}></Box>
//       <Box sx={{ marginTop: "2em", backgroundColor: "#fff", width: "90%", margin: "2em auto", padding: "2em", borderRadius: "10px" }}>
//         <Typography variant="h6" textAlign="left" marginBottom="2em">Consultar Horas Trabajadas</Typography>
//         <TextField
//           label="Desde"
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           sx={{ marginRight: 2, marginBottom: 2 }}
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <TextField
//           label="Hasta"
//           type="date"
//           value={endDate}
//           sx={{ marginRight: 2, marginBottom: 2 }}
//           onChange={(e) => setEndDate(e.target.value)}
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleFetchHours}
//             sx={{ marginLeft: 2 }}
//           >
//             Consultar
//           </Button>
//         </Box>
//         {hoursWorked.length > 0 && <HoursTable hoursWorked={hoursWorked} />}
//       </Box>
//     </Box>
//   );
// }

// // Componente para mostrar la tabla de horas trabajadas
// const HoursTable = ({ hoursWorked }) => {
//   const totals = calculateTotalHours(hoursWorked);

//   return (
//     <Box>
//       <Typography textAlign={"left"} variant="h6" gutterBottom>
//         Horas Trabajadas
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Fecha</TableCell>
//               <TableCell align="right">Horas Regulares</TableCell>
//               <TableCell align="right">Horas Extras</TableCell>
//               <TableCell align="right">Total</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {hoursWorked.map((entry, index) => (
//               <TableRow key={index}>
//                 <TableCell component="th" scope="row">
//                   {new Date(entry.date).toLocaleDateString("es-ES", {
//                     weekday: "short",
//                     day: "numeric",
//                   })}
//                 </TableCell>
//                 <TableCell align="right">
//                   {entry.regularHours.toFixed(1)}h {entry.regularMinutes}m
//                 </TableCell>
//                 <TableCell align="right">
//                   {(entry.extraHours || 0).toFixed(1)}h {entry.extraMinutes || 0}m
//                 </TableCell>
//                 <TableCell align="right">
//                   {(entry.regularHours + (entry.extraHours || 0)).toFixed(1)}h{" "}
//                   {((entry.regularMinutes || 0) + (entry.extraMinutes || 0)) % 60}m
//                 </TableCell>
//               </TableRow>
//             ))}
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 <strong>Total</strong>
//               </TableCell>
//               <TableCell align="right">
//                 <strong>
//                   {totals.totalRegularHours.toFixed(1)}h {totals.totalRegularMinutes}m
//                 </strong>
//               </TableCell>
//               <TableCell align="right">
//                 <strong>
//                   {totals.totalExtraHours.toFixed(1)}h {totals.totalExtraMinutes}m
//                 </strong>
//               </TableCell>
//               <TableCell align="right">
//                 <strong>
//                   {totals.totalFinalHours.toFixed(1)}h {totals.totalFinalMinutes}m
//                 </strong>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "1em" }}>
//         <CreateEmployeePDFButton />
//       </Box>
//     </Box>
//   );
// };

// HoursTable.propTypes = {
//   hoursWorked: PropTypes.arrayOf(
//     PropTypes.shape({
//       date: PropTypes.string,
//       regularHours: PropTypes.number,
//       regularMinutes: PropTypes.number,
//       extraHours: PropTypes.number,
//       extraMinutes: PropTypes.number,
//     })
//   ).isRequired,
// };




















