import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  useMediaQuery,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Formik, Form, Field } from "formik";

import { getEmployeeById } from "../../api/getEmployeeById";
import { getHoursWorked } from "../../api/getHoursWorked";
import { updateEmployeeById } from "../../api/updateEmployeeById";
import { addHours } from "../../api/addHours";
import CurrentDate from "../../components/CurrentDate";
import { calculateTotalHours } from "../../components/CalculatedTotalHours";
import CreateEmployeePDFButton from "../../components/CreateEmployeePDFButton";
import toast, { Toaster } from "react-hot-toast";
import { ValidationSchemaHours } from "../../forms/Trabajadores/trabajador/ValidationSchemaHours"
import { ValidationSchemaEmployee} from "../../forms/Trabajadores/trabajador/ValidationSchemaEmployee"




export default function Employee() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hoursWorked, setHoursWorked] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
 
 
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
        console.error(
          "Fallo al obtener el trabajador, página employee fetch/useEffect",
          error
        );
      }
    };
    if (employeeId) {
      fetchEmployee();
    }

    const today = new Date().toISOString().split("T")[0];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    setEndDate(today);
    setStartDate(oneWeekAgo.toISOString().split("T")[0]);

    const fetchHours = async () => {
      try {
        const fetchedHours = await getHoursWorked(
          employeeId,
          oneWeekAgo.toISOString().split("T")[0],
          today
        );
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
     
      const sanitizedHours = fetchedHours.map(hour => ({
        ...hour,
        regularMinutes: hour.regularMinutes || 0,
        extraMinutes: hour.extraMinutes || 0,
      }));
      setHoursWorked(sanitizedHours);
    } catch (error) {
      console.log('Failed to fetch hours worked', error);
      setHoursWorked([]);
    }
  };

  if (!employee) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box sx={{ width: "90%" }}>
      <Toaster />
      <Box
        sx={{
          width: "90%",
          margin: "2em auto",
          backgroundColor: "#fff",
          padding: "2em",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" textAlign="left">
          Información del trabajador
        </Typography>
        <Typography sx={{ textAlign: "left" }} variant="subtitle1">
          <strong>Nombre: </strong>
          {employee.name}
        </Typography>
        <Typography sx={{ textAlign: "left" }} variant="subtitle1">
          <strong>Obra: </strong>
          {employee.project}
        </Typography>
        <Typography sx={{ textAlign: "left" }} variant="subtitle1">
          <strong>Posición: </strong>
          {employee.position}
        </Typography>
      </Box>

      <Formik
        initialValues={{
          mandatoryEquipment: employee.mandatoryEquipment || "",
          comments: employee.comments || "",
        }}
        enableReinitialize
        validationSchema={ValidationSchemaEmployee}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateEmployeeById(employeeId, {
              mandatoryEquipment: values.mandatoryEquipment,
              comments: values.comments,
            });
            toast.success(
              "Información del trabajador actualizada exitosamente!"
            );
          } catch (error) {
            console.error("Failed to update employee information", error);
            toast.error("Error al ingresar la información.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Box
              sx={{
                width: "90%",
                margin: "0 auto",
                backgroundColor: "#fff",
                padding: "2em",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FormControl
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "#fff" }}
              >
                <InputLabel>Equipo entregado</InputLabel>
                <Field
                  as={Select}
                  name="mandatoryEquipment"
                  error={
                    touched.mandatoryEquipment &&
                    Boolean(errors.mandatoryEquipment)
                  }
                >
                  <MenuItem value="">Seleccione</MenuItem>
                  <MenuItem value="Si">Si</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                  <MenuItem value="Incompleto">Incompleto</MenuItem>
                </Field>
                {touched.mandatoryEquipment && errors.mandatoryEquipment && (
                  <Typography color="error">
                    {errors.mandatoryEquipment}
                  </Typography>
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
                  sx={{
                    marginTop: "1em",
                    marginBottom: "1em",

                    color: "#1976D2",
                    borderRadius: "10px",
                    ":hover": {
                      backgroundColor: "#1565c0",
                      color: "#fff",
                      transform: "scale(1.02)",
                    },
                  }}
                  type="submit"
                  disabled={isSubmitting}
                  variant="outlined"
                >
                  Editar Información
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={{
          regularHours: 0,
          regularMinutes: 0,
          extraHours: 0,
          extraMinutes: 0,
        }}
        validationSchema={ValidationSchemaHours}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log('Submitting values:', values); 
            await addHours(employeeId, {
              date: new Date().toISOString().split('T')[0],
              regularHours: values.regularHours,
              regularMinutes: values.regularMinutes,
              extraHours: values.extraHours,
              extraMinutes: values.extraMinutes,
            });
            toast.success("Horas trabajadas agregadas exitosamente.");
          } catch (error) {
            console.error("Failed to update hours worked", error);
            toast.error("Error al actualizar las horas trabajadas.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Box
              sx={{
                width: "90%",
                margin: "2em auto",
                backgroundColor: "#fff",
                padding: "2em",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" textAlign="left">
                Horas trabajadas
              </Typography>
              <Typography textAlign="left">
                <strong>Fecha:</strong> <CurrentDate />
              </Typography>
              <Typography textAlign="left" marginBottom="2em">
                Introducir horas trabajadas
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                marginBottom="1em"
              >
                <Field
                  as={TextField}
                  name="regularHours"
                  label="Horas regulares"
                  placeholder="0"
                  margin="normal"
                  error={touched.regularHours && Boolean(errors.regularHours)}
                  helperText={touched.regularHours && errors.regularHours}
                  sx={{ flex: "0 0 48%", backgroundColor: "#fff" }}
                />
                <Field
                  as={TextField}
                  name="regularMinutes"
                  label="Minutos regulares"
                  placeholder="0"
                  margin="normal"
                  error={
                    touched.regularMinutes && Boolean(errors.regularMinutes)
                  }
                  helperText={touched.regularMinutes && errors.regularMinutes}
                  sx={{ flex: "0 0 48%", backgroundColor: "#fff" }}
                />
                <Field
                  as={TextField}
                  name="extraHours"
                  label="Horas extra"
                  placeholder="0"
                  margin="normal"
                  error={touched.extraHours && Boolean(errors.extraHours)}
                  helperText={touched.extraHours && errors.extraHours}
                  sx={{ flex: "0 0 48%", backgroundColor: "#fff" }}
                />
                <Field
                  as={TextField}
                  name="extraMinutes"
                  label="Minutos Extra"
                  placeholder="0"
                  margin="normal"
                  error={touched.extraMinutes && Boolean(errors.extraMinutes)}
                  helperText={touched.extraMinutes && errors.extraMinutes}
                  sx={{ flex: "0 0 48%", backgroundColor: "#fff" }}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  sx={{
                    color: "#1976D2",
                    borderRadius: "10px",
                    ":hover": {
                      backgroundColor: "#1565c0",
                      transform: "scale(1.02)",
                      color: "#fff",
                    },
                  }}
                  type="submit"
                  disabled={isSubmitting}
                  variant="outlined"
                >
                  Agregar horas
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>

      <Box
        sx={{
          marginTop: "2em",
          backgroundColor: "#fff",
          width: "90%",
          margin: "2em auto",
          padding: "2em",
          borderRadius: "10px",
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" textAlign="left" marginBottom="2em">
          Consultar Horas Trabajadas
        </Typography>
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
            variant="outlined"
            color="primary"
            onClick={handleFetchHours}
            sx={{
              color: "#1976d2",
              borderRadius: "10px",
              ":hover": {
                backgroundColor: "#1565c0",
                transform: "scale(1.02)",
                color: "#fff",
              },
            }}
          >
            Consultar
          </Button>
        </Box>
        {hoursWorked.length > 0 && <HoursTable hoursWorked={hoursWorked} />}
      </Box>

      {employee && (
        <CreateEmployeePDFButton
          employee={employee}
          hoursWorked={hoursWorked}
        />
      )}
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
                  {new Date(entry.date).toLocaleDateString('es-ES', {
                    weekday: 'short',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell align="right">
                  {entry.regularHours.toFixed(1)}h {entry.regularMinutes || 0}m
                </TableCell>
                <TableCell align="right">
                  {(entry.extraHours || 0).toFixed(1)}h {entry.extraMinutes || 0}m
                </TableCell>
                <TableCell align="right">
                  {(entry.regularHours + (entry.extraHours || 0)).toFixed(1)}h{' '}
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
                  {totals.totalRegularHours.toFixed(1)}h{' '}
                  {totals.totalRegularMinutes}m
                </strong>
              </TableCell>
              <TableCell align="right">
                <strong>
                  {totals.totalExtraHours.toFixed(1)}h{' '}
                  {totals.totalExtraMinutes}m
                </strong>
              </TableCell>
              <TableCell align="right">
                <strong>
                  {totals.totalFinalHours.toFixed(1)}h{' '}
                  {totals.totalFinalMinutes}m
                </strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "1em" }}
      ></Box>
    </Box>
  );
};

HoursTable.propTypes = {
  hoursWorked: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      regularHours: PropTypes.number,
      regularMinutes: PropTypes.number,
      extraHours: PropTypes.number,
      extraMinutes: PropTypes.number,
    })
  ).isRequired,
};








    
           