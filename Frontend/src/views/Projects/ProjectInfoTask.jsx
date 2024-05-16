import { useState, useEffect } from "react";
import { getProjectById } from "../../api/getProjectById";
import { getTaskBySection } from "../../api/getTaskBySection";
import { getTaskById } from "../../api/getTaskById";
import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import  CreatePDFButton  from "../../components/CreatePDFButton";
import { updateTaskById } from "../../api/updateTaskById"
import IconColors from "../../components/IconColors";

export default function ProjectInfoTask() {
  const { projectId, sectionKey, taskId } = useParams();
  const [project, setProject] = useState(null);
  const [taskStatus, setTaskStatus] = useState("");
  const [task, setTask] = useState(null);

  useEffect(() => {
    alert(taskStatus);
  }, [taskStatus]);

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId).then((data) => {
        setProject(data);
        if (data && data.sections && data.sections[sectionKey]) {
          getTaskBySection(projectId, sectionKey).then(setTask);
        }
      });
    }
  }, [projectId, sectionKey]);

  useEffect(() => {
    if (taskId) {
      getTaskById(taskId).then((taskData) => {
        setTask(taskData);
      });
    }
  }, [projectId, sectionKey, taskId]);

 
  
   const handleSubmit = async (values, actions) => {
   try {
   await updateTaskById(taskId, values);
   alert("Datos actualizados");
   
  
   } catch (error) {
   alert("Error al editar. Por favor, intenta de nuevo.");
      console.error(error);
     } finally {
         actions.setSubmitting(false);
     }
   };


  return (
    <Box>
      <Box>
        <Typography variant="h6">{project.ProjectNama}</Typography>
        <Typography variant="h6">{project.constructionType}</Typography>
        <Typography variant="h6">{project.section[sectionKey]}</Typography>
        <Typography> Mi tarea - editar tarea</Typography>
      </Box>

      <Box>
        <IconColors status={task.status} />
        <Typography>{task.taskName} </Typography>
      </Box>

      <Box>
        <Formik>
          <Form>
            <Field
              as
              TextField
              label="Trabajador Asignado"
              value="EmployeeName"
            >
              {task.employeeName}
            </Field>

            <Field
              as
              TextField
              label="Descrición de la tarea"
              value="taskDescription"
            >
              {task.taskDescription}
            </Field>

            <Box>
              <Typography variant="body2">Estado de la tarea</Typography>

              <Button onClick={() => setTaskStatus("noIniciado")}>
                No Iniciado
              </Button>
              <Button onClick={() => setTaskStatus("iniciado")}>
                Iniciado
              </Button>
              <Button onClick={() => setTaskStatus("terminado")}>
                Terminado
              </Button>
            </Box>

            <Box>
              <Typography variant="">Fotos iniciales</Typography>
            </Box>

            <Box>
              <Typography variant="">Fotos finales</Typography>
            </Box>
          </Form>

          <Button onClick={() => handleSubmit()}>Guardar Cambios</Button>
          <Button onClick={() => CreatePDFButton()}> Crear PDF</Button>
        </Formik>
      </Box>
    </Box>
  );
}

// import  { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Box, Typography, Button, Grid, MenuItem, Select, TextField } from '@mui/material';
// import { Formik, Form, Field } from 'formik';
// import { getProjectById } from '../../api/getProjectById';
// import { getTaskBySection } from '../../api/getTaskBySection';
// import { updateTaskById } from '../../api/updateTaskById';
// import { getEmployees } from '../../api/getEmployees';
// import { NewTaskFormSchema } from '../../forms/SectionTasks/NewTaskFormSchema';

// import CreatePDFButton from "../../components/CreatePDFButton";

// export default function ProjectInfoTask() {
//     const { projectId, sectionKey, taskId, employeeId } = useParams();
//     const [ project, setProject ] = useState(null);
//     const [ task, setTask ] = useState(null);
//     const [ employees, setEmployees ] = useState([]);
//     const [ loading, setLoading ] = useState(true);

//     useEffect(() => {

//         if (employeeId) {
//             getEmployees(employeeId).then(data =>{
//                 setEmployees(data)
//             });
//         }
//     }, [employeeId]);

//     useEffect(() => {
//         if (projectId) {
//             getProjectById(projectId).then(projectData => {
//                 setProject(projectData);
//                 setLoading(false);
//             }).catch(error => {
//                 console.error("Error al cargar datos del proyecto:", error);
//                 setLoading(false);
//             });
//         }
//     }, [projectId]);

//     useEffect(() => {
//         if (sectionKey) {
//             getTaskBySection(projectId, sectionKey).then(taskData => {
//                 console.log(taskData)
//                 setTask(taskData);
//                 setLoading(false);
//             }).catch(error => {
//                 console.error("Error al cargar datos de la tarea:", error);
//                 setLoading(false);
//             });
//         }
//     }, [projectId, sectionKey, taskId]);

//     if (loading) return <p>Cargando...</p>;
//     if (!project || !task) return <p>No se encontró el proyecto o la tarea</p>;

//     const handleSubmit = async (values, actions) => {
//         try {
//             await updateTaskById(taskId, values);
//             alert("Datos actualizados");
//             fetchProjectAndTask();

//         } catch (error) {
//             alert("Error al editar. Por favor, intenta de nuevo.");
//             console.error(error);
//         } finally {
//             actions.setSubmitting(false);
//         }
//     };
//     const fetchProjectAndTask = async () => {
//         if (projectId) {
//             try {
//                 const projectData = await getProjectById(projectId);
//                 setProject(projectData);
//             } catch (error) {
//                 console.error("Error al cargar datos del proyecto:", error);
//             }
//         }
//         if (sectionKey) {
//             try {
//                 const taskData = await getTaskBySection(projectId,sectionKey);
//                 setTask(taskData);
//                 alert("La tarea ha sido actualizada, puede regresar o crear un Reporte PDF")
//             } catch (error) {
//                 console.error("Error al cargar datos de la tarea:", error);
//             }
//         }
//         setLoading(false);
//     };
//     const handleButtonSubmit = async (status) => {
//         try {
//             await updateTaskById(taskId, { status });
//             console.log("Estado actualizado a:", status);
//             alert(`Estado actualizado a: ${status}`);
//         } catch (error) {
//             console.error("Error al actualizar el estado:", error);
//             alert("Error al actualizar estado. Por favor, intenta de nuevo.");
//         }
//     };

//     // Aquí va lo que quiero que aparezca en el pdf
//     const content = [
//         { text: `Nombre del Proyecto: ${project.projectName}` },
//         { text: `Tipo de Construcción: ${project.constructionType}` },
//         { text: `Sección: ${sectionKey}` },
//         { text: `Descripción de la Tarea: ${task.description}` }
//     ];

//     const imageUrl = "URL_de_la_imagen"; // Cambiar por la URL de cloudinary

//     return (
//         <Box sx={{ textAlign: "left", marginLeft: "2em" }}>
//             <Typography variant="h5">
//                 {project.projectName} - {project.constructionType} - {sectionKey}
//             </Typography>
//             <Formik
//                 initialValues={task}
//                 enableReinitialize={true}
//                 validationSchema={NewTaskFormSchema}
//                 onSubmit={handleSubmit}
//             >
//                 {formik => (
//                     <Form>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12}>
//                                 <Select
//                                     name="assignedEmployee"
//                                     value={formik.values.employeeName || ''}
//                                     onChange={formik.handleChange}
//                                     fullWidth
//                                     displayEmpty
//                                 >
//                                     <MenuItem value="">
//                                         <em>None</em>
//                                     </MenuItem>
//                                     {employees.map(employee => (
//                                         <MenuItem key={employee.id} value={employee.id}>
//                                             {employee.employeeName}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </Grid>
//                             {Object.keys(formik.values).filter(key => key !== 'projectId' && key !== 'taskId').map(key => (
//                                 <Grid item xs={12} key={key}>
//                                     <Field component={TextField} name={key} label={key} fullWidth />
//                                 </Grid>
//                             ))}
//                         </Grid>
//                         <Box sx={{ marginTop: 2, display: "flex", gap: 2 }}>
//                             <Button color="secondary" onClick={() => handleButtonSubmit('No iniciado')}>No Iniciado</Button>
//                             <Button color="primary" onClick={() => handleButtonSubmit('Iniciado')}>Iniciado</Button>
//                             <Button color="success" onClick={() => handleButtonSubmit('Terminado')}>Terminado</Button>
//                         </Box>
//                         <Button  type="submit" variant="contained" color="#84C7AE">Editar Tarea</Button>
//                         <CreatePDFButton content={content} imageUrl={imageUrl} fileName="tarea-info.pdf" />
//                     </Form>
//                 )}
//             </Formik>
//         </Box>
//     );
// }
