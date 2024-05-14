// aquí intento traer datos del proyecto y sección (como cabecera)
// luego hacer un form donde se pueda rellenar el nombre de la tarea
// luego un dropdown donde pueda escoger al trabajador asignado
// descripción del trabajo
// agregar fotos (varias fotos)
// al crear la tarea navigate a la pagina anterior.

import {
  Box,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
  FormLabel,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjectById } from "../../api/getProjectById";
import { handleFileUpload } from "../../api/handleFileUpload";
import { handleSubmitTask } from "../../api/handleSubmitTask";
import { getEmployees } from "../../api/getEmployees";
import { useParams } from "react-router-dom";
import VoiceInput from "../../components/VoiceInput";
import IconButton from "@mui/material/IconButton";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

export default function ProjectCreateTask() {
  const { projectId, employeeId } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    getProjectById(projectId).then(setProjectData);
    getEmployees(employeeId).then(setEmployees);
  }, [projectId, employeeId]);

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      {projectData.map((item) => (
        <Box key={item.projectName}>
          {item.projectName} {item.constructionType} {item.section}
        </Box>
      ))}

      <Formik
        initialValues={{
          taskName: "",
          employeeName: "",
          taskDescription: "",
          startDate: "",
          endDate: "",
          assignedEmployee: "",
          files: [],
        }}
        validationSchema={yup.object({
          taskName: yup.string(),
          employeeName: yup.string(),
          taskDescription: yup.string(),
          startDate: yup.date(),
          endDate: yup.date(),
          files: yup.string(),
        })}
        onSubmit={(values, actions) => {
          handleSubmitTask(values)
            .then(() => {
              if (values.files && values.files.length > 0) {
                values.files.forEach((file) => handleFileUpload(file));
              }
              navigate("/my-projects");
            })
            .catch((error) => {
              console.error("Error during the process: ", error);
              actions.setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: 800,
                margin: "2em auto",
                boxShadow: "shadow-custom",
                color: "#021F59",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="taskName"
                    label="Task Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Select
                    name="employeeName"
                    value={values.employeeName}
                    onChange={(event) =>
                      setFieldValue("employeeName", event.target.value)
                    }
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {employees.map((employee) => (
                      <MenuItem
                        key={employee.employeeId}
                        value={employee.employeeId}
                      >
                        {employee.employeeName}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="taskDescription"
                    label="Task Description"
                    multiline
                    fullWidth
                  />
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="taskDescription"
                      label="Task Description"
                      multiline
                      fullWidth
                    />
                    <VoiceInput
                      name="taskDescription"
                      label="Dictar Descripción"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    name="startDate"
                    label="Fecha de inicio"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    name="endDate"
                    label="Fecha de entrega"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <input
                    type="file"
                    name="files"
                    onChange={(event) => {
                      setFieldValue("files", event.currentTarget.files);
                    }}
                    multiple
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" disabled={isSubmitting}>
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
