import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { initialValues } from "../../forms/Proyectos/CrearProyectoInitialValues";
import { crearProyectoFormSchema } from "../../forms/Proyectos/CrearProyectoFormSchema";
import CustomTextField from "../../ui/CustomTextField";
import {
  ProjectTextField,
  projectTextField2,
} from "../../configs/projectTextField";
import MapView from "../../components/MapView";
import CheckboxC from "../../components/CheckboxC";
import { handleFileUpload } from "../../handlers/handleFileUpload";
import Select from "../../ui/Select";
import "../../assets/styles/estilosGenerales.css";
import "./proyectoNuevo.css";
import MyButton from "../../components/MyButton";
import { Grid, Box } from "@mui/material";

function ProyectoNuevo() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={crearProyectoFormSchema}
      onSubmit={(values, actions) => {
        console.log("Formulario enviado");
        if (values.files && values.files.length > 0) {
          Array.from(values.files).forEach((file) => {
            handleFileUpload(file).then((response) => {
              console.log("Archivo subido", response);
            });
          });
        }
        console.log(values);
        actions.setSubmitting(false);
        actions.resetForm();
        alert("Proyecto creado correctamente");
        navigate("/mis-proyectos");
      }}
    >
      {({ isSubmitting, setFieldValue, values, errors }) => (
        <Form>
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              maxWidth: "800px",
              margin: "2em auto",
              flexDirection: "column",
              boxShadow: "shadow-custom",
              color: "#021F59",
            }}
          >
            <Grid
              container
              spacing={4}
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                container
                spacing={2}
                marginTop={3}
                justifyContent={"center"}
                margin={"auto"}
              >
                {ProjectTextField.map((field) => (
                  <Grid
                    key={field.name}
                    item
                    xs={
                      field.name === "hiringCompany" ||
                      field.name === "identifier" ||
                      field.name === "addressDescription"
                        ? 10
                        : 5
                    }
                  >
                    <CustomTextField
                      name={field.name}
                      type={field.type}
                      value={values[field.name]}
                      placeholder={field.placeholder}
                      autoComplete="off"
                      sx={{ backgroundColor: "#f2faff" }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={10}>
                <div id="map" style={{ height: "400px", width: "100%" }}>
                  <MapView setFieldValue={setFieldValue} />
                </div>
              </Grid>

              <Grid item xs={10} sm={5}>
                <Select
                  name="typeOfWork"
                  value={values.typeOfWork}
                  onChange={event => setFieldValue("typeOfWork", event.target.value)}
                  label="Tipo de Trabajo"
                  sx={{ backgroundColor: "#f2faff" }}
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="construccion">Construcción</option>
                  <option value="repasos">Repasos</option>
                  <option value="instalacionEquipo">
                    Instalación de equipos
                  </option>
                  <option value="piscinas">Piscinas</option>
                  <option value="instPanelesSolares">
                    Instalación de paneles solares
                  </option>
                  <option value="otra">Otra</option>
                </Select>
              </Grid>
              <Grid item xs={10} sm={5}>
                <Select 
                name="constructionType"
                value={values.constructionType}
                onChange={event => setFieldValue("constructionType", event.target.value)}
                label="Tipo de Construcción"
>
                  <option value="">Selecciona un tipo</option>
                  <option value="chalet">Chalet</option>
                  <option value="piso">Piso</option>
                  <option value="otra">Otra</option>
                </Select>
              </Grid>

              <Grid
                container
                spacing={2}
                marginTop={3}
                justifyContent={"center"}
                margin={"auto"}
              >
                {projectTextField2.map((field) => (
                  <Grid key={field.name} item xs={10}>
                    <CustomTextField
                      name={field.name}
                      type={field.type}
                      value={values[field.name]}
                      placeholder={field.placeholder}
                      autoComplete="off"
                      sx={{ backgroundColor: "#f2faff" }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={10} sm={5}>
                <CheckboxC setFieldValue={setFieldValue} values={values} />
              </Grid>

              <Grid item xs={10} sm={10}>
                <input
                  accept="image/*, .pdf"
                  type="file"
                  onChange={(event) => {
                    // eslint-disable-next-line no-unused-vars
                    setFieldValue("files", event.currentTarget.files);
                  }}
                />
              </Grid>

              <Grid item xs={8}>
                <MyButton type="submit" disabled={isSubmitting}>
                  {" "}
                  Crear Proyecto
                </MyButton>
              </Grid>
            </Grid>
          </Box>
          <pre>{JSON.stringify({values,errors}, null,1)}</pre>
        </Form>
      )}
    </Formik>
  );
}

export default ProyectoNuevo;
