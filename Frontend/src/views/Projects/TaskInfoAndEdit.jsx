// botones... boton guardar cambios a la derecha , eliminar pdf..
// en editar tarea debe decir editar tarea en la cabecera o el nombre de la tarea
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
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { CreateTaskFormSchema } from "../../forms/SectionTasks/CreateTaskFormSchema";
import { getTaskById } from "../../api/getTaskById";
import { updateTaskById } from "../../api/updateTaskById";
import IconColors from "../../components/IconColors";
import { getEmployees } from "../../api/getEmployees";
import SideMenu from "../../components/SideMenu";
import toast, { Toaster } from 'react-hot-toast';

export default function TaskInfoAndEdit() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [imageUrls, setImageUrls] = useState({
    prevImages: [],
    finalImages: [],
  });

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
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "prevImages" || key === "finalImages" || key === "pdf") {
        values[key].forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      await updateTaskById(taskId, values);
      toast.success('Datos actualizados!')
      
    } catch (error) {
      toast.error("Error al editar. Por favor, intenta de nuevo.")
      
      console.error("Error en el envío del formulario:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  // const handleStatusChange = async (newStatus) => {
  //   try {
  //     await updateTaskById(taskId, { status: newStatus });
  //     setTask({ ...task, status: newStatus });
  //     console.log("Estado actualizado a:", newStatus);
  //     alert(`Estado actualizado a: ${newStatus}`);
  //   } catch (error) {
  //     alert("Error al actualizar el estado. Por favor, intenta de nuevo.");
  //     console.error(error);
  //   }
  // };

  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageUrls((prev) => ({
      ...prev,
      [type]: urls,
    }));
  };

  if (loading) return <p>Cargando...</p>;
  if (!task) return <p>No se encontró la tarea</p>;

  return (
    <Box display={"flex"} sx={{ backgroundColor: "#EDF5F4", paddingTop: "2em", borderRadius:"10px" }}>
      <Box>
        <SideMenu />{" "}
      </Box>

      <Box>
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
          <Typography variant="body">Editar tarea</Typography>
          <Typography variant="h6">{task.taskName}</Typography>
        </Box>

        <Box>
          <Formik
            initialValues={{
              taskName: task.taskName || "",
              employeeId: task.employeeId || "",
              employeeName: task.employeeName || "",
              projectId: task.projectId || "",
              sectionKey: task.sectionKey || "",
              taskDescription: task.taskDescription || "",
              startDate: task.startDate || "",
              endDate: task.endDate || "",
              pdf: task.pdf || [],
              status: task.status || "noIniciado",
              prevImages: task.prevImages || [],
              finalImages: task.finalImages || [],
            }}
            validationSchema={CreateTaskFormSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue, isSubmitting }) => (
              <Form>
              
                <Grid container spacing={2} sx={{ marginBottom: "2em" }}>
                  <Grid item xs={11}>
                    <Field
                    sx={{backgroundColor:"#fff"}}
                      as={Select}
                      name="employeeName"
                      label="Trabajador Asignado"
                      value={values.employeeName}
                      onChange={handleChange}
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
                  </Grid>

                  <Grid item xs={11}>
                    <Field
                    sx={{backgroundColor:"#fff"}}
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
                    sx={{backgroundColor:"#fff"}}
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
                  <Grid item xs={5}>
                    <Field
                    sx={{backgroundColor:"#fff"}}
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

                

                <Box
                  sx={{
                    border: "1px solid #ccc",
                    marginBottom: "2em",
                    paddingTop: "2em",
                    paddingBottom: "2em",
                    backgroundColor:"#fff",
                    width:"91%",
                    borderRadius:"5px"
                  }}
                >
                  <Typography>Fotos iniciales</Typography>
                  <Grid item xs={11} >
                    {values.prevImages && values.prevImages.length > 0 && (
                      <Box >
                        {values.prevImages.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Prev Image ${index}`}
                            style={{
                              width: "100px",
                              height: "100px",
                              marginRight: "10px",
                              
                            }}
                          />
                        ))}
                      </Box >
                    )}
                    <input
                      type="file"
                      name="prevImages"
                      onChange={(e) => {
                        setFieldValue(
                          "prevImages",
                          Array.from(e.currentTarget.files)
                        );
                        handleFileChange(e, "prevImages");
                      }}
                      multiple
                    />
                  </Grid>
                </Box>

                <Box
                  sx={{
                    border: "1px solid #ccc",
                    marginBottom: "2em",
                    paddingTop: "2em",
                    paddingBottom: "2em",
                    backgroundColor:"#fff",
                    width:"91%",
                    borderRadius:"5px"
                  }}
                >
                  <Typography>Fotos finales</Typography>
                  <Grid item xs={11}>
                    {values.finalImages && values.finalImages.length > 0 && (
                      <Box>
                        {values.finalImages.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Final Image ${index}`}
                            style={{
                              width: "100px",
                              height: "100px",
                              marginRight: "10px",
                              
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    <input
                      type="file"
                      name="finalImages"
                      onChange={(e) => {
                        setFieldValue(
                          "finalImages",
                          Array.from(e.currentTarget.files)
                        );
                        handleFileChange(e, "finalImages");
                      }}
                      multiple
                    />
                  </Grid>
                </Box>

                <Button
                  sx={{
                    border: "2px solid #000",
                    color: "#000",
                    marginBottom: "2em",
                    marginTop: "2em",
                    marginRight: "1em",
                  }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Guardar Cambios
                </Button>

                
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}
