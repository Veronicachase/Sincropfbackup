import { Formik, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialValues } from "../../forms/Proyectos/CrearProyectoInitialValues";
import { NewProjectFormSchema } from "../../forms/Proyectos/NewProjectFormSchema";
import CustomTextField from "../../ui/CustomTextField";
import MapView from "../../components/MapView";
import CheckboxC from "../../components/CheckboxC";
import { Grid, Box, Typography, Button } from "@mui/material";
import Select from "../../ui/Select";
import "../../assets/styles/estilosGenerales.css";
import "./createNewProject.css";
import { handleSubmitProject } from "../../api/handlerSubmitProject";
import {
  ProjectTextField,
  ProjectTextField2,
} from "../../configs/projectTextField";

function CreateNewProject() {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

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
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={NewProjectFormSchema}
        onSubmit={(values, actions) => {
          console.log("Formulario enviado", values);
          handleSubmitProject(values)
            .then(() => {
              actions.setSubmitting(false);
              actions.resetForm();
              alert("Proyecto creado correctamente");
              navigate("/my-projects");
            })
            .catch((error) => {
              console.error("Error en el proceso: ", error);
              actions.setSubmitting(false);
            });
        }}
      >
        {/* eslint-disable-next-line no-unused-vars*/}
        {({ isSubmitting, setFieldValue, values, errors }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                width: "90%",
                margin: "auto",
                paddingTop: "3em",
                boxShadow: "shadow-custom",
                color: "#021F59",
              }}
            >
              <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="space-around"
              >
                <Grid
                  container
                  spacing={2}
                  marginTop={3}
                  justifyContent={"center"}
                  margin={"auto"}
                >
                  {ProjectTextField.map((field) => {
                    const gridSize =
                      field.name === "addressDrescription" ? 12 : 6;

                    return (
                      <Grid key={field.name} item xs={12} sm={gridSize}>
                        <CustomTextField
                          name={field.name}
                          label={field.label}
                          type={field.type}
                          value={values[field.name]}
                          placeholder={field.placeholder}
                          autoComplete="off"
                          sx={{
                            backgroundColor: "#edf5f4",
                            borderRadius: "10px",
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                border: "none",
                              },
                              "&:hover fieldset": {
                                border: "none",
                              },
                              "&.Mui-focused fieldset": {
                                border: "none",
                              },
                            },
                            "& .MuiInputBase-input::placeholder": {
                              color: "rgba(0, 0, 0, 0.6)",
                            },
                          }}
                          InputLabelProps={{
                            className: "my-custom-label",
                            sx: {
                              right: 0,
                              fontSize: "0.875rem",
                            },
                          }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>

                <Grid item xs={12}>
                  <div id="map" style={{ height: "400px", width: "100%" }}>
                    <MapView setFieldValue={setFieldValue} />
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Select
                    name="typeOfWork"
                    value={values.typeOfWork}
                    onChange={(event) =>
                      setFieldValue("typeOfWork", event.target.value)
                    }
                    label="Tipo de Trabajo"
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="construction">Construcción</option>
                    <option value="finishings">Repasos</option>
                    <option value="installations">
                      Instalación de equipos
                    </option>
                    <option value="pool">Piscinas</option>
                    <option value="SolarPanels">
                      Instalación de paneles solares
                    </option>
                    <option value="otra">Otra</option>
                  </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Select
                    name="constructionType"
                    value={values.constructionType}
                    onChange={(event) =>
                      setFieldValue("constructionType", event.target.value)
                    }
                    label="Tipo de Construcción"
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="chalet">Chalet</option>
                    <option value="apartment">Piso</option>
                    <option value="rural">Rural</option>
                    <option value="other">Otra</option>
                  </Select>
                </Grid>

                <Grid container spacing={2} marginTop={3} margin={"auto"}>
                  {ProjectTextField2.map((field) => {
                    const gridSize =
                      field.name === "projectDescription" ||
                      field.name === "createTask"
                        ? 12
                        : 6;

                    return (
                      <Grid key={field.name} item xs={12} sm={gridSize}>
                        <CustomTextField
                          name={field.name}
                          type={field.type}
                          value={values[field.name]}
                          label={field.label}
                          placeholder={field.placeholder}
                          autoComplete="off"
                          sx={{
                            backgroundColor: "#edf5f4",
                            borderRadius: "10px",
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                border: "none",
                              },
                              "&:hover fieldset": {
                                border: "none",
                              },
                              "&.Mui-focused fieldset": {
                                border: "none",
                              },
                            },
                            "& .MuiInputBase-input::placeholder": {
                              color: "rgba(0, 0, 0, 0.6)",
                            },
                          }}
                          InputLabelProps={{
                            className: "my-custom-label",
                            sx: {
                              right: 0,
                              fontSize: "0.875rem",
                            },
                          }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>

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

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: "#84C7AE",
                      color: "#fff",
                      borderRadius: "10px",
                      marginTop: "2em",
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

                <Grid item xs={8}>
                  <Button
                    sx={{
                      backgroundColor: "#84C7AE",
                      color: "#fff",
                      marginBottom: "2em",
                    }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Crear Proyecto
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {/*<pre>{JSON.stringify({ values, errors }, null, 2)}</pre>    */}
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default CreateNewProject;

// import { Formik, Form } from "formik";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { initialValues } from "../../forms/Proyectos/CrearProyectoInitialValues";
// import { NewProjectFormSchema } from "../../forms/Proyectos/NewProjectFormSchema";
// import CustomTextField from "../../ui/CustomTextField";
// import {
//   ProjectTextField,
//   ProjectTextField2,
// } from "../../configs/projectTextField";
// import MapView from "../../components/MapView";
// import CheckboxC from "../../components/CheckboxC";
// import { Grid, Box, Typography, Button } from "@mui/material";
// import Select from "../../ui/Select";
// import "../../assets/styles/estilosGenerales.css";
// import "./createNewProject.css";
// import { handleSubmitProject } from "../../api/handlerSubmitProject";

// function CreateNewProject() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line no-unused-vars
//   const [file, setFile] = useState("");
//   // eslint-disable-next-line no-unused-vars
//   const [image, setImage] = useState("");

//   function previewFiles(file) {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setImage(reader.result);
//     };
//   }

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFile(file);
//     previewFiles(file);
//   };

//   return (
//     <Box >
//     <Formik
//       initialValues={initialValues}
//       validationSchema={NewProjectFormSchema}
//       onSubmit={(values, actions) => {
//         console.log("Formulario enviado");
//         handleSubmitProject(values)
//           .then(() => {
//             console.log(values);
//             actions.setSubmitting(false);
//             actions.resetForm();
//             alert("Proyecto creado correctamente");
//             navigate("/my-projects");
//           })
//           .catch((error) => {
//             console.error("Error en el proceso: ", error);
//             actions.setSubmitting(false);
//           });
//       }}
//     >
//       {({ isSubmitting, setFieldValue, values, errors }) => (
//         <Form>
//           <Box
//             sx={{
//               display: "flex",
//               width: "90%",
//               margin: "auto",
//               paddingTop:"3em",
//               boxShadow: "shadow-custom",
//               color: "#021F59",
//             }}
//           >
//             <Grid
//               container
//               spacing={4}
//               alignItems="center"
//               justifyContent="space-around"
//             >
//               <Grid
//                 container
//                 spacing={2}
//                 marginTop={3}
//                 justifyContent={"center"}
//                 margin={"auto"}
//               >
//                 {ProjectTextField.map((field) => (
//                   <Grid key={field.name} item xs={6}>
//                     <CustomTextField
//                       name={field.name}
//                       label={field.label}
//                       type={field.type}
//                       value={values[field.name]}
//                       placeholder={field.placeholder}
//                       autoComplete="off"
//                       sx={{
//                         backgroundColor: "#edf5f4",
//                         borderRadius: "10px",
//                         "& .MuiOutlinedInput-root": {
//                           "& fieldset": {
//                             border: "none",
//                           },
//                           "&:hover fieldset": {
//                             border: "none",
//                           },
//                           "&.Mui-focused fieldset": {
//                             border: "none",
//                           },
//                         },
//                       }}
//                       InputLabelProps={{
//                         className: "my-custom-label",
//                       }}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>

//               <Grid item xs={12}>
//                 <div id="map" style={{ height: "400px", width: "100%" }}>
//                   <MapView setFieldValue={setFieldValue} />
//                 </div>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Select
//                   name="typeOfWork"
//                   value={values.typeOfWork}
//                   onChange={(event) =>
//                     setFieldValue("typeOfWork", event.target.value)
//                   }
//                   label="Tipo de Trabajo"
//                 >
//                   <option value="">Selecciona un tipo</option>
//                   <option value="construction">Construcción</option>
//                   <option value="finishings">Repasos</option>
//                   <option value="installations">Instalación de equipos</option>
//                   <option value="pool">Piscinas</option>
//                   <option value="SolarPanels">
//                     Instalación de paneles solares
//                   </option>
//                   <option value="otra">Otra</option>
//                 </Select>
//               </Grid>

//               <Grid item xs={12} sm={5}>
//                 <Select
//                   name="constructionType"
//                   value={values.constructionType}
//                   onChange={(event) =>
//                     setFieldValue("constructionType", event.target.value)
//                   }
//                   label="Tipo de Construcción"
//                 >
//                   <option value="">Selecciona un tipo</option>
//                   <option value="chalet">Chalet</option>
//                   <option value="apartment">Piso</option>
//                   <option value="rural">Rural</option>
//                   <option value="other">Otra</option>
//                 </Select>
//               </Grid>

//               <Grid container spacing={2} marginTop={3} margin={"auto"}>
//                 {ProjectTextField2.map((field) => (
//                   <Grid key={field.name} item xs={12} sm={12} >
//                     <CustomTextField
//                       name={field.name}
//                       type={field.type}
//                       value={values[field.name]}
//                       label={field.label}
//                       placeholder={field.placeholder}
//                       autoComplete="off"
//                       sx={{
//                         backgroundColor: "#edf5f4",
//                         borderRadius: "10px",
//                         "& .MuiOutlinedInput-root": {
//                           "& fieldset": {
//                             border: "none",
//                           },
//                           "&:hover fieldset": {
//                             border: "none",
//                           },
//                           "&.Mui-focused fieldset": {
//                             border: "none",
//                           },
//                         },
//                       }}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>

//               <Grid item xs={12} sm={12}>
//                 <Typography
//                   variant="body"
//                   sx={{
//                     paddingBottom: "1em",
//                     display: "block",
//                     textAlign: "left",
//                   }}
//                 >
//                   Escoger las secciones a trabajar
//                 </Typography>
//                 <CheckboxC setFieldValue={setFieldValue} values={values} />
//               </Grid>

//               <Grid item xs={12}>
//                 <Button
//                   variant="contained"
//                   component="label"
//                   sx={{
//                     backgroundColor: "#84C7AE",
//                     color: "#fff",
//                     borderRadius: "10px",
//                   }}
//                 >
//                   Agregar Imagen
//                   <input type="file" hidden onChange={handleFileChange} />
//                 </Button>
//                 {image && (
//                   <img
//                     src={image}
//                     alt="Preview"
//                     style={{
//                       marginTop: "10px",
//                       maxHeight: "200px",
//                       display: "block",
//                     }}
//                   />
//                 )}
//               </Grid>

//               <Grid item xs={8}>
//                 <Button sx={{backgroundColor:"#84C7AE", color:"#fff", marginBottom:"2em"}} type="submit" disabled={isSubmitting}>
//                   Crear Proyecto
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//           {/* <pre>{JSON.stringify({ values, errors }, null, 2)}</pre>  */}
//         </Form>
//       )}
//     </Formik>
//     </Box>
//   );
// }

// export default CreateNewProject;
