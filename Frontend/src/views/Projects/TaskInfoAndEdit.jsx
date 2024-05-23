
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Typography, TextField, Grid, Select, MenuItem } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { CreateTaskFormSchema } from "../../forms/SectionTasks/CreateTaskFormSchema";
import CreatePDFButton from "../../components/CreatePDFButton";
import { getTaskById } from "../../api/getTaskById";
import { updateTaskById } from "../../api/updateTaskById";
import IconColors from "../../components/IconColors";
import { getEmployees } from "../../api/getEmployees";

export default function TaskInfoAndEdit() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [imageUrls, setImageUrls] = useState({ prevImages: [], finalImages: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskData = await getTaskById(taskId);
        setTask(taskData);
        const employeesData = await getEmployees();
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error al obtener la tarea o empleados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [taskId]);

  const handleSubmit = async (values, actions) => {
    const formData = new FormData();
    

    Object.keys(values).forEach(key => {
      if (key === 'prevImages' || key === 'finalImages' || key === 'pdf') {
        values[key].forEach(file => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      await updateTaskById(taskId, formData);
      alert("Datos actualizados");
    } catch (error) {
      alert("Error al editar. Por favor, intenta de nuevo.");
      console.error("Error en el envío del formulario:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTaskById(taskId, { status: newStatus });
      setTask({ ...task, status: newStatus });
      console.log("Estado actualizado a:", newStatus);
      alert(`Estado actualizado a: ${newStatus}`);
    } catch (error) {
      alert("Error al actualizar el estado. Por favor, intenta de nuevo.");
      console.error(error);
    }
  };

  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setImageUrls((prev) => ({
      ...prev,
      [type]: urls
    }));
  };

  if (loading) return <p>Cargando...</p>;
  if (!task) return <p>No se encontró la tarea</p>;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: "2em", marginTop: "2em" }}>
        <IconColors status={task.status} />
        <Typography variant="body">Editar tarea</Typography>
        <Typography variant="h6">{task.taskName}</Typography>
      </Box>

      <Box>
        <Formik
          initialValues={{
            taskName: task.taskName || "",
            employeeId: task.employeeId || "",
            employeeName: task.employeeName || "",
            projectId: task.projectId || "",
            sectionKey: task.sectionKey || "",
            taskDescription: task.taskDescription || "",
            startDate: task.startDate || "",
            endDate: task.endDate || "",
            pdf: task.pdf||[],
            status: task.status || "noIniciado",
            prevImages: task.prevImages || [],
            finalImages: task.finalImages || []
          }}
          validationSchema={CreateTaskFormSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} sx={{ marginBottom: "2em" }}>
                <Grid item xs={12}>
                  <Field
                    as={Select}
                    name="employeeName"
                    label="Trabajador Asignado"
                    value={values.employeeName}
                    onChange={handleChange}
                    fullWidth
                  >
                    {employees.map((employee) => (
                      <MenuItem key={employee.employeeId} value={employee.name}>
                        {employee.name}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="taskDescription"
                    label="Descripción de la tarea"
                    value={values.taskDescription}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    name="startDate"
                    label="Fecha de inicio"
                    type="date"
                    value={values.startDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    name="endDate"
                    label="Fecha de entrega"
                    type="date"
                    value={values.endDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ marginTop: "2em", marginBottom: "2em" }}>
                <Typography variant="body2">Estado de la tarea</Typography>
                <Button
                  sx={{ backgroundColor: "#F2CB05", margin: "1em" }}
                  variant={task.status === "iniciado" ? "contained" : "outlined"}
                  onClick={() => handleStatusChange("iniciado")}
                >
                  Iniciado
                </Button>
                <Button
                  sx={{ border: "1px solid #fff", color: "#fff" }}
                  variant={task.status === "terminado" ? "contained" : "outlined"}
                  onClick={() => handleStatusChange("terminado")}
                >
                  Terminado
                </Button>
              </Box>

              <Box sx={{ border: "1px solid #ccc", marginBottom: "2em", paddingTop: "2em", paddingBottom: "2em" }}>
                <Typography>Fotos iniciales</Typography>
                <Grid item xs={12}>
                  {values.prevImages && values.prevImages.length > 0 && (
                    <Box>
                      {values.prevImages.map((img, index) => (
                        <img key={index} src={img} alt={`Prev Image ${index}`} style={{ width: "100px", height: "100px", marginRight: "10px" }} />
                      ))}
                    </Box>
                  )}
                  <input
                    type="file"
                    name="prevImages"
                    onChange={(e) => {
                      setFieldValue("prevImages", Array.from(e.currentTarget.files));
                      handleFileChange(e, "prevImages");
                    }}
                    multiple
                  />
                </Grid>
              </Box>

              <Box sx={{ border: "1px solid #ccc", marginBottom: "2em", paddingTop: "2em", paddingBottom: "2em" }}>
                <Typography>Fotos finales</Typography>
                <Grid item xs={12}>
                  {values.finalImages && values.finalImages.length > 0 && (
                    <Box>
                      {values.finalImages.map((img, index) => (
                        <img key={index} src={img} alt={`Final Image ${index}`} style={{ width: "100px", height: "100px", marginRight: "10px" }} />
                      ))}
                    </Box>
                  )}
                  <input
                    type="file"
                    name="finalImages"
                    onChange={(e) => {
                      setFieldValue("finalImages", Array.from(e.currentTarget.files));
                      handleFileChange(e, "finalImages");
                    }}
                    multiple
                  />
                </Grid>
              </Box>

              <Button 
                sx={{ border: "2px solid #000", color: "#000", marginBottom: "2em", marginTop: "2em", marginRight: "1em" }}
                type="submit"
                disabled={isSubmitting}
              >
                Guardar Cambios
              </Button>
              
               <Box> 
              <CreatePDFButton
                content={[
                  { text: `Task Name: ${values.taskName}` },
                  { text: `Description: ${values.taskDescription}` }
                ]}
                imageUrl={imageUrls.prevImages.concat(imageUrls.finalImages)}
              />
              </Box>
            </Form>
            
          )}
        </Formik>
      </Box>
    </Box>
  );
}















// // no me funciona el botón de guardar cambios y el de pdf ni te digo . ver función de pdf de projectEditInfor y copiarla a ver que pasa

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Button, Typography, TextField, Grid, Select, MenuItem } from "@mui/material";
// import { Formik, Form, Field } from "formik";
// import { CreateTaskFormSchema } from "../../forms/SectionTasks/CreateTaskFormSchema";
// import CreatePDFButton from "../../components/CreatePDFButton";
// import { getTaskById } from "../../api/getTaskById";
// import { updateTaskById } from "../../api/updateTaskById";
// import IconColors from "../../components/IconColors";
// import { getEmployees } from "../../api/getEmployees";

// export default function TaskInfoAndEdit() {
//   const { taskId } = useParams();
//   const [task, setTask] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [employees, setEmployees] = useState([]);
//   const [imageUrls, setImageUrls] = useState({ prevImages: [], finalImages: [] })

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const taskData = await getTaskById(taskId);
//         setTask(taskData);
//         const employeesData = await getEmployees();
//         setEmployees(employeesData);
//       } catch (error) {
//         console.error("Error al obtener la tarea o empleados:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [taskId]);

//   const handleSubmit = async (values, actions) => {
//     const formData = new FormData();
// // aqui convierto mi array a json string
// const convertArrayToJson = (array) => {
//   return JSON.stringify(array.map(file => ({
//     name: file.name,
//     type: file.type,
//     size: file.size,
//     lastModified: file.lastModified,
//     url: URL.createObjectURL(file)
//   })));
// };
//     // aquí estoy agregado los valores del formulario al FormData
//     Object.keys(values).forEach(key => {
//       if (key === 'prevImages' || key === 'finalImages' || key === 'pdf') {
//         if (values[key].length > 0) {
//           formData.append(key, convertArrayToJson(values[key]));
//         }
//       } else {
//         formData.append(key, values[key]);
//       }
//     });

//     try {
//       await updateTaskById(taskId, formData);
//       alert("Datos actualizados");
//     } catch (error) {
//       alert("Error al editar. Por favor, intenta de nuevo.");
//       console.error("Error en el envío del formulario:", error);
//     } finally {
//       actions.setSubmitting(false);
//     }
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       await updateTaskById(taskId, { status: newStatus });
//       setTask({ ...task, status: newStatus });
//       console.log("Estado actualizado a:", newStatus);
//       alert(`Estado actualizado a: ${newStatus}`);
//     } catch (error) {
//       alert("Error al actualizar el estado. Por favor, intenta de nuevo.");
//       console.error(error);
//     }
//   };

//   if (loading) return <p>Cargando...</p>;
//   if (!task) return <p>No se encontró la tarea</p>;

//   return (
//     <Box>
//       <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: "2em", marginTop: "2em" }}>
//         <IconColors status={task.status} />
//         <Typography variant="body">Editar tarea</Typography>
//         <Typography variant="h6">{task.taskName}</Typography>
//       </Box>

//       <Box>
//         <Formik
//           initialValues={{
//             taskName: task.taskName || "",
//             employeeId: task.employeeId || "",
//             employeeName: task.employeeName || "",
//             projectId: task.projectId || "",
//             sectionKey: task.sectionKey || "",
//             taskDescription: task.taskDescription || "",
//             startDate: task.startDate || "",
//             endDate: task.endDate || "",
//             pdf: [],
//             status: task.status || "noIniciado",
//             prevImages: task.prevImages || [],  
//             finalImages: task.finalImages || []  
//           }}
//           validationSchema={CreateTaskFormSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ values, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
//             <Form>
//               <Grid container spacing={2} sx={{ marginBottom: "2em" }}>
//                 <Grid item xs={12}>
//                   <Field
//                     as={Select}
//                     name="employeeName"
//                     label="Trabajador Asignado"
//                     value={values.employeeName}
//                     onChange={handleChange}
//                     fullWidth
//                   >
//                     {employees.map((employee) => (
//                       <MenuItem key={employee.employeeId} value={employee.name}>
//                         {employee.name}
//                       </MenuItem>
//                     ))}
//                   </Field>
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Field
//                     as={TextField}
//                     name="taskDescription"
//                     label="Descripción de la tarea"
//                     value={values.taskDescription}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </Grid>

//                 <Grid item xs={6}>
//                   <Field
//                     as={TextField}
//                     name="startDate"
//                     label="Fecha de inicio"
//                     type="date"
//                     value={values.startDate}
//                     onChange={handleChange}
//                     fullWidth
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Field
//                     as={TextField}
//                     name="endDate"
//                     label="Fecha de entrega"
//                     type="date"
//                     value={values.endDate}
//                     onChange={handleChange}
//                     fullWidth
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//               </Grid>

//               <Box sx={{ marginTop: "2em", marginBottom: "2em" }}>
//                 <Typography variant="body2">Estado de la tarea</Typography>
//                 <Button
//                   sx={{ backgroundColor: "#F2CB05", margin: "1em" }}
//                   variant={task.status === "iniciado" ? "contained" : "outlined"}
//                   onClick={() => handleStatusChange("iniciado")}
//                 >
//                   Iniciado
//                 </Button>
//                 <Button
//                   sx={{ border: "1px solid #fff", color: "#fff" }}
//                   variant={task.status === "terminado" ? "contained" : "outlined"}
//                   onClick={() => handleStatusChange("terminado")}
//                 >
//                   Terminado
//                 </Button>
//               </Box>

//               <Box sx={{ border: "1px solid #ccc", marginBottom: "2em", paddingTop: "2em", paddingBottom: "2em" }}>
//                 <Typography>Fotos iniciales</Typography>
//                 <Grid item xs={12}>
//                   {values.prevImages && values.prevImages.length > 0 && (
//                     <Box>
//                       {values.prevImages.map((img, index) => (
//                         <img key={index} src={img} alt={`Prev Image ${index}`} style={{ width: "100px", height: "100px", marginRight: "10px" }} />
//                       ))}
//                     </Box>
//                   )}
//                   <input
//                     type="file"
//                     name="prevImages"
//                     onChange={(e) => setFieldValue("prevImages", Array.from(e.currentTarget.files))}
//                     multiple
//                   />
//                 </Grid>
//               </Box>

//               <Box sx={{ border: "1px solid #ccc", marginBottom: "2em", paddingTop: "2em", paddingBottom: "2em" }}>
//                 <Typography>Fotos finales</Typography>
//                 <Grid item xs={12}>
//                   {values.finalImages && values.finalImages.length > 0 && (
//                     <Box>
//                       {values.finalImages.map((img, index) => (
//                         <img key={index} src={img} alt={`Final Image ${index}`} style={{ width: "100px", height: "100px", marginRight: "10px" }} />
//                       ))}
//                     </Box>
//                   )}
//                   <input
//                     type="file"
//                     name="finalImages"
//                     onChange={(e) => setFieldValue("finalImages", Array.from(e.currentTarget.files))}
//                     multiple
//                   />
//                 </Grid>
//               </Box>

//               <Button 
//                 sx={{ border: " 2px solid #fff", color: "#fff", marginBottom: "2em", marginTop: "2em", marginRight: "1em" }}
//                 type="submit"
//                 disabled={isSubmitting}
//               >
//                 Guardar Cambios
//               </Button>
//               <Box>  
//               <CreatePDFButton
//                 content={[
//                   { text: `Project Name: ${values.taskName}` },
//                   { text: `Construction Type: ${values.taskDescription}` },
                 
                  
//                 ]}
//                 imageUrl={imageUrls.prevImages.concat(imageUrls.prevImages)}
//               />
//               </Box>

             
//             </Form>
//           )}
//         </Formik>
//       </Box>
//     </Box>
//   );
// }













