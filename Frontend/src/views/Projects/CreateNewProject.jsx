
// falta centrar el mapa y los select


import { Formik, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialValues } from "../../forms/Proyectos/CrearProyectoInitialValues";
import { NewProjectFormSchema } from "../../forms/Proyectos/NewProjectFormSchema";
import MapView from "../../components/MapView";
import { Grid, Box, Button, MenuItem, Typography, Container, TextField } from "@mui/material";
import { handleSubmitProject } from "../../api/handlerSubmitProject";
import toast, { Toaster } from 'react-hot-toast';
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

  const handleSectionChange = (setFieldValue, field, value) => {
    setFieldValue(`sections.${field}`, value);
  };

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
        // aqui debe transformar secciones de un objeto a un array si quiero agregar una sección 
        const sectionsArray = Object.keys(values.sections).filter(key => values.sections[key]);
        const dataToSubmit = { ...values, sections: sectionsArray };

        console.log("Formulario enviado", dataToSubmit);
        handleSubmitProject(dataToSubmit)
          .then(() => {
            actions.setSubmitting(false);
            actions.resetForm();
            toast.success('Proyecto creado correctamente!');
            navigate("/my-projects");
          })
          .catch((error) => {
            console.error("Error en el proceso: ", error);
            actions.setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop:"2em" }}>
            <Box sx={{ width: "100%", maxWidth: 900, marginTop: "3em", paddingLeft: "1em" }}>
              <Grid container spacing={3} alignItems="center">
                <Grid container spacing={2}>
                  {ProjectTextField.map((field) => (
                    <Grid key={field.name} item xs={12} sm={field.name === "addressDrescription" ? 12 : 6}>
                      <TextField
                        name={field.name}
                        label={field.label}
                        type={field.type}
                        value={values[field.name]}
                        placeholder={field.placeholder}
                        autoComplete="off"
                        fullWidth
                        variant="outlined"
                        onChange={(event) => setFieldValue(field.name, event.target.value)}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    name="typeOfWork"
                    value={values.typeOfWork}
                    onChange={(event) => setFieldValue("typeOfWork", event.target.value)}
                    label="Tipo de Trabajo"
                    fullWidth
                    variant="outlined"
                  >
                    <MenuItem value="">Selecciona un tipo</MenuItem>
                    <MenuItem value="construction">Construcción</MenuItem>
                    <MenuItem value="finishings">Repasos</MenuItem>
                    <MenuItem value="installations">Instalación de equipos</MenuItem>
                    <MenuItem value="pool">Piscinas</MenuItem>
                    <MenuItem value="SolarPanels">Instalación de paneles solares</MenuItem>
                    <MenuItem value="other">Otra</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    name="constructionType"
                    value={values.constructionType}
                    onChange={(event) => setFieldValue("constructionType", event.target.value)}
                    label="Tipo de Construcción"
                    fullWidth
                    variant="outlined"
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
                    <Grid key={field.name} item xs={12} sm={field.name === "projectDescription" || field.name === "createTask" ? 12 : 6}>
                      <TextField
                        name={field.name}
                        type={field.type}
                        value={values[field.name]}
                        label={field.label}
                        placeholder={field.placeholder}
                        autoComplete="off"
                        fullWidth
                        variant="outlined"
                        onChange={(event) => setFieldValue(field.name, event.target.value)}
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
                      src={image}ss
                      alt="Preview"
                      sx={{ marginTop: 2, maxHeight: 200 }}
                    />
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Typography sx={{ textAlign: "left" }} variant="subtitle1">Indica la ubicación </Typography>
                  <Box id="map" sx={{ height: 400, width: "100%"}}>
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
          </Container>
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
// import { Grid, Box, Button, MenuItem, Typography, Container } from "@mui/material";
// import Select from "../../ui/Select";
// import { handleSubmitProject } from "../../api/handlerSubmitProject";
// import toast, { Toaster } from 'react-hot-toast';
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
//     <Formik
//       initialValues={initialValues}
//       validationSchema={NewProjectFormSchema}
//       onSubmit={(values, actions) => {
//         console.log("Formulario enviado", values);
//         handleSubmitProject({ ...values, sections: values.sections })
//           .then(() => {
//             actions.setSubmitting(false);
//             actions.resetForm();
//             toast.success('Proyecto creado correctamente!')
            
//             navigate("/my-projects");
//           })
//           .catch((error) => {
//             console.error("Error en el proceso: ", error);
//             actions.setSubmitting(false);
//           });
//       }}
//     >
//       {({ isSubmitting, setFieldValue, values }) => (
//         <Form>
//           <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",  }}>
//             <Box sx={{ width: "100%", maxWidth: 900, marginTop: "3em", paddingLeft:"1em" }}>
//               <Grid container spacing={3} alignItems="center">
//                 <Grid container spacing={2}>
//                   {ProjectTextField.map((field) => (
//                     <Grid key={field.name} item xs={12} sm={field.name === "addressDrescription" ? 12 : 6}>
//                       <CustomTextField
                      
//                         name={field.name}
//                         label={field.label}
//                         type={field.type}
//                         value={values[field.name]}
//                         placeholder={field.placeholder}
//                         autoComplete="off"
                        
//                       />
//                     </Grid>
//                   ))}
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Select
//                     name="typeOfWork"
//                     value={values.typeOfWork}
//                     onChange={(event) => setFieldValue("typeOfWork", event.target.value)}
//                     label="Tipo de Trabajo"
//                     fullWidth
//                     InputLabelProps={{ style: { textAlign: 'left' } }}
//                   >
//                     <MenuItem value="">Selecciona un tipo</MenuItem>
//                     <MenuItem value="construction">Construcción</MenuItem>
//                     <MenuItem value="finishings">Repasos</MenuItem>
//                     <MenuItem value="installations">Instalación de equipos</MenuItem>
//                     <MenuItem value="pool">Piscinas</MenuItem>
//                     <MenuItem value="SolarPanels">Instalación de paneles solares</MenuItem>
//                     <MenuItem value="otra">Otra</MenuItem>
//                   </Select>
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Select
//                     name="constructionType"
//                     value={values.constructionType}
//                     onChange={(event) => setFieldValue("constructionType", event.target.value)}
//                     label="Tipo de Construcción"
//                     fullWidth
//                     InputLabelProps={{ style: { textAlign: 'left' } }}
//                   >
//                     <MenuItem value="">Selecciona un tipo</MenuItem>
//                     <MenuItem value="chalet">Chalet</MenuItem>
//                     <MenuItem value="apartment">Piso</MenuItem>
//                     <MenuItem value="rural">Rural</MenuItem>
//                     <MenuItem value="other">Otra</MenuItem>
//                   </Select>
//                 </Grid>

//                 <Grid container spacing={2} marginTop={3}>
//                   {ProjectTextField2.map((field) => (
//                     <Grid key={field.name} item xs={12} sm={field.name === "projectDescription" || field.name === "createTask" ? 12 : 6}>
//                       <CustomTextField
//                         name={field.name}
//                         type={field.type}
//                         value={values[field.name]}
//                         label={field.label}
//                         placeholder={field.placeholder}
//                         autoComplete="off"
//                         InputLabelProps={{ style: { textAlign: 'left' } }}
//                         fullWidth
//                       />
//                     </Grid>
//                   ))}
//                 </Grid>

//                 <Grid item xs={12} sx={{ textAlign: "center" }}>
//                   <Button variant="outlined" component="label" sx={{ marginTop: 2 }}>
//                     Agregar Imagen
//                     <input type="file" hidden onChange={handleFileChange} />
//                   </Button>
//                   {image && (
//                     <Box
//                       component="img"
//                       src={image}
//                       alt="Preview"
//                       sx={{ marginTop: 2, maxHeight: 200 }}
//                     />
//                   )}
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Typography sx={{ textAlign: "left" }} variant="subtitle1">Indica la ubicación </Typography>
//                   <Box id="map" sx={{ height: 400, width: "100%" }}>
//                     <MapView setFieldValue={setFieldValue} />
//                   </Box>
//                 </Grid>

//                 <Grid item xs={12} sx={{ textAlign: "center", display: "flex", justifyContent: "center", gap: 8 }}>
//                   <Button
//                     variant="outlined"
//                     onClick={() => navigate("/my-projects")}
//                     sx={{ marginTop: 2 }}
//                   >
//                     Cancelar
//                   </Button>
//                   <Button
//                     variant="contained"
//                     type="submit"
//                     disabled={isSubmitting}
//                     sx={{ marginTop: 2 }}
//                   >
//                     Crear Proyecto
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Container>
//         </Form>
//       )}
//     </Formik>
//   );
// }

// export default CreateNewProject;



