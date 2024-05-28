/* eslint-disable no-unused-vars */
// que los cuadros ocupen todo el ancho las letras justificadas a la izq. margin bottom, cambiar la palabra proyecto
// de diseño ver que los campos sean del mismo tipo y que luzcan iguales, quitar el crear pdf porque 
// agregar boton de guardar . Mapa mas pequeño, onCLick agrandar se debe colocar en donde se ve el proyecto 
// hay que cambiar el botón de actualizar a más abajo pero hay 2 formiks, hay que agregarle el hamburger, 
// aquí no me funciona nadaaaaaaaaa,  me falta agregar la imagen y setear lo del pdf
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
import { HamburgerMenu } from "../../components/HamburguerMenu";

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
  TextField,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function ProjectEditInfo() {
  const { projectId } = useParams();
  const [formValues, setFormValues] = useState(defaultInitialValues);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});
  const [tasks, setTasks] = useState({});
  const navigate = useNavigate();
  const [newSection, setNewSection] = useState("");
  const [imageUrls, setImageUrls] = useState({ prevImages: [], finalImages: [] });

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

  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageUrls((prev) => ({
      ...prev,
      [type]: urls,
    }));
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (Array.isArray(values[key])) {
          values[key].forEach((file) => {
            formData.append(key, file);
          });
        } else {
          formData.append(key, values[key]);
        }
      });
      await updateProjectById(projectId, formData);
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
    <Box sx={{ width: "90%", margin: "2em auto", padding: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: "1em" }}>
        Editar Proyecto: {project.projectName} - {project.constructionType}
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
                <Box key={key} sx={{ marginBottom: 2 }}>
                  {key !== "typeOfWork" && key !== "constructionType" && key !== "status" && (
                    <TextField
                      fullWidth
                      variant="outlined"
                      label={getLabel(key)}
                      name={key}
                      value={values[key] || ""}
                      onChange={(e) => setFieldValue(key, e.target.value)}
                    />
                  )}
                  {key === "map" && (
                    <Grid item xs={12}>
                      <Box sx={{ height: 400, width: "100%", marginTop: 2 }}>
                        <MapView setFieldValue={setFieldValue} />
                      </Box>
                    </Grid>
                  )}
                  {key === "typeOfWork" && (
                    <FormControl fullWidth variant="outlined" sx={{ marginTop: 2 }}>
                      <InputLabel>{getLabel(key)}</InputLabel>
                      <Select
                        name="typeOfWork"
                        value={values.typeOfWork}
                        onChange={(e) => setFieldValue("typeOfWork", e.target.value)}
                        label={getLabel(key)}
                      >
                        <MenuItem value="finishings">Repasos</MenuItem>
                        <MenuItem value="construction">Construcción</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Box>
              ))}

            <Box sx={{ marginTop: 2 }}>
              <Button variant="outlined" component="label" sx={{ marginRight: 2 }}>
                Agregar Imágenes Anteriores
                <input type="file" name="prevImages" multiple hidden onChange={(e) => {
                  setFieldValue("prevImages", Array.from(e.target.files));
                  handleFileChange(e, "prevImages");
                }} />
              </Button>
              <Button variant="outlined" component="label">
                Agregar Imágenes Finales
                <input type="file" name="finalImages" multiple hidden onChange={(e) => {
                  setFieldValue("finalImages", Array.from(e.target.files));
                  handleFileChange(e, "finalImages");
                }} />
              </Button>
            </Box>

            <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <Button
                variant="outlined"
                onClick={() => navigate("/my-projects")}
                sx={{ marginRight: 2, marginLeft: 2, ":hover": { backgroundColor: "secondary.light" } }}
              >
                Cancelar
              </Button>

              <Button
                variant="contained"
                type="submit"
                sx={{ marginLeft: 2, backgroundColor: "primary.main", ":hover": { backgroundColor: "primary.dark" } }}
              >
                Actualizar
              </Button>
              
            </Box>
          </Form>
        )}
      </Formik>

      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h6">Secciones:</Typography>
        </Grid>
        {Object.entries(project.sections).map(([sectionKey, isActive]) =>
          isActive ? (
            <Grid item xs={12} key={sectionKey}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "0.5em",
                  marginBottom: "0.5em",
                }}
              >
                <Typography>{TranslateSectionName(sectionKey)}</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={() => toggleSection(sectionKey)} size="small" sx={{ marginRight: "5px" }}>
                    {expandedSections[sectionKey] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </IconButton>
                  <IconButton onClick={() => handleDeleteSection(sectionKey)} size="small" sx={{ color: "red" }}>
                    <DeleteForeverIcon />
                  </IconButton>
                </Box>
              </Box>

              <Collapse in={expandedSections[sectionKey]}>
                {tasks[sectionKey] && tasks[sectionKey].length > 0 && (
                  <Box sx={{ border: "1px solid #ccc", borderRadius: "5px", padding: "0.5em", marginTop: "0.5em" }}>
                    <Typography variant="subtitle1">Tareas:</Typography>
                    <ul>
                      {tasks[sectionKey].map((task) => (
                        <li key={task.taskId}>
                          <a href={`/edit-task/${task.taskId}`}>
                            {task.taskName} <EditIcon sx={{ color: "#218BFE" }} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Box>
                )}
              </Collapse>
            </Grid>
          ) : null
        )}
      </Grid>

      <Box sx={{ marginTop: 3, textAlign: "center" }}>
        <FormControl fullWidth variant="outlined">
          <TextField
            label="Nueva sección"
            placeholder="Escriba aquí el nombre de la sección que quiere crear"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </FormControl>
        <Button
          variant="outlined"
          onClick={handleAddSection}
          startIcon={<AddCircleIcon />}
          sx={{ borderColor: "primary.main", color: "primary.main", ":hover": { backgroundColor: "primary.light" } }}
        >
          Agregar Sección
        </Button>
      </Box>
    </Box>
  );
}
