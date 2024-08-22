import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { initialValues } from "../../forms/Proyectos/CrearProyectoInitialValues";
import { NewProjectFormSchema } from "../../forms/Proyectos/NewProjectFormSchema";
import { handleSubmitProject } from "../../api/handlerSubmitProject";
import toast, { Toaster } from "react-hot-toast";
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  ProjectTextField,
  ProjectTextField2,
} from "../../configs/projectTextField";
import MapView from "../../components/MapView";

function CreateNewProject() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NewProjectFormSchema}
      onSubmit={(values, actions) => {
        console.log("Formulario enviado con valores:", values);
        handleSubmitProject(values)
          .then(() => {
            actions.setSubmitting(false);
            actions.resetForm();
            toast.success("Proyecto creado correctamente!");
            navigate("/my-projects");
          })
          .catch((error) => {
            console.error("Error en el proceso:", error);
            actions.setSubmitting(false);
            actions.setTouched({
              typeOfWork: true,
              constructionType: true,
              hiringCompany: true,
              projectName: true,
              identifier: true,
              addressDescription: true,
              block: true,
              unit: true,
              zipCode: true,
              province: true,
              map: true,
              projectDescription: true,
              image: true,
            });
            toast.error("Error al crear el proyecto");
          });
      }}
    >
      {({
        isSubmitting,
        setFieldValue,
        values,
        handleChange,
        errors,
        touched,
      }) => (
        <Form>
          <Container
            maxWidth="md"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "2em",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 900,
                marginTop: "3em",
                paddingLeft: "1em",
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid container spacing={2}>
                  {ProjectTextField.map((field) => (
                    <Grid
                      key={field.name}
                      item
                      xs={12}
                      sm={field.name === "addressDescription" ? 12 : 6}
                    >
                      <TextField
                        name={field.name}
                        label={field.label}
                        type={field.type}
                        value={values[field.name]}
                        placeholder={field.placeholder}
                        autoComplete="off"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                        error={
                          touched[field.name] && Boolean(errors[field.name])
                        }
                        helperText={touched[field.name] && errors[field.name]}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    name="typeOfWork"
                    value={values.typeOfWork}
                    onChange={handleChange}
                    label="Tipo de Trabajo"
                    fullWidth
                    variant="outlined"
                    error={touched.typeOfWork && Boolean(errors.typeOfWork)}
                    helperText={touched.typeOfWork && errors.typeOfWork}
                  >
                    <MenuItem value="">Selecciona un tipo</MenuItem>
                    <MenuItem value="construction">Construcción</MenuItem>
                    <MenuItem value="finishings">Repasos</MenuItem>
                    <MenuItem value="installations">
                      Instalación de equipos
                    </MenuItem>
                    <MenuItem value="solarPanels">
                      Instalación de paneles solares
                    </MenuItem>
                    <MenuItem value="other">Otra</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    name="constructionType"
                    value={values.constructionType}
                    onChange={handleChange}
                    label="Tipo de Construcción"
                    fullWidth
                    variant="outlined"
                    error={
                      touched.constructionType &&
                      Boolean(errors.constructionType)
                    }
                    helperText={
                      touched.constructionType && errors.constructionType
                    }
                  >
                    <MenuItem value="">Selecciona un tipo</MenuItem>
                    <MenuItem value="chalet">Chalet</MenuItem>
                    <MenuItem value="apartment">Piso</MenuItem>
                    <MenuItem value="rural">Rural</MenuItem>
                    <MenuItem value="other">Otra</MenuItem>
                  </TextField>
                </Grid>

                <Grid container spacing={2} marginTop={3}>
                  {ProjectTextField2.map((field) => (
                    <Grid
                      key={field.name}
                      item
                      xs={12}
                      sm={
                        field.name === "projectDescription" ||
                        field.name === "createTask"
                          ? 12
                          : 6
                      }
                    >
                      <TextField
                        name={field.name}
                        type={field.type}
                        value={values[field.name]}
                        label={field.label}
                        placeholder={field.placeholder}
                        autoComplete="off"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                        error={
                          touched[field.name] && Boolean(errors[field.name])
                        }
                        helperText={touched[field.name] && errors[field.name]}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{ marginTop: 2 }}
                  >
                    Agregar Imagen
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFieldValue("image", file);
                        }
                      }}
                    />
                  </Button>
                  {values.image && (
                    <Box
                      component="img"
                      src={URL.createObjectURL(values.image)}
                      alt="Preview"
                      sx={{ marginTop: 2, maxHeight: 200 }}
                    />
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Typography sx={{ textAlign: "left" }} variant="subtitle1">
                    Indica la ubicación{" "}
                  </Typography>
                  <Box id="map" sx={{ height: 400, width: "100%" }}>
                    <MapView setFieldValue={setFieldValue} />
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/my-projects")}
                    sx={{ marginTop: 2 }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ marginTop: 2 }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Crear Proyecto"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Toaster />
        </Form>
      )}
    </Formik>
  );
}

export default CreateNewProject;
