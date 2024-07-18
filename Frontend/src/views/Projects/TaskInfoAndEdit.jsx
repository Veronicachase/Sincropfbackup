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
  useMediaQuery,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { CreateTaskFormSchema } from "../../forms/SectionTasks/CreateTaskFormSchema";
import { getTaskById } from "../../api/getTaskById";
import { updateTaskById } from "../../api/updateTaskById";
import IconColors from "../../components/IconColors";
import { getEmployees } from "../../api/getEmployees";
import toast from "react-hot-toast";
import { initialValues } from "../../forms/SectionTasks/InitialValues";
import { capitalizeFirstLetter } from "../../components/CapitalizedFirstLetter";

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
        setPrevImages(
          Array.isArray(taskData.prevImages) ? taskData.prevImages : []
        );
        setFinalImages(
          Array.isArray(taskData.finalImages) ? taskData.finalImages : []
        );
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

  const handleFileUpload = (event, setImages, existingImages=[]) => {
    const files = Array.from(event.target.files);
    console.log('existingImages:', existingImages);
    setImages(existingImages.concat(files));
  };
  const handleImageDelete = (index, setImages, images) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = async (values, actions) => {
    console.log("Valores antes de enviar:", values);
    const formData = new FormData();

    // Añadir campos de texto
    Object.keys(values).forEach((key) => {
      if (key !== "prevImages" && key !== "finalImages") {
        formData.append(key, values[key]);
      }
    });
    if (!values.sectionKey) {
      formData.append("sectionKey", task.sectionKey);
    }
    // Añadir archivos
    prevImages.forEach((file) => {
      formData.append("prevImages", file);
    });

    finalImages.forEach((file) => {
      formData.append("finalImages", file);
    });

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      await updateTaskById(taskId, formData);
      toast.success("Datos actualizados!");
    } catch (error) {
      toast.error("Error al editar. Por favor, intenta de nuevo.");
      console.error("Error en el envío del formulario:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!task) return <p>No se encontró la tarea</p>;

  return (
    <Box display={"flex"} sx={{ paddingTop: "2em", borderRadius: "10px" }}>
      <Box sx={{ width: "100%", padding: isMobile ? "2em auto" : "2em" }}>
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
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                <Grid container spacing={2} sx={{ marginBottom: "2em" }}>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      margin="normal"
                      sx={{ backgroundColor: "#fff" }}
                    >
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
                    <FormControl
                      fullWidth
                      margin="normal"
                      sx={{ backgroundColor: "#fff" }}
                    >
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
                          <MenuItem
                            key={employee.employeeId}
                            value={employee.name}
                          >
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
                  <Typography>Imágenes iniciales</Typography>
                  <Grid item xs={12}>
                    {prevImages.length > 0 && (
                      <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                        {prevImages.map((img, index) => (
                          <img
                            key={index}
                            src={
                              typeof img === "string"
                                ? img
                                : URL.createObjectURL(img)
                            }
                            alt={`prev-${index}`}
                            style={{ width: "100px", height: "100px" }}
                          />
                        ))}
                      </Box>
                    )}
                    <input
                      type="file"
                      name="prevImages"
                      onChange={(e) =>
                      handleFileUpload(e, setPrevImages, prevImages)
                      }
                      multiple
                      style={{
                        marginTop: "1em",
                        width: isMobile ? "300px" : "100%",
                      }}
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
                  <Typography>Imagenes finales</Typography>
                  <Grid item xs={12}>
                    {finalImages.length > 0 && (
                      <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                        {finalImages.map((img, index) => (
                          <img
                            key={index}
                            src={
                              typeof img === "string"
                                ? img
                                : URL.createObjectURL(img)
                            }
                            alt={`final-${index}`}
                            style={{
                              width: "100px",
                              height: "100px",
                              marginRight: "1em",
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    <input
                      type="file"
                      name="finalImages"
                      onChange={(e) =>
                      handleFileUpload(e, setFinalImages, finalImages)
                      }
                      multiple
                      style={{
                        marginTop: "1em",
                        width: isMobile ? "300px" : "100%",
                      }}
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
