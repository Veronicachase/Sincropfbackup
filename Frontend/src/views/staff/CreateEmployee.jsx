import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Grid, Box, Button, Typography } from "@mui/material";
import CustomTextField from "../../components/generalComponents/CustomTextField";
import VoiceInput from "../../components/generalComponents/VoiceInput";
import { CrearTrabajadorFormSchema } from "./EmployeeInitialValuesAndSchema/CrearTrabajadorFormSchema";
import { getAllProjects } from "../../api/projectsAndTaskApis/getAllProjects";
import { initialValues } from "./EmployeeInitialValuesAndSchema/InitialValues";
import { handleSubmitEmployee } from "../../api/employeeApis/handleSubmitEmployee";

const CrearTrabajador = () => {
  const [selected, setSelected] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getAllProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error al obtener los datos de los proyectos:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (value) => {
    setSelected(value);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CrearTrabajadorFormSchema}
      onSubmit={async (values, actions) => {
        try {
          await handleSubmitEmployee(values);

          actions.setSubmitting(false);
          actions.resetForm();
        } catch (error) {
          console.error("Error al enviar datos del formulario:", error);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              maxWidth: "800px",
              margin: "2em auto",
              flexDirection: "column",
              boxShadow: 3,
              borderRadius: "10px",
              backgroundColor: "#fff",
              transition: "transform 0.3s, box-shadow 0.3s",
              ":hover": {
                transform: "scale(1.01)",
                boxShadow: 6,
              },
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                textAlign: "left",
                marginBottom: "1em",
                paddingTop: "1em",
                paddingLeft: "1em",
              }}
            >
              Crear Trabajador
            </Typography>
            <Box width={"90%"} margin={"1em auto"}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CustomTextField
                    name="date"
                    type="date"
                    label="Fecha"
                    placeholder="Fecha"
                    fullWidth
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        textAlign: "left",
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomTextField
                    name="name"
                    type="text"
                    label="Nombre"
                    placeholder="Nombre"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomTextField
                    name="position"
                    type="text"
                    label="Posición"
                    placeholder="Posición"
                    fullWidth
                    select
                    SelectProps={{
                      native: true,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <option value="">Seleccione una posición</option>
                    <option value="Encargado">Encargado</option>
                    <option value="Ayudante">Ayudante</option>
                    <option value="Principal">Principal</option>
                    <option value="Becario">Becario</option>
                    <option value="Otro">Otro</option>
                  </CustomTextField>
                </Grid>

                <Grid item xs={12}>
                  <CustomTextField
                    name="project"
                    type="text"
                    label="Obra"
                    placeholder="Obra"
                    fullWidth
                    select
                    SelectProps={{
                      native: true,
                    }}
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <option value="">Seleccione un proyecto</option>
                    {projects.map((project) => (
                      <option key={project.projectId} value={project.projectId}>
                        {project.projectName}
                      </option>
                    ))}
                  </CustomTextField>
                </Grid>

                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography
                    sx={{
                      marginTop: "2em",
                      fontWeight: "bold",
                      color: "#1976d2",
                    }}
                  >
                    Equipo Reglamentario Entregado
                  </Typography>
                  <Grid container item justifyContent="center" spacing={2}>
                    <Grid item>
                      <Button
                        sx={{
                          backgroundColor:
                            selected === "Si" ? "#8BB443" : "#E0E0E0",
                          color: selected === "Si" ? "white" : "black",
                          borderRadius: "10px",
                          padding: "0.5em 1.5em",
                          "&:hover": {
                            backgroundColor:
                              selected === "Si" ? "#76A33E" : "#BDBDBD",
                          },
                        }}
                        onClick={() => handleClick("Si")}
                      >
                        SI
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        sx={{
                          backgroundColor:
                            selected === "No" ? "#F25244" : "#E0E0E0",
                          color: selected === "No" ? "white" : "black",
                          borderRadius: "10px",
                          padding: "0.5em 1.5em",
                          "&:hover": {
                            backgroundColor:
                              selected === "No" ? "#D9453A" : "#BDBDBD",
                          },
                        }}
                        onClick={() => handleClick("No")}
                      >
                        NO
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        sx={{
                          backgroundColor:
                            selected === "Incompleto" ? "#F2CB05" : "#E0E0E0",
                          color: selected === "Incompleto" ? "white" : "black",
                          borderRadius: "10px",
                          padding: "0.5em 1.5em",
                          "&:hover": {
                            backgroundColor:
                              selected === "Incompleto" ? "#D4B404" : "#BDBDBD",
                          },
                        }}
                        onClick={() => handleClick("Incompleto")}
                      >
                        Incompleto
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <CustomTextField
                    name="comments"
                    type="text"
                    label="Comentarios"
                    placeholder="Comentarios"
                    fullWidth
                    multiline
                    rows={3}
                    InputProps={{
                      endAdornment: <VoiceInput name="comments" />,
                      style: {
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      marginTop: "2em",
                      marginBottom: "2em",
                      color: "#fff",
                      backgroundColor: "#1976d2",
                      borderRadius: "10px",
                      padding: "0.5em 2em",
                      ":hover": {
                        backgroundColor: "#1565c0",
                        transform: "scale(1.02)",
                      },
                    }}
                    disabled={isSubmitting}
                  >
                    Agregar Trabajador
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CrearTrabajador;
