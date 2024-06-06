
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { initialValues as defaultInitialValues } from "../../forms/Proyectos/CrearProyectoInitialValues";
import { NewProjectFormSchema } from "../../forms/Proyectos/NewProjectFormSchema";
import { getProjectById } from "../../api/getProjectById";
import { updateProjectById } from "../../api/updateProjectById";
import { TranslateSectionName } from "../../components/translateSectionName";
import { getLabel } from "../../components/getLabel";
import MapView from "../../components/MapView";


import {
  Button,
  Grid,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
 
} from "@mui/material";


export default function ProjectEditInfo() {
  const { projectId } = useParams();
  const [formValues, setFormValues] = useState(defaultInitialValues);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
 
  const navigate = useNavigate();

  const [imageUrls, setImageUrls] = useState({
    prevImages: [],
    finalImages: [],
  });

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId)
        .then((projectData) => {
          if (projectData) {
            const sanitizedProjectData = Object.fromEntries(
              Object.entries(projectData).map(([key, value]) => [
                key,
                value || "",
              ])
            );
            setFormValues({ ...defaultInitialValues, ...sanitizedProjectData });
            setProject(sanitizedProjectData);
          } else {
            console.error(
              "Error, si esto se muestra es porque no se pudieron traer los datos del getProjectById Frontend"
            );
          }
        })
        .catch((error) => {
          console.error(
            "Error si esto se muestra es porque no se pudieron traer los datos del getProjectById Frontend:",
            error
          );
        })
        .finally(() => setLoading(false));
    }
  }, [projectId]);

  


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
      alert(
        "Error al editar. Por favor, intenta de nuevo. Esto viene del handleSubmit y si esto para revisar updateProjectById"
      );
    }
  };

  if (loading) {
    return <p>Cargando proyecto...</p>;
  }

  if (!project) {
    return <p>No se encontró el proyecto</p>;
  }

  return (
    <Box sx={{ width: "95%", margin: " 2.5em auto" }}>
      <Typography
        variant="subtitle1"
        sx={{
          marginBottom: "2em",
          marginTop: "1em",
          variant: { xs: "subtitle1", md: "h5" },
        }}
      >
        Editar Proyecto: {project.projectName} - {project.constructionType}
      </Typography>

      <Formik
        initialValues={formValues}
        enableReinitialize={true}
        validationSchema={NewProjectFormSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, }) => (
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
                  {key !== "typeOfWork" &&
                    key !== "constructionType" &&
                    key !== "status" && (
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
                    <FormControl
                      fullWidth
                      variant="outlined"
                      sx={{ marginTop: 2 }}
                    >
                      <InputLabel>{getLabel(key)}</InputLabel>
                      <Select
                        name="typeOfWork"
                        value={values.typeOfWork}
                        onChange={(e) =>
                          setFieldValue("typeOfWork", e.target.value)
                        }
                        label={getLabel(key)}
                      >
                        <MenuItem value="finishings">Repasos</MenuItem>
                        <MenuItem value="construction">Construcción</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Box>
              ))}

            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "center",
                flexDirection: { xs: "column", sm: "row" },
                marginBottom: { xs: "2em", sm: "0" },
              }}
            >
              <Button
                variant="outlined"
                component="label"
                sx={{
                  marginRight: { xs: 0, sm: 2 },
                  marginBottom: { xs: 2, sm: 0 },
                }}
              >
                Agregar Imágen inicial
                <input
                  type="file"
                  name="prevImages"
                  multiple
                  hidden
                  onChange={(e) => {
                    setFieldValue("prevImages", Array.from(e.target.files));
                    handleFileChange(e, "prevImages");
                  }}
                />
              </Button>
              <Button variant="outlined" component="label">
                Agregar Imágen Final
                <input
                  type="file"
                  name="finalImages"
                  multiple
                  hidden
                  onChange={(e) => {
                    setFieldValue("finalImages", Array.from(e.target.files));
                    handleFileChange(e, "finalImages");
                  }}
                />
              </Button>
            </Box>

            

            <Box sx={{ textAlign: "center", marginTop: 3 }}>
             

              <Button
                variant="outlined"
                onClick={() => navigate("/my-projects")}
                sx={{
                  marginRight: 2,
                  marginLeft: 2,
                  ":hover": { backgroundColor: "secondary.light" },
                }}
              >
                Cancelar
              </Button>

              <Button
                variant="contained"
                type="submit"
                sx={{
                  marginLeft: 2,
                  backgroundColor: "primary.main",
                  ":hover": { backgroundColor: "primary.dark" },
                }}
              >
                Actualizar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      
    </Box>
  );
}
