
import { Box, Grid, Select, MenuItem, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { CreateTaskFormSchema } from "../../forms/SectionTasks/CreateTaskFormSchema";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/getProjectById";
import { handleSubmitTask } from "../../api/handleSubmitTask";
import { getEmployees } from "../../api/getEmployees";
import VoiceInput from "../../components/VoiceInput";
import { previewFiles } from "../../utils/previewFiles";

export default function ProjectCreateTask() {
  const { projectId, sectionKey } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [projectData, setProjectData] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  const [finalImages, setFinalImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (projectId) {
        try {
          const projectData = await getProjectById(projectId);
          setProjectData(projectData);
        } catch (error) {
          console.error("Error al obtener los datos del proyecto:", error);
        }
      }

      try {
        const employeeData = await getEmployees();
        console.log(employeeData);
        setEmployees(employeeData);
      } catch (error) {
        console.error("Error al obtener los datos de los trabajadores:", error);
      }
    };

    fetchData();
  }, [projectId]);

  const handleFileUpload = (event, setImages) => {
    const files = event.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        imagesArray.push(reader.result);
        if (imagesArray.length === files.length) {
          setImages(imagesArray);
        }
      };
    }
  };

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Box sx={{ marginTop: "1em" }}>
        <div>
          {projectData.projectName} {projectData.constructionType}{" "}
          {projectData.section}
        </div>
      </Box>
      <Formik
        initialValues={{
          taskName: "",
          employeeId: "",
          employeeName: "",
          taskDescription: "",
          projectId: projectId,
          sectionKey: projectData ? projectData.section : "",
          startDate: "",
          endDate: "",
          status: "noIniciado",
          pdf: [],
          prevImages: [],
          finalImages: [],
        }}
        validationSchema={CreateTaskFormSchema}
        onSubmit={async (values, actions) => {
          values.prevImages = prevImages;
          values.finalImages = finalImages;
          console.log("Values", values);
          try {
            await handleSubmitTask(values, sectionKey);
            navigate(-1);
          } catch (error) {
            console.error(
              "Error durante el proceso de creación de tarea en projectCreateTask: ",
              error
            );
            actions.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Box
              sx={{
                maxWidth: 800,
                margin: "2em auto",
                backgroundColor: "#EDF5F4",
                padding: "2em",
                display: "flex",
                borderRadius: "10px",
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Field
                    sx={{ backgroundColor: "#fff" }}
                    as={TextField}
                    name="taskName"
                    label="Nombre de la tarea"
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={Select}
                    name="employeeId"
                    sx={{ backgroundColor: "#fff", marginTop: ".5em" }}
                    fullWidth
                    displayEmpty
                    onChange={(event) => {
                      const selectedEmployeeId = event.target.value;
                      const selectedEmployee = employees.find(
                        (employee) => employee.employeeId === selectedEmployeeId
                      );
                      const selectedEmployeeName = selectedEmployee
                        ? selectedEmployee.name
                        : "";
                      setFieldValue("employeeId", selectedEmployeeId);
                      setFieldValue("employeeName", selectedEmployeeName);
                    }}
                  >
                    <MenuItem value="">
                      <em>Selecciona a un trabajador</em>
                    </MenuItem>
                    {employees.map((employee) => (
                      <MenuItem
                        key={employee.employeeId}
                        value={employee.employeeId}
                      >
                        {employee.name}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    sx={{ backgroundColor: "#fff", marginTop: ".5em" }}
                    as={TextField}
                    name="taskDescription"
                    label="Descripción de la tarea"
                    multiline
                    fullWidth
                    InputProps={{
                      endAdornment: <VoiceInput name="taskDescription" />,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    sx={{
                      backgroundColor: "#fff",
                      marginTop: "2em",
                      marginBottom: "2em",
                    }}
                    as={TextField}
                    name="startDate"
                    label="Fecha de inicio"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    sx={{
                      backgroundColor: "#fff",
                      marginTop: "2em",
                      marginBottom: "2em",
                    }}
                    as={TextField}
                    name="endDate"
                    label="Fecha de entrega"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    name="prevImages"
                    onChange={(e) => handleFileUpload(e, setPrevImages)}
                    multiple
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    name="finalImages"
                    onChange={(e) => handleFileUpload(e, setFinalImages)}
                    multiple
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      marginTop: "2em",
                    }}
                  >
                    Crear Tarea
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}



// import { Box, Grid, Select, MenuItem, TextField, Button } from "@mui/material";
// import { Formik, Form, Field } from "formik";
// import { CreateTaskFormSchema } from "../../forms/SectionTasks/CreateTaskFormSchema";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getProjectById } from "../../api/getProjectById";
// import { handleSubmitTask } from "../../api/handleSubmitTask";
// import { getEmployees } from "../../api/getEmployees";
// import VoiceInput from "../../components/VoiceInput";
// import { previewFiles } from "../../utils/previewFiles";


// export default function ProjectCreateTask() {
//   const { projectId, sectionKey } = useParams();
//   const navigate = useNavigate();
//   const [employees, setEmployees] = useState([]);
//   const [projectData, setProjectData] = useState(null);
//   const [file, setFile] = useState("");
//   const [image, setImage] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       if (projectId) {
//         try {
//           const projectData = await getProjectById(projectId);
//           setProjectData(projectData);
//         } catch (error) {
//           console.error("Error al obtener los datos del proyecto:", error);
//         }
//       }

//       try {
//         const employeeData = await getEmployees();
//         console.log(employeeData);
//         setEmployees(employeeData);
//       } catch (error) {
//         console.error("Error al obtener los datos de los trabajadores:", error);
//       }
//     };

//     fetchData();
//   }, [projectId]);

//   const handleChange = (e) => {
//     const file = e.target.files[0];
//     setFile(file);
//     previewFiles(file, setImage);
//   };

//   if (!projectData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Box>
//       <Box sx={{ marginTop: "1em" }}>
//         <div>
//           {projectData.projectName} {projectData.constructionType}{" "}
//           {projectData.section}
//         </div>
//       </Box>
//       <Formik
//         initialValues={{
//           taskName: "",
//           employeeId: "",
//           employeeName: "",
//           taskDescription: "",
//           projectId: projectId,
//           sectionKey: projectData ? projectData.section : "",
//           startDate: "",
//           endDate: "",
//           status: "noIniciado",
//           pdf: [],
//           prevImages: [],
//           finalImages: [],
//         }}
//         validationSchema={CreateTaskFormSchema}
//         onSubmit={async (values, actions) => {
//           console.log(image);
//           values.prevImages = image;
//           console.log("Values", values);
//           try {
//             await handleSubmitTask(values, sectionKey);
//             navigate(-1);
//           } catch (error) {
//             console.error(
//               "Error durante el proceso de creación de tarea en projectCreateTask: ",
//               error
//             );
//             actions.setSubmitting(false);
//           }
//         }}
//       >
//         {({ isSubmitting, setFieldValue }) => (
//           <Form>
//             <Box
//               sx={{
//                 maxWidth: 800,
//                 margin: "2em auto",
//                 backgroundColor: "#EDF5F4",
//                 padding: "2em",
//                 display: "flex",
//                 borderRadius: "10px",
                
//               }}
//             >
             
//               <Grid container spacing={1}>
//                 <Grid item xs={12}>
//                   <Field
//                     sx={{ backgroundColor: "#fff" }}
//                     as={TextField}
//                     name="taskName"
//                     label="Nombre de la tarea"
//                     fullWidth
//                     required
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Field
//                     as={Select}
//                     name="employeeId"
//                     sx={{ backgroundColor: "#fff" , marginTop:".5em"}}
//                     fullWidth
//                     displayEmpty
//                     onChange={(event) => {
//                       const selectedEmployeeId = event.target.value;
//                       const selectedEmployee = employees.find(
//                         (employee) => employee.employeeId === selectedEmployeeId
//                       );
//                       const selectedEmployeeName = selectedEmployee
//                         ? selectedEmployee.name
//                         : "";
//                       setFieldValue("employeeId", selectedEmployeeId);
//                       setFieldValue("employeeName", selectedEmployeeName);
//                     }}
//                   >
//                     <MenuItem value="">
//                       <em>Selecciona a un trabajador</em>
//                     </MenuItem>
//                     {employees.map((employee) => (
//                       <MenuItem
//                         key={employee.employeeId}
//                         value={employee.employeeId}
//                       >
//                         {employee.name}
//                       </MenuItem>
//                     ))}
//                   </Field>
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Field
//                     sx={{ backgroundColor: "#fff" , marginTop:".5em" }}
//                     as={TextField}
//                     name="taskDescription"
//                     label="Descripción de la tarea"
//                     multiline
//                     fullWidth
//                     InputProps={{
//                       endAdornment: <VoiceInput name="taskDescription" />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Field
//                     sx={{ backgroundColor: "#fff" , marginTop:"2em", marginBottom:"2em"  }}
//                     as={TextField}
//                     name="startDate"
//                     label="Fecha de inicio"
//                     type="date"
//                     fullWidth
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Field
//                     sx={{ backgroundColor: "#fff", marginTop:"2em", marginBottom:"2em" }}
//                     as={TextField}
//                     name="endDate"
//                     label="Fecha de entrega"
//                     type="date"
//                     fullWidth
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <input
//                     type="file"
//                     name="prevImages"
//                     onChange={(e) => {
//                       handleChange(e);
//                     }}
//                     multiple
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button
//                     type="submit"
//                     disabled={isSubmitting}
//                     sx={{
//                       backgroundColor: "#1976d2",
//                       color: "#fff",
//                       marginTop: "2em",
//                     }}
//                   >
//                     Crear Tarea
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Form>
//         )}
//       </Formik>
//     </Box>
//   );
// }
