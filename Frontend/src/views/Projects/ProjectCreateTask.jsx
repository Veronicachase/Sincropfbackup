import { Box, Grid, Select, MenuItem, TextField, Button } from "@mui/material";

import { Formik, Form, Field } from "formik";
import { CreateTaskFormSchema } from "../../forms/SectionTasks/CreateTaskFormSchema"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/getProjectById";
import { handleSubmitTask } from "../../api/handleSubmitTask";
import { getEmployees } from "../../api/getEmployees";
import VoiceInput from "../../components/VoiceInput";

export default function ProjectCreateTask() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [projectData, setProjectData] = useState(null);

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
        console.log(employeeData)
        setEmployees(employeeData);
      } catch (error) {
        console.error("Error al obtener los datos de los trabajadores:", error);
      }
    };

    fetchData();
  }, [projectId]);

  if (!projectData) {
    return <div>Loading...</div>;
  }

  
  return (
    <Box>
      <Box sx={{ marginTop: "1em" }}>
        <div>
          {projectData.projectName} {projectData.constructionType}{" "}
          {projectData.section}
        </div>
      </Box>
      <Formik
        initialValues={{

          taskName: "",
          employeeId:"",
          employeeName: "",
          taskDescription: "",
          projectId: projectId,
          sectionKey: projectData ? projectData.section : "",
          startDate: "",
          endDate: "",
          status: "noIniciado",
          prevImages: [],
          finalImages:[]
        }}
        validationSchema={CreateTaskFormSchema}
        onSubmit={(values, actions) => {
          handleSubmitTask(values)
            .then(() =>
              navigate(
                `/project-create-task/${values.projectId}/${values.sectionKey}`
              )
            )
            .catch((error) => {
              console.error("Error during the process: ", error);
              actions.setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Box sx={{ maxWidth: 800, margin: "2em auto" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="taskName"
                    label="Nombre de la tarea"
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field as={Select} name="employeeName" fullWidth displayEmpty>
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
                    name="files"
                    onChange={(e) =>
                      setFieldValue("files", e.currentTarget.files)
                    }
                    multiple
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ backgroundColor: "#84C7AE", color: "#fff" }}
                  >
                    Crear Tarea
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
