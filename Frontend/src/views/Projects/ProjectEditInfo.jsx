import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { initialValues as defaultInitialValues } from "./ProyectsSchemaAndInitialValues/CrearProyectoInitialValues";
import { NewProjectFormSchema } from "./ProyectsSchemaAndInitialValues/NewProjectFormSchema";
import { getProjectById } from "../../api/projectsAndTaskApis/getProjectById";
import { updateProjectById } from "../../api/projectsAndTaskApis/updateProjectById";
import { getLabel } from "../../components/generalComponents/getLabel";
import toast from "react-hot-toast";

import {
  Button,

  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  CardMedia,
} from "@mui/material";

export default function ProjectEditInfo() {
  const { projectId } = useParams();
  const [formValues, setFormValues] = useState(defaultInitialValues);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");
  const [imageUrls, setImageUrls] = useState("");

  const navigate = useNavigate();

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
            setImageUrls(sanitizedProjectData.image);
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

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("image", file);
      const url = URL.createObjectURL(file);
      setImageUrls(url);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "sections") {
        } else if (values[key] instanceof File) {
          formData.append(key, values[key], values[key].name);
        } else {
          formData.append(key, values[key]);
        }
      });

      const response = await updateProjectById(projectId, formData);
      if (response.ok) {
        toast.success("Datos actualizados");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(
        "Error al editar. Por favor, intenta de nuevo: " + error.message
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
        {({ values, setFieldValue }) => (
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
                    key !== "status" &&
                    key !== "startDate" &&
                    key !== "endDate" && (
                      <TextField
                        fullWidth
                        variant="outlined"
                        label={getLabel(key)}
                        name={key}
                        value={values[key] || ""}
                        onChange={(e) => setFieldValue(key, e.target.value)}
                      />
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
                        <MenuItem value="installations">Instalaciones</MenuItem>
                        <MenuItem value="solarPanels">Paneles solares</MenuItem>
                        <MenuItem value="other">Otras</MenuItem>
                      </Select>
                    </FormControl>
                  )}

                  {key === "startDate" && (
                    <Box sx={{ marginBottom: 2 }}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label={getLabel(key)}
                        name={key}
                        type="date"
                        value={values[key]}
                        onChange={(e) => setFieldValue(key, e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                  )}
                  {key === "endDate" && (
                    <Box sx={{ marginBottom: 2 }}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label={getLabel(key)}
                        name={key}
                        type="date"
                        value={values[key]}
                        onChange={(e) => setFieldValue(key, e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                  )}
                </Box>
              ))}

            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                marginBottom: { xs: "2em", sm: "0" },
                boxShadow: "0 2px 2px #ccc",
              }}
            >
              <Box>
                {imageUrls && (
                  <CardMedia
                    component="img"
                    height="auto"
                    image={imageUrls}
                    alt="Imagen del Proyecto"
                  />
                )}
              </Box>

              <Button
                variant="outlined"
                component="label"
                sx={{
                  marginTop: 2,
                  marginRight: { xs: 0, sm: 2 },
                  marginBottom: { xs: 2, sm: 0 },
                }}
              >
                Cambiar Imagen Inicial
                <input
                  type="file"
                  name="prevImage"
                  hidden
                  onChange={(e) => handleFileChange(e, setFieldValue)}
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
