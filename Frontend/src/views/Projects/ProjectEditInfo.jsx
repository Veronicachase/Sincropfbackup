/* eslint-disable no-unused-vars */
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { initialValues as defaultInitialValues } from "../../forms/Proyectos/CrearProyectoInitialValues";
import { NewProjectFormSchema } from "../../forms/Proyectos/NewProjectFormSchema";
import { getProjectById } from "../../api/getProjectById";
import { updateProjectById } from "../../api/updateProjectById";
import { getTaskBySection } from "../../api/getTaskBySection";
import { TranslateSectionName } from "../../components/translateSectionName";
import { getLabel } from "../../components/getLabel";
import CheckboxC from "../../components/CheckboxC";
import MapView from "../../components/MapView";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from '@mui/icons-material/Edit';

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
import IconColors from "../../components/IconColors";

export default function ProjectEditInfo() {
  const { projectId } = useParams();
  const [formValues, setFormValues] = useState(defaultInitialValues);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});
  const [tasks, setTasks] = useState({});
  const navigate = useNavigate();
  const [newSection, setNewSection] = useState("");

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

  const toggleSection = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
    if (!tasks[sectionKey]) {
      getTaskBySection(projectId, sectionKey).then((tasks) => {
        setTasks((prev) => ({
          ...prev,
          [sectionKey]: tasks,
        }));
      });
    }
  };

  const handleDeleteSection = async (sectionKey) => {
    const updatedSections = { ...project.sections, [sectionKey]: false };
    if (window.confirm("¿Está seguro de querer eliminar la sección?, no podrá recuperarla.")) {
      try {
        await updateProjectById(projectId, { sections: updatedSections });
        setProject((prevProject) => ({
          ...prevProject,
          sections: updatedSections,
        }));
        alert("Sección eliminada");
      } catch (error) {
        alert("Error al eliminar sección. Por favor, intenta de nuevo.");
      }
    }
  };

  const handleAddSection = async () => {
    if (newSection.trim() !== "") {
      const updatedSections = {
        ...project.sections,
        [newSection]: true,
      };
      const updatedValues = {
        ...formValues,
        sections: updatedSections,
      };
      try {
        await updateProjectById(projectId, updatedValues);
        setProject((prevProject) => ({
          ...prevProject,
          sections: updatedSections,
        }));
        setNewSection("");
        alert("Sección agregada");
      } catch (error) {
        alert("Error al agregar sección. Por favor, intenta de nuevo.");
      }
    }
  };

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
    <>
      <Box
        sx={{
          margin: "0 auto",
          width: "100%",
          flexGrow: 1,
          alignContent: "center",
        }}
      >
        <Box sx={{ textAlign: "left", marginLeft: "2em", marginTop: "1em" }}>
          <Typography variant="body1">
            {project.projectName} - {project.constructionType}
          </Typography>

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
                                backgroundColor: "#ffffff4d",
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
                                style={{ border: "none", backgroundColor: "#ffffff4d" }}
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
                        <FormControl fullWidth sx={{ marginTop: "1em", backgroundColor: "#ffffff4d" }}>
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
                          </Select>
                        </FormControl>
                      )}
                    </Box>
                  ))}
                <Box>
                  <Button type="submit">Actualizar</Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Secciones:</Typography>
            </Grid>
            {Object.entries(project.sections).map(([sectionKey, isActive]) => (
              <Grid item xs={12} key={sectionKey}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginBottom: "0.5em",
                    padding: "0.5em",
                  }}
                >
                  <Typography>{TranslateSectionName(sectionKey)}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() => toggleSection(sectionKey)}
                      size="small"
                      sx={{ marginRight: "5px" }}
                    >
                      {expandedSections[sectionKey] ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </IconButton>
                    <IconButton size="small" sx={{ marginRight: "5px" }}>
                      
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ marginRight: "5px" }}
                      onClick={() => handleDeleteSection(sectionKey)}
                    >
                      <DeleteForeverIcon  sx={{color:"red"}}/>
                    </IconButton>
                   
                  </Box>
                </Box>
                <Collapse in={expandedSections[sectionKey]}>
                  {tasks[sectionKey] && tasks[sectionKey].length > 0 && (
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "0.5em",
                        marginTop: "0.5em",
                      }}
                    >
                      <Typography variant="subtitle1">Tareas:</Typography>
                      <ul>
                        {tasks[sectionKey].map((task) => (
                          <li key={task.taskId}  >
                            <a href={`/edit-task/${task.taskId}`}>{task.taskName} <EditIcon sx={{color:"#fff"}} /></a>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}
                </Collapse>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ marginTop: "1em" }}>
          <Box mt={"1em"}> 
            <FormControl fullWidth>
              <InputLabel> Nueva sección</InputLabel>
              <input
                type="text"
                placeholder="Escriba aquí el nombre de la sección que quiere crear"
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
              />
             
            </FormControl>
            </Box>
            <Button
              variant="outlined"
              onClick={handleAddSection}
              startIcon={<AddCircleIcon />}
              
              sx={{ marginTop: "2em", border:"1px solid #fff", color:"#000", marginBottom:"2em" }}
            >
              Agregar Sección
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}














