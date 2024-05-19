// aquí me falta poder enviar las imágenes al cloudinary, no me está llegando la info de projectId Y projectName a la base de datos ni de área. 
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../ui/CustomTextField";
import { Grid, Box, Typography, Button, Select, MenuItem } from "@mui/material";
import { handleSubmitOrder } from "../../api/handleSubmitOrder";
import { orderFormSchema } from "../../forms/OrdersMaterial/OrdersFormSchema";
import { getAllProjects } from "../../api/getAllProjects";

function CreateOrder() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const projectResponse = await getAllProjects();
      setProjects(projectResponse);
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
    }
  };

  function previewFiles(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  }

  const initialValues = {
    orderId: "",
    projectName: "",
    projectId: "",
    productName: "",
    provider: "",
    brand: "",
    amount: "",
    details: "",
    typeOfWork: "",
    status: "pendiente",
    date: new Date().toISOString().slice(0, 10),
    area: "",
    section: "",
    image: "",
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  return (
    <> 
    <Typography variant="body">{new Date().toISOString().slice(0, 10) }</Typography>
    <Formik
      initialValues={initialValues}
      validationSchema={orderFormSchema}
      onSubmit={(values, actions) => {
        values.section = {
          name: values.section,
          value: true,
        };
        if (image) {
          values.image = image;
        }
        console.log("Formulario enviado", values);
        handleSubmitOrder(values)
          .then(() => {
            console.log(values);
            actions.setSubmitting(false);
            actions.resetForm();
            alert("Producto creado correctamente");
            navigate("/order-list");
          })
          .catch((error) => {
            console.error("Error en el proceso: ", error);
            actions.setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting, setFieldValue, values, errors }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: "800px",
              margin: "2em auto",
              padding: "2em",
              boxShadow: 3,
              borderRadius: "10px",
              backgroundColor: "#EDF5F4",
            }}
          >
            <Box sx={{ marginBottom: "2em", borderRadius: "10px" }}>
              <Typography variant="h5" gutterBottom>
                Crear Pedido
              </Typography>
            </Box>

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
                <Field
                  name="projectName"
                  as={Select}
                  variant="outlined"
                  fullWidth
                  displayEmpty
                  onChange={(event) => {
                    const selectedProject = projects.find(project => project.name === event.target.value);
                    setFieldValue('projectName', event.target.value);
                    setFieldValue('projectId', selectedProject ? selectedProject.id : '');
                  }}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <em>Seleccionar Proyecto</em>;
                    }
                    return selected;
                  }}
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Seleccionar Proyecto</em>
                  </MenuItem>
                  {projects.map((project) => (
                    <MenuItem key={project.projectId} value={project.projectName}>
                      {project.projectName}
                    </MenuItem>
                  ))}
                </Field>
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
                  name="area"
                  as={CustomTextField}
                  label="Área"
                  placeholder="Zona en la que utilizará el producto"
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
                  name="section"
                  as={Select}
                  value={values.section}
                  onChange={(event) =>
                    setFieldValue("section", event.target.value)
                  }
                  label="Sección a Trabajar"
                  fullWidth
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <em>Selecciona un área</em>;
                    }
                    return selected;
                  }}
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Selecciona un área</em>
                  </MenuItem>
                  <MenuItem value="cocina">Cocina</MenuItem>
                  <MenuItem value="salon">Salón</MenuItem>
                  <MenuItem value="baño">Baño</MenuItem>
                  <MenuItem value="techo">Techo</MenuItem>
                  <MenuItem value="piso">Piso</MenuItem>
                  <MenuItem value="piscina">Piscina</MenuItem>
                  <MenuItem value="terraza">Terraza</MenuItem>
                  <MenuItem value="otro">Otro</MenuItem>
                </Field>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    backgroundColor: "#84C7AE",
                    color: "#fff",
                    borderRadius: "10px",
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
                    backgroundColor: "#84C7AE",
                    color: "#fff",
                    paddingLeft: "1em",
                    paddingRight: "1em",
                    borderRadius: "10px",
                  }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Crear Producto
                </Button>
              </Grid>
            </Grid>
          </Box>
          
        </Form>
      )}
    </Formik>
    </>
  );

}

export default CreateOrder;













