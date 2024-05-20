import { useState, useEffect } from "react";
import { getTaskById } from "../../api/getTaskById";
import { useParams } from "react-router-dom";
import { Box, Button, Typography, TextField, Grid, Select, MenuItem } from "@mui/material";
import { Formik, Form, Field } from "formik";
import CreatePDFButton from "../../components/CreatePDFButton";
import { updateTaskById } from "../../api/updateTaskById";
import IconColors from "../../components/IconColors";
import { getEmployees } from "../../api/getEmployees";

export default function TaskInfoAndEdit() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskData = await getTaskById(taskId);
        setTask(taskData);
        const employeesData = await getEmployees();
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error al obtener la tarea o empleados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [taskId]);

  const handleSubmit = async (values, actions) => {
    try {
      await updateTaskById(taskId, values);
      alert("Datos actualizados");
    } catch (error) {
      alert("Error al editar. Por favor, intenta de nuevo.");
      console.error(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTaskById(taskId, { status: newStatus });
      setTask({ ...task, status: newStatus });
      alert(`Estado actualizado a: ${newStatus}`);
    } catch (error) {
      alert("Error al actualizar el estado. Por favor, intenta de nuevo.");
      console.error(error);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!task) return <p>No se encontró la tarea</p>;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: "2em", marginTop: "2em" }}>
        <IconColors status={task.status} />
        <Typography variant="body">Editar tarea</Typography>
        <Typography variant="h6">{task.taskName}</Typography>
      </Box>

      <Box>
        <Formik
          initialValues={{
            employeeName: task.employeeName || "",
            taskDescription: task.taskDescription || "",
            startDate: task.startDate || "",
            endDate: task.endDate || "",
            prevImages: [],
            finalImages: [],
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <Grid container spacing={2} sx={{ marginBottom: "2em" }}>
                <Grid item xs={12}>
                  <Field
                    as={Select}
                    name="employeeName"
                    label="Trabajador Asignado"
                    value={values.employeeName}
                    onChange={handleChange}
                    fullWidth
                  >
                    {employees.map((employee) => (
                      <MenuItem key={employee.employeeId} value={employee.name}>
                        {employee.name}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="taskDescription"
                    label="Descripción de la tarea"
                    value={values.taskDescription}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    name="startDate"
                    label="Fecha de inicio"
                    type="date"
                    value={values.startDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    name="endDate"
                    label="Fecha de entrega"
                    type="date"
                    value={values.endDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ marginTop: "2em", marginBottom: "2em" }}>
                <Typography variant="body2">Estado de la tarea</Typography>
                <Button
                  sx={{ backgroundColor: "#F2CB05", margin: "1em" }}
                  variant={task.status === "iniciado" ? "contained" : "outlined"}
                  onClick={() => handleStatusChange("iniciado")}
                >
                  Iniciado
                </Button>
                <Button
                  sx={{ border: "1px solid #84C7AE", color: "#84C7AE" }}
                  variant={task.status === "terminado" ? "contained" : "outlined"}
                  onClick={() => handleStatusChange("terminado")}
                >
                  Terminado
                </Button>
              </Box>

              <Box sx={{ border: "1px solid #ccc", marginBottom:"2em", paddingTop:"2em", paddingBottom:"2em"}}>
                <Typography>Fotos iniciales</Typography>
                <Grid item xs={12}>
                  <input
                    type="file"
                    name="prevImages"
                    onChange={(e) => setFieldValue("prevImages", e.currentTarget.files)}
                    multiple
                  />
                </Grid>
              </Box>

              <Box sx={{ border: "1px solid #ccc", marginBottom:"2em", paddingTop:"2em", paddingBottom:"2em"}}>
                <Typography>Fotos finales</Typography>
                <Grid item xs={12}>
                  <input
                    type="file"
                    name="finalImages"
                    onChange={(e) => setFieldValue("finalImages", e.currentTarget.files)}
                    multiple
                  />
                </Grid>
              </Box>

              <Button sx={{ backgroundColor: "#84C7AE", color: "#fff", marginBottom: "2em", marginTop: "2em", marginRight: "1em" }} type="submit">
                Guardar Cambios
              </Button>
              <Button sx={{ backgroundColor: "#84C7AE", color: "#fff", marginBottom: "2em", marginTop: "2em", marginLeft: "1em" }} onClick={() => CreatePDFButton()}>
                Crear PDF
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
