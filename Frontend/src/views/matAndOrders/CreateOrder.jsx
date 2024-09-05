import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../components/generalComponents/CustomTextField";
import {
  Grid,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { handleSubmitOrder } from "../../api/orderApis/handleSubmitOrder";
import { OrderFormSchema } from "./ordersSchemaAndInitialValues/OrdersFormSchema";
import { getAllProjects } from "../../api/projectsAndTaskApis/getAllProjects";
import { InitialValues } from "./ordersSchemaAndInitialValues/InitialValues";
import toast, { Toaster } from "react-hot-toast";

function CreateOrder() {
  const navigate = useNavigate();
  const { projectId: currentProjectId } = useParams();
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [initialValues, setInitialValues] = useState(InitialValues);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectResponse = await getAllProjects();
        setProjects(projectResponse);

        const currentProject = projectResponse.find(
          (project) => project.projectId === currentProjectId
        );
        if (currentProject) {
          setInitialValues((prevValues) => ({
            ...prevValues,
            projectId: currentProject.projectId,
            projectName: currentProject.projectName,
          }));
        }
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchProjects();
  }, [currentProjectId]);

  function previewFiles(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  return (
    <>
      <Box sx={{ marginTop: "3em", display: "flex", marginLeft: "10em" }}>
        <Typography variant="body">
          {" "}
          Fecha: {new Date().toISOString().slice(0, 10)}
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={OrderFormSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          if (image) {
            values.image = image;
          }

          handleSubmitOrder(values)
            .then(() => {
              actions.setSubmitting(false);
              actions.resetForm();
              toast.success("Producto creado correctamente!");
              navigate("/order-list");
            })
            .catch((error) => {
              console.error("Error en el proceso: ", error);
              actions.setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "800px",
                margin: "2em auto",
                boxShadow: 3,
                padding: "2em auto",
                borderRadius: "10px",
                backgroundColor: "#fff",
                transition: "transform 0.3s, box-shadow 0.3s",
                ":hover": {
                  transform: "scale(1.01)",
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  marginBottom: "2em",
                  borderRadius: "10px",
                  marginTop: "2em",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Crear Pedido
                </Typography>
              </Box>
              <Box width={"90%"} margin={"0 auto"}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      name="projectId"
                      as={CustomTextField}
                      label="ID del Proyecto"
                      placeholder="Se rellena solo"
                      fullWidth
                      value={values.projectId}
                      InputProps={{
                        style: {
                          borderRadius: "10px",
                          backgroundColor: "#fff",
                        },
                        readOnly: true,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Field
                        name="projectName"
                        as={Select}
                        labelId="project-label"
                        variant="outlined"
                        fullWidth
                        displayEmpty
                        onChange={(event) => {
                          const selectedProject = projects.find(
                            (project) =>
                              project.projectName === event.target.value
                          );
                          setFieldValue("projectName", event.target.value);
                          setFieldValue(
                            "projectId",
                            selectedProject ? selectedProject.projectId : ""
                          );
                        }}
                        value={values.projectName || ""}
                        sx={{
                          borderRadius: "10px",
                          backgroundColor: "#fff",
                        }}
                      >
                        <MenuItem value="">
                          <em>Seleccionar Proyecto</em>
                        </MenuItem>
                        {projects.map((project) => (
                          <MenuItem
                            key={project.projectId}
                            value={project.projectName}
                          >
                            {project.projectName}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="productName"
                      as={CustomTextField}
                      label="Nombre del Producto"
                      placeholder="Nombre del Producto"
                      fullWidth
                      InputProps={{
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

                  <Grid item xs={12}>
                    <Field
                      name="amount"
                      as={CustomTextField}
                      label="Cantidad"
                      placeholder="Cantidad"
                      fullWidth
                      InputProps={{
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

                  <Grid item xs={12}>
                    <Field
                      name="brand"
                      as={CustomTextField}
                      label="Marca"
                      placeholder="Marca del Producto"
                      fullWidth
                      InputProps={{
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

                  <Grid item xs={12}>
                    <Field
                      name="details"
                      as={CustomTextField}
                      label="Detalles"
                      placeholder="Detalles del Producto"
                      fullWidth
                      InputProps={{
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
                  <Grid item xs={12}>
                    <Field
                      name="provider"
                      as={CustomTextField}
                      label="Proveedor"
                      placeholder="Opciones de donde comprarlo"
                      fullWidth
                      InputProps={{
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

                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{
                        color: "#1976d2",
                        borderRadius: "10px",
                        ":hover": {
                          backgroundColor: "#76b0a0",
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      Agregar Imagen
                      <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {image && (
                      <img
                        src={image}
                        alt="Preview"
                        style={{
                          marginTop: "10px",
                          maxHeight: "200px",
                          display: "block",
                        }}
                      />
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      sx={{
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        paddingLeft: "1em",
                        paddingRight: "1em",
                        borderRadius: "10px",
                        marginBottom: "2em",
                        ":hover": {
                          backgroundColor: "#76b0a0",
                          transform: "scale(1.02)",
                        },
                      }}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Crear Producto
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CreateOrder;
