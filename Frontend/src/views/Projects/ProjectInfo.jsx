
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { initialValues as defaultInitialValues } from "../../forms/Proyectos/CrearProyectoInitialValues";
import { NewProjectFormSchema } from "../../forms/Proyectos/NewProjectFormSchema";
import { getProjectById } from "../../api/getProjectById";
import { updateProjectById } from "../../api/updateProjectById";
import { TranslateSectionName } from "../../components/translateSectionName";
import { getLabel } from "../../components/getLabel";
import CheckboxC from "../../components/CheckboxC";
import MapView from "../../components/MapView";

import {
  Button,
  Grid,
  IconButton,
  Collapse,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconColors from "../../components/IconColors";

export default function ProjectInfo() {
  const { projectId } = useParams();
  const [formValues, setFormValues] = useState(defaultInitialValues);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId)
        .then((projectData) => {
          if (projectData) {
            const sanitizedProjectData = Object.fromEntries(
              Object.entries(projectData).map(([key, value]) => [key, value || ""])
            );
            setFormValues({ ...defaultInitialValues, ...sanitizedProjectData });
            setProject(sanitizedProjectData);
          } else {
            console.error("Error, si esto se muestra es porque no se pudieron traer los datos del getProjectById Frontend");
          }
        })
        .catch((error) => {
          console.error("Error si esto se muestra es porque no se pudieron traer los datos del getProjectById Frontend:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [projectId]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
// Tengo que agregar updateprojectBysection, pero se me olvidó por qué. 


  const handleSubmit = async (values) => {
    try {
      await updateProjectById(projectId, values);
      alert("Datos actualizados");
    } catch (error) {
      alert("Error al editar. Por favor, intenta de nuevo. Esto viene del handleSubmit y si esto para revisar updateProjectById");
    }
  };

  if (loading) {
    return <p>Cargando proyecto...</p>;
  }

  if (!project) {
    return <p>No se encontró el proyecto</p>;
  }

  return (
    <Box
      sx={{
        margin: "0 auto",
        width: "100%",
        flexGrow: 1,
        alignContent: "center",
        backgroundColor: "#EDF5F4",
      }}
    >
      <Box sx={{ textAlign: "left", marginLeft: "2em", marginTop: "1em" }}>
        <Typography variant="body1">
          {project.projectName} - {project.constructionType}
        </Typography>
        <IconButton onClick={toggleForm}>
          <Typography variant="h6">Editar Información del Proyecto</Typography>
          {showForm ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
        <Collapse in={showForm}>
          <Formik
            initialValues={formValues}
            enableReinitialize={true}
            validationSchema={NewProjectFormSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors }) => (
              <Form>
                {Object.entries(values)
                  .filter(
                    ([key]) =>
                      ![
                        "projectId",
                        "filesId",
                        "employeeId",
                        "userId",
                        "reports",
                        "sections",
                        "area",
                        "addedSection",
                        "createTask",
                        "portal",
                        "image",
                      ].includes(key)
                  )
                  .map(([key]) => (
                    <Box key={key}>
                      {key !== "typeOfWork" &&
                        key !== "constructionType" &&
                        key !== "status" && (
                          <Grid item xs={12} md={12}>
                            <Box
                              sx={{
                                border: "1px solid #ccc",
                                marginBottom: ".5em",
                                paddingLeft: "1em",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                borderRadius: "5px",
                              }}
                            >
                              <label htmlFor={key}>
                                <strong>{getLabel(key)}</strong>{" "}
                              </label>
                              <Field
                                id={key}
                                name={key}
                                as="input"
                                value={values[key] || ""}
                                style={{ border: "none" }}
                              />
                            </Box>
                          </Grid>
                        )}
                      {key === "map" && (
                        <Grid item xs={12}>
                          <div id="map" style={{ height: "400px", width: "100%" }}>
                            <MapView setFieldValue={setFieldValue} />
                          </div>
                        </Grid>
                      )}
                      {key === "typeOfWork" && (
                        <FormControl fullWidth sx={{ marginTop: "1em" }}>
                          <InputLabel>{getLabel(key)}</InputLabel>
                          <Select
                            name="typeOfWork"
                            value={values.typeOfWork}
                            onChange={(e) =>
                              setFieldValue("typeOfWork", e.target.value)
                            }
                          >
                            <MenuItem value="finishings">Repasos</MenuItem>
                            <MenuItem value="construction">Construcción</MenuItem>
                            <MenuItem value="installations">Instalaciones</MenuItem>
                            <MenuItem value="other">Otros</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                      {key === "constructionType" && (
                        <FormControl fullWidth sx={{ marginTop: "1em", marginBottom: "1em" }}>
                          <InputLabel>{getLabel(key)}</InputLabel>
                          <Select
                            name="constructionType"
                            value={values.constructionType}
                            onChange={(e) =>
                              setFieldValue("constructionType", e.target.value)
                            }
                          >
                            <MenuItem value="Apartment">Apartment</MenuItem>
                            <MenuItem value="Chalet">Chalet</MenuItem>
                            <MenuItem value="Rural">Rural</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                      {key === "status" && (
                        <FormControl fullWidth sx={{ marginBottom: ".5em" }}>
                          <InputLabel>{getLabel(key)}</InputLabel>
                          <Select
                            name="status"
                            value={values.status}
                            onChange={(e) => setFieldValue("status", e.target.value)}
                          >
                            <MenuItem value="noIniciado">No iniciado</MenuItem>
                            <MenuItem value="iniciado">Iniciado</MenuItem>
                            <MenuItem value="terminado">Terminado</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                      {key === "sections" && (
                        <Grid item xs={12} sm={12}>
                          <Typography
                            variant="body"
                            sx={{
                              paddingBottom: "1em",
                              display: "block",
                              textAlign: "left",
                            }}
                          >
                            Escoger las secciones a trabajar
                          </Typography>
                          <CheckboxC setFieldValue={setFieldValue} values={values} />
                        </Grid>
                      )}
                    </Box>
                  ))}
                <Button type="submit">Guardar Cambios</Button>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
              </Form>
            )}
          </Formik>
        </Collapse>

        {/* Visualización de secciones activas fuera del Collapse */}
        <Box sx={{ width: "90%", margin: "auto" }}>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Secciones Activas del Proyecto
          </Typography>
          {project.sections &&
            Object.entries(project.sections).map(
              ([sectionKey, isActive]) =>
                isActive && (
                  <Box
                    key={sectionKey}
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 1,
                      justifyContent: "space-between",
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <IconColors />
                    <Typography variant="h6">
                      {TranslateSectionName(sectionKey)}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        navigate(
                          `/project-section-tasks/${projectId}/${sectionKey}`
                        )
                      }
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box>
                )
            )}
        </Box>
      </Box>
    </Box>
  );
}



