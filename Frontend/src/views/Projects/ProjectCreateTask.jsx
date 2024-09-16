import { Box, Grid, Select, MenuItem, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { CreateTaskFormSchema } from "./TasksSchemaAndInitialValues/CreateTaskFormSchema";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/projectsAndTaskApis/getProjectById";
import { handleSubmitTask } from "../../api/projectsAndTaskApis/handleSubmitTask";
import {getEmployees } from "../../api/employeeApis/getEmployees";
import VoiceInput from "../../components/generalComponents/VoiceInput";
import { initialValues } from "./TasksSchemaAndInitialValues/InitialValues";
import toast, { Toaster } from "react-hot-toast";

export default function ProjectCreateTask() {
  const { projectId, sectionKey } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [projectData, setProjectData] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  const [finalImages, setFinalImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (projectId) {
        try {
          const projectData = await getProjectById(projectId);
          setProjectData(projectData);
        } catch (error) {
          console.error("Error al obtener los datos del proyecto:", error);
        }
      }

      try {
        const employeeData = await getEmployees();

        setEmployees(employeeData);
      } catch (error) {
        console.error("Error al obtener los datos de los trabajadores:", error);
      }
    };

    fetchData();
  }, [projectId]);
  
  const handleFileUpload = (event, setImages) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => {
      const newImages = files.filter(
        (file) => !prevImages.some((prevFile) => prevFile.name === file.name)
      );
      return [...prevImages, ...newImages];
    });
  };

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Box sx={{ marginTop: "3em" }}>
        <div>
          {projectData.projectName} {" - "} {projectData.constructionType}
          {" - "}
          {sectionKey}
        </div>
      </Box>
      <Formik
        initialValues={initialValues()}
        validationSchema={CreateTaskFormSchema}
        onSubmit={async (values, actions) => {
          const formData = new FormData();
          formData.append("projectId", projectId);
          formData.append("taskName", values.taskName);
          formData.append("employeeId", values.employeeId);
          formData.append("employeeName", values.employeeName);
          formData.append("taskDescription", values.taskDescription);
          formData.append("startDate", values.startDate);
          formData.append("endDate", values.endDate);

          prevImages.forEach((file) => {
            formData.append("prevImages", file);
          });

          finalImages.forEach((file) => {
            formData.append("finalImages", file);
          });

          formData.forEach((value, key) => {});

          try {
            await handleSubmitTask(formData, sectionKey);
            toast.success("Tarea creada con éxito!");
            navigate(-1);
          } catch (error) {
            console.error(
              "Error durante el proceso de creación de tarea: ",
              error
            );
            toast.error("Error al crear la tarea");
            actions.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <Box
              sx={{
                maxWidth: 800,
                margin: "2em auto",
                backgroundColor: "#EDF5F4",
                padding: "2em",
                display: "flex",
                borderRadius: "10px",
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Field
                    sx={{ backgroundColor: "#fff" }}
                    as={TextField}
                    name="taskName"
                    label="Nombre de la tarea"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={Select}
                    name="employeeId"
                    value={values.employeeId || ""}
                    sx={{ backgroundColor: "#fff", marginTop: ".5em" }}
                    fullWidth
                    displayEmpty
                    onChange={(event) => {
                      const selectedEmployeeId = event.target.value;
                      const selectedEmployee = employees.find(
                        (employee) => employee.employeeId === selectedEmployeeId
                      );
                      const selectedEmployeeName = selectedEmployee
                        ? selectedEmployee.name
                        : "";
                      setFieldValue("employeeId", selectedEmployeeId);
                      setFieldValue("employeeName", selectedEmployeeName);
                    }}
                  >
                    <MenuItem value="">
                      <em>Selecciona a un trabajador</em>
                    </MenuItem>
                    {employees.map((employee) => (
                      <MenuItem
                        key={employee.employeeId}
                        value={employee.employeeId}
                      >
                        {employee.name}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    sx={{ backgroundColor: "#fff", marginTop: ".5em" }}
                    as={TextField}
                    name="taskDescription"
                    label="Descripción de la tarea"
                    multiline
                    fullWidth
                    InputProps={{
                      endAdornment: <VoiceInput name="taskDescription" />,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    sx={{
                      backgroundColor: "#fff",
                      marginTop: "2em",
                      marginBottom: "2em",
                    }}
                    as={TextField}
                    name="startDate"
                    label="Fecha de inicio"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    sx={{
                      backgroundColor: "#fff",
                      marginTop: "2em",
                      marginBottom: "2em",
                    }}
                    as={TextField}
                    name="endDate"
                    label="Fecha de entrega"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    name="prevImages"
                    onChange={(e) =>
                      handleFileUpload(e, setPrevImages, prevImages)
                    }
                    multiple
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    name="finalImages"
                    onChange={(e) => handleFileUpload(e, setFinalImages)}
                    multiple
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      marginTop: "2em",
                    }}
                  >
                    Crear Tarea
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
      <Toaster position="top-right" reverseOrder={false} />
    </Box>
  );
}
