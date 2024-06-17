import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useMediaQuery
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { CreateTaskFormSchema } from "../../forms/SectionTasks/CreateTaskFormSchema";
import { getTaskById } from "../../api/getTaskById";
import { updateTaskById } from "../../api/updateTaskById";
import IconColors from "../../components/IconColors";
import { getEmployees } from "../../api/getEmployees";
import EditableImage from "../../components/editableImage";
import toast from 'react-hot-toast';
import { initialValues } from "../../forms/SectionTasks/InitialValues";
import {capitalizeFirstLetter } from "../../components/CapitalizedFirstLetter"


export default function TaskInfoAndEdit() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [prevImages, setPrevImages] = useState([]);
  const [finalImages, setFinalImages] = useState([]);
  const [editInitialValues, setEditInitialValues] = useState(initialValues());
  const isMobile = useMediaQuery("(max-width:600px)");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskData = await getTaskById(taskId);
        setTask(taskData);
        setPrevImages(taskData.prevImages || []);
        setFinalImages(taskData.finalImages || []);
        const employeesData = await getEmployees();
        setEmployees(employeesData);
        setEditInitialValues(initialValues(taskData));
      } catch (error) {
        console.error("Error al obtener la tarea o empleados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [taskId]);

  const handleSubmit = async (values, actions) => {
    values.prevImages = prevImages;
    values.finalImages = finalImages;

    try {
      await updateTaskById(taskId, values);
      toast.success("Datos actualizados!");
    } catch (error) {
      toast.error("Error al editar. Por favor, intenta de nuevo.");
      console.error("Error en el envío del formulario:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleImageSave = (type, uri) => {
    if (type === "prevImages") {
      setPrevImages((prev) => [...prev, uri]);
    } else if (type === "finalImages") {
      setFinalImages((prev) => [...prev, uri]);
    }
  };

  const handleFileChange = (event, setFieldValue, field) => {
    const files = Array.from(event.currentTarget.files);
    const fileReaders = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        fileReaders.push(reader.result);
        if (fileReaders.length === files.length) {
          if (field === "prevImages") {
            setPrevImages((prev) => [...prev, ...fileReaders]);
          } else if (field === "finalImages") {
            setFinalImages((prev) => [...prev, ...fileReaders]);
          }
          setFieldValue(field, [...fileReaders]);
        }
      };
    });
  };

  if (loading) return <p>Cargando...</p>;
  if (!task) return <p>No se encontró la tarea</p>;

  return (
    <Box display={"flex"} sx={{ paddingTop: "2em", borderRadius: "10px" }}>
      <Box sx={{ width: "100%", padding: isMobile? "2em auto": "2em" }}>
        <Typography>Editar Tarea</Typography>
        <Typography>{capitalizeFirstLetter(task.sectionKey)}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginBottom: "2em",
            marginTop: "2em",
          }}
        >
          <IconColors status={task.status} />
          <Typography variant="h6">{task.taskName}</Typography>
        </Box>

        <Box>
          <Formik
            initialValues={editInitialValues}
            validationSchema={CreateTaskFormSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ values, handleChange, setFieldValue, isSubmitting }) => (
              <Form>
                <Grid container spacing={2} sx={{ marginBottom: "2em" }}>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" sx={{ backgroundColor: "#fff" }}>
                      <InputLabel>Estado de la tarea</InputLabel>
                      <Field
                        as={Select}
                        name="status"
                        value={values.status || ""}
                        onChange={handleChange}
                        label="Estado de la tarea"
                        fullWidth
                      >
                        <MenuItem value="noIniciado">No Iniciado</MenuItem>
                        <MenuItem value="iniciado">Iniciado</MenuItem>
                        <MenuItem value="terminado">Terminado</MenuItem>
                      </Field>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" sx={{ backgroundColor: "#fff" }}>
                      <InputLabel>Trabajador Asignado</InputLabel>
                      <Field
                        as={Select}
                        name="employeeName"
                        value={values.employeeName || ""}
                        onChange={handleChange}
                        label="Trabajador Asignado"
                        fullWidth
                      >
                        {employees.map((employee) => (
                          <MenuItem key={employee.employeeId} value={employee.name}>
                            {employee.name}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="taskDescription"
                      label="Descripción de la tarea"
                      value={values.taskDescription}
                      onChange={handleChange}
                      fullWidth
                      sx={{ backgroundColor: "#fff" }}
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
                      sx={{ backgroundColor: "#fff" }}
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
                      sx={{ backgroundColor: "#fff" }}
                    />
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    border: "1px solid #ccc",
                    marginBottom: "2em",
                    padding: "1em",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  <Typography>Fotos iniciales</Typography>
                  <Grid item xs={12}>
                    {prevImages.length > 0 && (
                      <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                        {prevImages.map((img, index) => (
                          <EditableImage
                            key={index}
                            src={img}
                            onSave={(uri) => handleImageSave("prevImages", uri)}
                          />
                        ))}
                      </Box>
                    )}
                    <input
                      type="file"
                      name="prevImages"
                      onChange={(e) => handleFileChange(e, setFieldValue, "prevImages")}
                      multiple
                      style={{ marginTop: "1em", width:isMobile?"300px":"100% "}}
                    />
                  </Grid>
                </Box>

                <Box
                  sx={{
                    border: "1px solid #ccc",
                    marginBottom: "2em",
                    padding: "1em",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  <Typography>Fotos finales</Typography>
                  <Grid item xs={12}>
                    {finalImages.length > 0 && (
                      <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                        {finalImages.map((img, index) => (
                          <EditableImage
                            key={index}
                            src={img}
                            onSave={(uri) => handleImageSave("finalImages", uri)}
                          />
                        ))}
                      </Box>
                    )}
                    <input
                      type="file"
                      name="finalImages"
                      onChange={(e) => handleFileChange(e, setFieldValue, "finalImages")}
                      multiple
                      style={{ marginTop: "1em" }}
                    />
                  </Grid>
                </Box>

                <Box textAlign="center">
                  <Button
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      paddingLeft: "1em",
                      paddingRight: "1em",
                      borderRadius: "10px",
                      ":hover": {
                        backgroundColor: "#1565c0",
                        transform: "scale(1.02)",
                      },
                    }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Guardar Cambios
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}





