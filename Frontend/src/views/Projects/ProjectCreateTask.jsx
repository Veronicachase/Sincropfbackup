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
import getEmployees from "../../api/getEmployees";

export default function ProjectCreateTask() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    getProjectById().then(setProjectData);
    getEmployees().then(setEmployees);
  }, []);

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
          task: "",
          taskDescription: "",
          assignedEmployee: "",
          files: [],
        }}
        validationSchema={yup.object({
          task: yup.string().required("Task name is required"),
          taskDescription: yup.string(),
          assignedEmployee: yup
            .string()
            .required("Assigning an employee is required"),
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
                    name="task"
                    label="Task Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Select
                    name="assignedEmployee"
                    value={values.assignedEmployee}
                    onChange={(event) =>
                      setFieldValue("assignedEmployee", event.target.value)
                    }
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {employees.map((employee) => (
                      <MenuItem key={employee.id} value={employee.id}>
                        {employee.name}
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
                </Grid>
                <Grid item xs={12}>
               
                  <FormLabel>Add an Image</FormLabel>
                 
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" disabled={isSubmitting}>
                    Create Task
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
