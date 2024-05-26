// Arreglar titulos de trabajador,  colocar las horas trabajadas al menos de la ultima semana, 
// espacios y justificar a la izq. 
// cambiar actualizar información por edit información, ver orden de los distintos tipos de horas
// introducir tabla de material,  traer las horas de la ultima semana

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

    // Set endDate to today and startDate to one week ago
    const today = new Date().toISOString().split('T')[0];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    setEndDate(today);
    setStartDate(oneWeekAgo.toISOString().split('T')[0]);

    // Fetch hours worked for the last week
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
      <Typography variant="h4">{employee.name}</Typography>
      <Typography variant="h5">Información del trabajador</Typography>
      
      <Formik
        initialValues={{
          name: employee.name,
          position: employee.position,
          project: employee.project,
          mandatoryEquipment: employee.mandatoryEquipment,
          comments: employee.comments,
        }}
        validationSchema={yup.object({
          name: yup.string().required(),
          position: yup.string().required(),
          project: yup.string().required(),
          mandatoryEquipment: yup.string().required(),
          comments: yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateEmployeeById(employeeId, {
              name: values.name,
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
            <Box sx={{ width: "90%", margin: "0 auto" }}>
              <Field
                as={TextField}
                name="position"
                label="Posición"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "#fff" }}
              />
              <Field
                as={TextField}
                name="project"
                label="Obra"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "#fff" }}
              />
              <Field
                as={TextField}
                name="mandatoryEquipment"
                label="Equipo entregado"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "#fff" }}
              />
              <Field
                as={TextField}
                name="comments"
                label="Comentarios"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "#fff" }}
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
            <Box sx={{ width: "90%", margin: "0 auto", marginTop: "2em", backgroundColor: "#fff", padding: "2em", borderRadius: "10px" }}>
              <Typography variant="h6" textAlign={"left"}>Horas trabajadas</Typography>
              <Typography textAlign={"left"}>
                <strong>Fecha:</strong> <CurrentDate />
              </Typography>
              <Typography textAlign={"left"} marginBottom={"2em"}>Introducir horas trabajadas</Typography>
              <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-between"} marginBottom={"1em"}>
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
        <Typography variant="h6" textAlign={"left"} marginBottom={"2em"}>Consultar Horas Trabajadas</Typography>
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
    </Box>
  );
}

// Componente para mostrar la tabla de horas trabajadas
const HoursTable = ({ hoursWorked }) => {
  const totals = calculateTotalHours(hoursWorked);

  return (
    <Box >
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
        <CreatePDFButton />
      </Box>
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















