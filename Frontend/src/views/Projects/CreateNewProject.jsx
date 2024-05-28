import { Formik, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialValues } from "../../forms/Proyectos/CrearProyectoInitialValues";
import { NewProjectFormSchema } from "../../forms/Proyectos/NewProjectFormSchema";
import CustomTextField from "../../ui/CustomTextField";
import MapView from "../../components/MapView";
import { Grid, Box, Button, MenuItem, Typography } from "@mui/material";
import Select from "../../ui/Select";
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
    <Formik
      initialValues={initialValues}
      validationSchema={NewProjectFormSchema}
      onSubmit={(values, actions) => {
        console.log("Formulario enviado", values);
        handleSubmitProject({ ...values, sections: values.sections })
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
      {({ isSubmitting, setFieldValue, values, errors }) => (
        <Form>
          <Box sx={{ width: "90%", margin: "auto", padding: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid container spacing={2} justifyContent="center">
                {ProjectTextField.map((field) => (
                  <Grid key={field.name} item xs={12} sm={field.name === "addressDrescription" ? 12 : 6}>
                    <CustomTextField
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      value={values[field.name]}
                      placeholder={field.placeholder}
                      autoComplete="off"
                      InputLabelProps={field.name === "projectName" ? { style: { color: "blue" } } : {}}
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Select
                  name="typeOfWork"
                  value={values.typeOfWork}
                  onChange={(event) => setFieldValue("typeOfWork", event.target.value)}
                  label="Tipo de Trabajo"
                >
                  <MenuItem value="">Selecciona un tipo</MenuItem>
                  <MenuItem value="construction">Construcción</MenuItem>
                  <MenuItem value="finishings">Repasos</MenuItem>
                  <MenuItem value="installations">Instalación de equipos</MenuItem>
                  <MenuItem value="pool">Piscinas</MenuItem>
                  <MenuItem value="SolarPanels">Instalación de paneles solares</MenuItem>
                  <MenuItem value="otra">Otra</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Select
                  name="constructionType"
                  value={values.constructionType}
                  onChange={(event) => setFieldValue("constructionType", event.target.value)}
                  label="Tipo de Construcción"
                >
                  <MenuItem value="">Selecciona un tipo</MenuItem>
                  <MenuItem value="chalet">Chalet</MenuItem>
                  <MenuItem value="apartment">Piso</MenuItem>
                  <MenuItem value="rural">Rural</MenuItem>
                  <MenuItem value="other">Otra</MenuItem>
                </Select>
              </Grid>

              <Grid container spacing={2} marginTop={3}>
                {ProjectTextField2.map((field) => (
                  <Grid key={field.name} item xs={12} sm={field.name === "projectDescription" || field.name === "createTask" ? 12 : 6}>
                    <CustomTextField
                      name={field.name}
                      type={field.type}
                      value={values[field.name]}
                      label={field.label}
                      placeholder={field.placeholder}
                      autoComplete="off"
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button variant="outlined" component="label" sx={{ marginTop: 2 }}>
                Agregar Imagen
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              {image && (
                <Box
                  component="img"
                  src={image}
                  alt="Preview"
                  sx={{ marginTop: 2, maxHeight: 200 }}
                />
              )}
            </Grid>

              <Grid item xs={12}>
                <Box id="map" sx={{ height: 400, width: "100%" }}>
                  <MapView setFieldValue={setFieldValue} />
                </Box>
              </Grid>

              

             

              <Grid item xs={12} sx={{ textAlign: "center", display: "flex", justifyContent: "center", gap: 8 }}>
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
                  Crear Proyecto
                </Button>
                
              </Grid>
            </Grid>
          </Box>
      
        </Form>
      )}
    </Formik>
  );
}

export default CreateNewProject;





// import { Formik, Form } from "formik";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { initialValues } from "../../forms/Proyectos/CrearProyectoInitialValues";
// import { NewProjectFormSchema } from "../../forms/Proyectos/NewProjectFormSchema";
// import CustomTextField from "../../ui/CustomTextField";
// import MapView from "../../components/MapView";
// import CheckboxC from "../../components/CheckboxC";
// import { Grid, Box, Typography, Button } from "@mui/material";
// import Select from "../../ui/Select";
// import "../../assets/styles/estilosGenerales.css";
// import "./createNewProject.css";
// import { handleSubmitProject } from "../../api/handlerSubmitProject";
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import {
//   ProjectTextField,
//   ProjectTextField2,
// } from "../../configs/projectTextField";

// function CreateNewProject() {
//   const navigate = useNavigate();
//   const [file, setFile] = useState("");
//   const [image, setImage] = useState("");
//   const [newSection, setNewSection] = useState({});

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
//     <Box>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={NewProjectFormSchema}
//         onSubmit={(values, actions) => {
//           console.log("Formulario enviado", values);
//           handleSubmitProject({ ...values, sections: values.sections }) // Mantener secciones como objeto
//             .then(() => {
//               actions.setSubmitting(false);
//               actions.resetForm();
//               alert("Proyecto creado correctamente");
//               navigate("/my-projects");
//             })
//             .catch((error) => {
//               console.error("Error en el proceso: ", error);
//               actions.setSubmitting(false);
//             });
//         }}
//       >
//         {/* eslint-disable-next-line no-unused-vars*/}
//         {({ isSubmitting, setFieldValue, values, errors }) => (
//           <Form>
//             <Box
//               sx={{
//                 display: "flex",
//                 width: "90%",
//                 margin: "auto",
//                 padding: "3em",
//                 boxShadow: "shadow-custom",
//                 color: "#021F59",
//                 backgroundColor: "#EDF5F4",
//                 borderRadius: "10px",
//               }}
//             >
//               <Grid
//                 container
//                 spacing={4}
//                 alignItems="center"
//                 justifyContent="space-around"
//               >
//                 <Grid
//                   container
//                   spacing={2}
//                   marginTop={3}
//                   justifyContent={"center"}
//                   margin={"auto"}
//                 >
//                   {ProjectTextField.map((field) => {
//                     const gridSize =
//                       field.name === "addressDrescription" ? 12 : 6;

//                     return (
//                       <Grid key={field.name} item xs={10} sm={gridSize}>
//                         <CustomTextField
//                           name={field.name}
//                           label={field.label}
//                           type={field.type}
//                           value={values[field.name]}
//                           placeholder={field.placeholder}
//                           autoComplete="off"
//                           sx={{
//                             backgroundColor: "#fff",
//                             borderRadius: "10px",
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": {
//                                 border: "none",
//                               },
//                               "&:hover fieldset": {
//                                 border: "none",
//                               },
//                               "&.Mui-focused fieldset": {
//                                 border: "none",
//                               },
//                             },
//                             "& .MuiInputBase-input::placeholder": {
//                               color: "rgba(0, 0, 0, 0.6)",
//                             },
//                           }}
//                           InputLabelProps={{
//                             className: "my-custom-label",
//                             sx: {
//                               right: 0,
//                               fontSize: "0.875rem",
//                             },
//                           }}
//                         />
//                       </Grid>
//                     );
//                   })}
//                 </Grid>

//                 <Grid item xs={12}>
//                   <div id="map" style={{ height: "400px", width: "100%" }}>
//                     <MapView setFieldValue={setFieldValue} />
//                   </div>
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Select
//                     name="typeOfWork"
//                     value={values.typeOfWork}
//                     onChange={(event) =>
//                       setFieldValue("typeOfWork", event.target.value)
//                     }
//                     label="Tipo de Trabajo"
//                   >
//                     <option value="">Selecciona un tipo</option>
//                     <option value="construction">Construcción</option>
//                     <option value="finishings">Repasos</option>
//                     <option value="installations">
//                       Instalación de equipos
//                     </option>
//                     <option value="pool">Piscinas</option>
//                     <option value="SolarPanels">
//                       Instalación de paneles solares
//                     </option>
//                     <option value="otra">Otra</option>
//                   </Select>
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Select
//                     name="constructionType"
//                     value={values.constructionType}
//                     onChange={(event) =>
//                       setFieldValue("constructionType", event.target.value)
//                     }
//                     label="Tipo de Construcción"
//                   >
//                     <option value="">Selecciona un tipo</option>
//                     <option value="chalet">Chalet</option>
//                     <option value="apartment">Piso</option>
//                     <option value="rural">Rural</option>
//                     <option value="other">Otra</option>
//                   </Select>
//                 </Grid>

//                 <Grid container spacing={2} marginTop={3} margin={"auto"}>
//                   {ProjectTextField2.map((field) => {
//                     const gridSize =
//                       field.name === "projectDescription" ||
//                       field.name === "createTask"
//                         ? 12
//                         : 6;

//                     return (
//                       <Grid key={field.name} item xs={12} sm={gridSize}>
//                         <CustomTextField
//                           name={field.name}
//                           type={field.type}
//                           value={values[field.name]}
//                           label={field.label}
//                           placeholder={field.placeholder}
//                           autoComplete="off"
//                           sx={{
//                             backgroundColor: "#fff",
//                             borderRadius: "10px",
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": {
//                                 border: "none",
//                               },
//                               "&:hover fieldset": {
//                                 border: "none",
//                               },
//                               "&.Mui-focused fieldset": {
//                                 border: "none",
//                               },
//                             },
//                             "& .MuiInputBase-input::placeholder": {
//                               color: "rgba(0, 0, 0, 0.6)",
//                             },
//                           }}
//                           InputLabelProps={{
//                             className: "my-custom-label",
//                             sx: {
//                               right: 0,
//                               fontSize: "0.875rem",
//                             },
//                           }}
//                         />
//                       </Grid>
//                     );
//                   })}
//                 </Grid>

                
//                 <Box display={"flex"}>
//                   <Grid item xs={12}>
//                     <Button
//                       variant="contained"
//                       component="label"
//                       sx={{
//                         backgroundColor: "#84C7AE",
//                         color: "#fff",
//                         borderRadius: "10px",
//                       }}
//                     >
//                       Agregar Imagen
//                       <input type="file" hidden onChange={handleFileChange} />
//                     </Button>
//                     {image && (
//                       <img
//                         src={image}
//                         alt="Preview"
//                         style={{
//                           marginTop: "10px",
//                           maxHeight: "200px",
//                           display: "block",
//                         }}
//                       />
//                     )}
//                   </Grid>

//                   <Grid item xs={8}>
//                     <Button
//                       sx={{
//                         backgroundColor: "#84C7AE",
//                         color: "#fff",
//                       }}
//                       type="submit"
//                       disabled={isSubmitting}
//                     >
//                       Crear Proyecto
//                     </Button>
//                   </Grid>
//                 </Box>
//               </Grid>
//             </Box>
//             <pre>{JSON.stringify({ values, errors }, null, 2)}</pre>
//           </Form>
//         )}
//       </Formik>
//     </Box>
//   );
// }

// export default CreateNewProject;



// <Box sx={{backgroundColor:"#fff", display:"flex", justifyContent:"center", marginTop:"2em", marginBottom:"2em", borderRadius:"10px", paddingTop:"2em", paddingBottom:"2em"}}>
                  
                    
//                     <Box display={"flex"} justifyContent={"right"}>
//                       <Typography>Agregar Sección</Typography> 
//                       <AddCircleIcon 
//                         sx={{color:"#84C7AE", fontSize:"45px"}}
//                         onClick={() => {
//                           const newSectionName = prompt("Nombre de la nueva sección");
//                           setFieldValue(`sections.${newSectionName}`, true);
//                         }}
//                       />
//                     </Box>
                 
//                 </Box>










// import { Formik, Form } from "formik";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { initialValues } from "../../forms/Proyectos/CrearProyectoInitialValues";
// import { NewProjectFormSchema } from "../../forms/Proyectos/NewProjectFormSchema";
// import CustomTextField from "../../ui/CustomTextField";
// import MapView from "../../components/MapView";
// import CheckboxC from "../../components/CheckboxC";
// import { Grid, Box, Typography, Button } from "@mui/material";
// import Select from "../../ui/Select";
// import "../../assets/styles/estilosGenerales.css";
// import "./createNewProject.css";
// import { handleSubmitProject } from "../../api/handlerSubmitProject";
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import {
//   ProjectTextField,
//   ProjectTextField2,
// } from "../../configs/projectTextField";

// function CreateNewProject() {
//   const navigate = useNavigate();
//   const [file, setFile] = useState("");
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
//     <Box>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={NewProjectFormSchema}
//         onSubmit={(values, actions) => {
//           console.log("Formulario enviado", values);
//           handleSubmitProject(values)
//             .then(() => {
//               actions.setSubmitting(false);
//               actions.resetForm();
//               alert("Proyecto creado correctamente");
//               navigate("/my-projects");
//             })
//             .catch((error) => {
//               console.error("Error en el proceso: ", error);
//               actions.setSubmitting(false);
//             });
//         }}
//       >
//         {/* eslint-disable-next-line no-unused-vars*/}
//         {({ isSubmitting, setFieldValue, values, errors }) => (
//           <Form>
//             <Box
//               sx={{
//                 display: "flex",
//                 width: "90%",
//                 margin: "auto",
//                 padding: "3em",
//                 boxShadow: "shadow-custom",
//                 color: "#021F59",
//                 backgroundColor: "#EDF5F4",
//                 borderRadius: "10px",
//               }}
//             >
//               <Grid
//                 container
//                 spacing={4}
//                 alignItems="center"
//                 justifyContent="space-around"
//               >
//                 <Grid
//                   container
//                   spacing={2}
//                   marginTop={3}
//                   justifyContent={"center"}
//                   margin={"auto"}
//                 >
//                   {ProjectTextField.map((field) => {
//                     const gridSize =
//                       field.name === "addressDrescription" ? 12 : 6;

//                     return (
//                       <Grid key={field.name} item xs={10} sm={gridSize}>
//                         <CustomTextField
//                           name={field.name}
//                           label={field.label}
//                           type={field.type}
//                           value={values[field.name]}
//                           placeholder={field.placeholder}
//                           autoComplete="off"
//                           sx={{
//                             backgroundColor: "#fff",
//                             borderRadius: "10px",
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": {
//                                 border: "none",
//                               },
//                               "&:hover fieldset": {
//                                 border: "none",
//                               },
//                               "&.Mui-focused fieldset": {
//                                 border: "none",
//                               },
//                             },
//                             "& .MuiInputBase-input::placeholder": {
//                               color: "rgba(0, 0, 0, 0.6)",
//                             },
//                           }}
//                           InputLabelProps={{
//                             className: "my-custom-label",
//                             sx: {
//                               right: 0,
//                               fontSize: "0.875rem",
//                             },
//                           }}
//                         />
//                       </Grid>
//                     );
//                   })}
//                 </Grid>

//                 <Grid item xs={12}>
//                   <div id="map" style={{ height: "400px", width: "100%" }}>
//                     <MapView setFieldValue={setFieldValue} />
//                   </div>
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Select
//                     name="typeOfWork"
//                     value={values.typeOfWork}
//                     onChange={(event) =>
//                       setFieldValue("typeOfWork", event.target.value)
//                     }
//                     label="Tipo de Trabajo"
//                   >
//                     <option value="">Selecciona un tipo</option>
//                     <option value="construction">Construcción</option>
//                     <option value="finishings">Repasos</option>
//                     <option value="installations">
//                       Instalación de equipos
//                     </option>
//                     <option value="pool">Piscinas</option>
//                     <option value="SolarPanels">
//                       Instalación de paneles solares
//                     </option>
//                     <option value="otra">Otra</option>
//                   </Select>
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Select
//                     name="constructionType"
//                     value={values.constructionType}
//                     onChange={(event) =>
//                       setFieldValue("constructionType", event.target.value)
//                     }
//                     label="Tipo de Construcción"
//                   >
//                     <option value="">Selecciona un tipo</option>
//                     <option value="chalet">Chalet</option>
//                     <option value="apartment">Piso</option>
//                     <option value="rural">Rural</option>
//                     <option value="other">Otra</option>
//                   </Select>
//                 </Grid>

//                 <Grid container spacing={2} marginTop={3} margin={"auto"}>
//                   {ProjectTextField2.map((field) => {
//                     const gridSize =
//                       field.name === "projectDescription" ||
//                       field.name === "createTask"
//                         ? 12
//                         : 6;

//                     return (
//                       <Grid key={field.name} item xs={12} sm={gridSize}>
//                         <CustomTextField
//                           name={field.name}
//                           type={field.type}
//                           value={values[field.name]}
//                           label={field.label}
//                           placeholder={field.placeholder}
//                           autoComplete="off"
//                           sx={{
//                             backgroundColor: "#fff",
//                             borderRadius: "10px",
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": {
//                                 border: "none",
//                               },
//                               "&:hover fieldset": {
//                                 border: "none",
//                               },
//                               "&.Mui-focused fieldset": {
//                                 border: "none",
//                               },
//                             },
//                             "& .MuiInputBase-input::placeholder": {
//                               color: "rgba(0, 0, 0, 0.6)",
//                             },
//                           }}
//                           InputLabelProps={{
//                             className: "my-custom-label",
//                             sx: {
//                               right: 0,
//                               fontSize: "0.875rem",
//                             },
//                           }}
//                         />
//                       </Grid>
//                     );
//                   })}
//                 </Grid>

//                 <Box sx={{backgroundColor:"#fff", display:"flex", justifyContent:"center", marginTop:"2em", marginBottom:"2em", borderRadius:"10px", paddingTop:"2em", paddingBottom:"2em"}}>
//                   <Grid item xs={11} sm={10}>
//                     <Typography
//                       variant="body"
//                       sx={{
//                         paddingBottom: "1em",
//                         display: "block",
//                         textAlign: "left",
//                       }}
//                     >
//                       Escoger las secciones a trabajar
//                     </Typography>
//                     <CheckboxC setFieldValue={setFieldValue} values={values} />
//                     <Box display={"flex"} justifyContent={"right"}> <Typography>Agregar Sección</Typography> <AddCircleIcon sx={{color:"#84C7AE",fontSize:"45pxs"}}/></Box>
//                   </Grid>
                
//                   </Box>
//                <Box display={"flex"} > 
//                 <Grid item xs={12}>
//                   <Button
//                     variant="outlined"
//                     component="label"
//                     sx={{
//                       border: " 1px solid #84C7AE",
//                       color: "#98a1b4",
//                       borderRadius: "10px",
                     
//                     }}
//                   >
//                     Agregar Imagen
//                     <input type="file" hidden onChange={handleFileChange} />
//                   </Button>
//                   {image && (
//                     <img
//                       src={image}
//                       alt="Preview"
//                       style={{
//                         marginTop: "10px",
//                         maxHeight: "200px",
//                         display: "block",
//                       }}
//                     />
//                   )}
//                 </Grid>

//                 <Grid item xs={8}>
//                   <Button variant="outlined"
//                     sx={{
//                       border: " 1px solid #84C7AE",
//                       color: "#98a1b4",
                     
//                     }}
//                     type="submit"
//                     disabled={isSubmitting}
//                   >
//                     Crear Proyecto
//                   </Button>
//                 </Grid>
//                 </Box>
//               </Grid>
              

//             </Box>
            
//             {/*<pre>{JSON.stringify({ values, errors }, null, 2)}</pre>    */}
//           </Form>
//         )}
//       </Formik>
//     </Box>
//   );
// }

// export default CreateNewProject;
