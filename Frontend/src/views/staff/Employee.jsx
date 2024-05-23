import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import CreatePDFButton from "../../components/CreatePDFButton";
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { getEmployeeById } from "../../api/getEmployeeById";
import { getHoursWorked } from "../../api/getHoursWorked";
import { updateEmployeeById } from "../../api/updateEmployeeById";
import { updateHours } from "../../api/updateHours";
import CurrentDate from "../../components/CurrentDate";
import { calculateTotalHours } from "../../components/CalculatedTotalHours";

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
        setEmployee(fetchedEmployee);
      } catch (error) {
        console.error("Fallo al obtener el trabajador, página employee fetch/useEffect", error);
      }
    };
    if (employeeId) {
      fetchEmployee();
    }
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
    <Box>
      <Typography variant="h4">{employee.name}</Typography>
      <Typography variant="h5">Información del trabajador</Typography>
      
      <Formik
        initialValues={{
          name:employee.name,
          position: employee.position,
          project: employee.project,
          mandatoryEquipment: employee.mandatoryEquipment,
          comments: employee.comments,
        }}
        validationSchema={yup.object({
          name:yup.string().required(),
          position: yup.string().required(),
          project: yup.string().required(),
          mandatoryEquipment: yup.string().required(),
          comments: yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateEmployeeById(employeeId, {
              name:values.name,
              position: values.position,
              project: values.project,
              mandatoryEquipment: values.mandatoryEquipment,
              comments: values.comments,
            });
            alert("Información del trabajador actualizada exitosamente.");
          } catch (error) {
            console.error("Failed to update employee information", error);
            alert("Error al actualizar la información del trabajador.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <Field
                as={TextField}
                name="position"
                label="Posición"
                fullWidth
                margin="normal"
              />
              <Field
                as={TextField}
                name="project"
                label="Obra"
                fullWidth
                margin="normal"
              />
              <Field
                as={TextField}
                name="mandatoryEquipment"
                label="Equipo entregado"
                fullWidth
                margin="normal"
              />
              <Field
                as={TextField}
                name="comments"
                label="Comentarios"
                fullWidth
                margin="normal"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                color="primary"
              >
                Actualizar Información
              </Button>
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
        validationSchema={yup.object({
          regularHour: yup.number().required(),
          regularMinutes: yup.number().required(),
          extraHour: yup.number().required(),
          extraMinutes: yup.number().required(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateHours(employeeId, {
              regularHours: values.regularHour,
              regularMinutes: values.regularMinutes,
              extraHours: values.extraHour,
              extraMinutes: values.extraMinutes,
            });
            alert("Horas trabajadas actualizadas exitosamente.");
          } catch (error) {
            console.error("Failed to update hours worked", error);
            alert("Error al actualizar las horas trabajadas.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Typography variant="h4">Horas trabajadas</Typography>
            <Typography>
              <strong>Fecha:</strong> <CurrentDate />
            </Typography>
            <Typography>Introducir horas trabajadas</Typography>
            <Box>
              <Field
                as={TextField}
                name="regularHour"
                label="Horas regulares"
                placeholder="Horas Regulares"
                margin="normal"
              />
              <Field
                as={TextField}
                name="regularMinutes"
                label="Minutos regulares"
                placeholder="Minutos Regulares"
                margin="normal"
              />
              <Field
                as={TextField}
                name="extraHour"
                label="Horas extra"
                placeholder="Horas Extras"
                margin="normal"
              />
              <Field
                as={TextField}
                name="extraMinutes"
                label="Minutos Extra"
                placeholder="Minutos Extras"
                margin="normal"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                color="primary"
              >
                Agregar horas
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      
      <Box>
        <Typography variant="h6">Consultar Horas Trabajadas</Typography>
        <TextField
          label="Fecha de Inicio"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ marginRight: 2, marginBottom: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Fecha de Fin"
          type="date"
          value={endDate}
          sx={{ marginRight: 2, marginBottom: 2 }}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchHours}
          sx={{ marginLeft: 2 }}
        >
          Consultar
        </Button>
        {hoursWorked.length > 0 && <HoursTable hoursWorked={hoursWorked} />}
      </Box>
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
      <Button>
        <CreatePDFButton />
      </Button>
    </Box>
  );
};

HoursTable.propTypes = {
  hoursWorked: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      regularHours: PropTypes.number,
      regularMinutes: PropTypes.number,
      extraHours: PropTypes.number,
      extraMinutes: PropTypes.number,
    })
  ).isRequired,
};
















// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import PropTypes from "prop-types";
// import CreatePDFButton from "../../components/CreatePDFButton";
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
// } from "@mui/material";
// import { Formik, Form, Field } from "formik";
// import * as yup from "yup";
// import { getEmployeeById } from "../../api/getEmployeeById";
// import { getHoursWorked } from "../../api/getHoursWorked";
// import { updateHours } from "../../api/updateHours"
// import { updateEmployeeById } from "../../api/updateEmployeeById"; 
// import CurrentDate from "../../components/CurrentDate";
// import { calculateTotalHours } from "../../components/CalculatedTotalHours";

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
//         console.log(fetchedEmployee); 
//         setEmployee(fetchedEmployee);
//       } catch (error) {
//         console.error("Fallo al obtener el trabajador, página employee fetch/useEffect", error);
//       }
//     };
//     if (employeeId) {
//       fetchEmployee();
//     }
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
//     <Box>
//       <Typography variant="h4">{employee.name}</Typography>
//       <Typography variant="h5">Información del trabajador</Typography>
//       <Formik
//         initialValues={{
//           position: employee.position,
//           project: employee.project,
//           mandatoryEquipment: employee.mandatoryEquipment,
//           comments: employee.comments,
//           regularHour: 0,
//           regularMinutes: 0,
//           extraHour: 0,
//           extraMinutes: 0,
//         }}
//         validationSchema={yup.object({
//           position: yup.string().required(),
//           project: yup.string().required(),
//           mandatoryEquipment: yup.string().required(),
//           comments: yup.string().required(),
//           regularHour: yup.number().required(),
//           regularMinutes: yup.number().required(),
//           extraHour: yup.number().required(),
//           extraMinutes: yup.number().required(),
//         })}
//         onSubmit={async (values, { setSubmitting }) => {
//           try {
//             await updateEmployeeById(employeeId, {
//               position: values.position,
//               project: values.project,
//               mandatoryEquipment: values.mandatoryEquipment,
//               comments: values.comments,
//               await updateHours(employeeId,{


//               })
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
//         {({ isSubmitting }) => (
//           <Form>
//             <Box>
//               <Box>
//                 <Field
//                   as={TextField}
//                   name="position"
//                   label="Posición"
//                   fullWidth
//                   margin="normal"
//                 />
//               </Box>
//               <Box>
//                 <Field
//                   as={TextField}
//                   name="project"
//                   label="Obra"
//                   fullWidth
//                   margin="normal"
//                 />
//               </Box>
//               <Box>
//                 <Field
//                   as={TextField}
//                   name="mandatoryEquipment"
//                   label="Equipo entregado"
//                   fullWidth
//                   margin="normal"
//                 />
//               </Box>
//               <Box>
//                 <Field
//                   as={TextField}
//                   name="comments"
//                   label="Comentarios"
//                   fullWidth
//                   margin="normal"
//                 />
//               </Box>
//             </Box>
//             <Typography variant="h4">Horas trabajadas</Typography>
//             <Typography>
//               <strong>Fecha:</strong> <CurrentDate />
//             </Typography>
//             <Typography>Introducir horas trabajadas</Typography>
//             <Box>
//               <Field
//                 as={TextField}
//                 name="regularHour"
//                 placeholder="Horas Regulares"
//                 margin="normal"
//               />
//               <Field
//                 as={TextField}
//                 name="regularMinutes"
//                 placeholder="Minutos Regulares"
//                 margin="normal"
//               />
//               <Field
//                 as={TextField}
//                 name="extraHour"
//                 placeholder="Horas Extras"
//                 margin="normal"
//               />
//               <Field
//                 as={TextField}
//                 name="extraMinutes"
//                 placeholder="Minutos Extras"
//                 margin="normal"
//               />
//               <Button
//                 type="submit"
//                 disabled={isSubmitting}
//                 variant="contained"
//                 color="primary"
//               >
//                 Agregar horas
//               </Button>
//             </Box>
//           </Form>
//         )}
//       </Formik>

//       <Box>
//         <Typography variant="h6">Consultar Horas Trabajadas</Typography>
//         <TextField
//           label="Fecha de Inicio"
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           sx={{ marginRight: 2, marginBottom: 2 }}
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <TextField
//           label="Fecha de Fin"
//           type="date"
//           value={endDate}
//           sx={{ marginRight: 2, marginBottom: 2 }}
//           onChange={(e) => setEndDate(e.target.value)}
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleFetchHours}
//           sx={{ marginLeft: 2 }}
//         >
//           Consultar
//         </Button>
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
//       <Typography variant="h6" gutterBottom>
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
//       <Button>
//         <CreatePDFButton />
//       </Button>
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

