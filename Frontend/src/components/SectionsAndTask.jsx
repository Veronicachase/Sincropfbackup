
import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Collapse, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PropTypes from 'prop-types';
import { deleteTask } from '../api/deleteTask';
import { getTaskBySection } from '../api/getTaskBySection';
import { useNavigate } from 'react-router-dom';
import CreatePDFButton from '../components/CreatePDFButton';
import { getProjectById } from '../api/getProjectById';

export const SectionsAndTasks = ({ projectId, sectionKey, taskData = [], setTaskData }) => {
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const navigate = useNavigate();
  const [project, setProject] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await getProjectById(projectId);
      setProject(projectData);
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (projectId && sectionKey) {
        try {
          const tasks = await getTaskBySection(projectId, sectionKey);
          setTaskData(tasks);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }
    };

    fetchTasks();
  }, [projectId, sectionKey, setTaskData]);

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTaskData((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
    } catch (error) {
      console.error('Error eliminando la tarea:', error);
    }
  };

  const handleToggleExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  // Función para manejar el clic en la imagen
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const handleModalClick = (event) => {
    if (event.target.tagName !== 'IMG') {
      handleCloseModal();
    }
  };

  return (
    <Box>
      {taskData.length === 0 ? (
        <Typography>No hay tareas para esta sección.</Typography>
      ) : (
        taskData.map((task) => (
          <Box key={task.taskId} id={`task-${task.taskId}`} sx={{ marginBottom: 3, border: '1px solid #ccc', borderRadius: '5px', padding: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{task.taskName}</Typography>
              <Box>
                <IconButton onClick={() => handleToggleExpand(task.taskId)}>
                  {expandedTaskId === task.taskId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <IconButton onClick={() => handleDeleteTask(task.taskId)}>
                  <DeleteForeverIcon sx={{ color: 'red' }} />
                </IconButton>
                <IconButton onClick={() => navigate(`/edit-task/${task.taskId}`)}>
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
            <Collapse in={expandedTaskId === task.taskId}>
              <Box mt={2}>
                <Typography sx={{textAlign:"left"}} variant="body1"><strong>Descripción: </strong>{task.taskDescription}</Typography>
                <Typography sx={{textAlign:"left"}} variant="body1"><strong>Fecha de inicio: </strong>{task.startDate}</Typography>
                <Typography sx={{textAlign:"left"}} variant="body1"><strong>Fecha de fin: </strong>{task.endDate}</Typography>

                <Box mt={2}>
                  <Typography sx={{textAlign:"left"}} variant="body1"><strong>Imágenes Iniciales:</strong></Typography>
                  <Box display="flex" flexWrap="wrap" backgroundColor="#EDF5F4" borderRadius={"10px"} padding={"1em"}>
                    {task.prevImages && task.prevImages.map((image, index) => (
                      <img 
                        key={index} 
                        src={image} 
                        alt={`Inicial ${index}`} 
                        style={{ width: '100px', margin: '5px', cursor: 'pointer' }} 
                        onClick={() => handleImageClick(image)}
                      />
                    ))}
                  </Box>
                </Box>

                <Box mt={2}>
                  <Typography sx={{textAlign:"left"}}  variant="body1"><strong>Imágenes Finales:</strong></Typography>
                  <Box display="flex" flexWrap="wrap" backgroundColor="#EDF5F4" borderRadius={"10px"} padding={"1em"}>
                    {task.finalImages && task.finalImages.map((image, index) => (
                      <img 
                        key={index} 
                        src={image} 
                        alt={`Final ${index}`} 
                        style={{ width: '100px', margin: '5px', cursor: 'pointer' }} 
                        onClick={() => handleImageClick(image)}
                      />
                    ))}
                  </Box>
                </Box>
                {project && (
                  <CreatePDFButton project={project} tasks={[task]} fileName={`reporte_${project.projectName}_${task.taskName}.pdf`} />
                )}
              </Box>
            </Collapse>
          </Box>
        ))
      )}

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" onClick={handleModalClick}>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '90%', maxHeight: '90%' }} />
        </Box>
      </Modal>
    </Box>
  );
};

SectionsAndTasks.propTypes = {
  projectId: PropTypes.string,
  sectionKey: PropTypes.string,
  taskData: PropTypes.array,
  setTaskData: PropTypes.func,
};

export default SectionsAndTasks;














// import { useState, useEffect } from 'react';
// import { Box, Typography, IconButton, Collapse } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import PropTypes from 'prop-types';
// import { deleteTask } from '../api/deleteTask';
// import { getTaskBySection } from '../api/getTaskBySection';
// import { useNavigate } from 'react-router-dom';
// import CreatePDFButton from '../components/CreatePDFButton';
// import { getProjectById } from '../api/getProjectById';

// export const SectionsAndTasks = ({ projectId, sectionKey, taskData = [], setTaskData }) => {
//   const [expandedTaskId, setExpandedTaskId] = useState(null);
//   const navigate = useNavigate();
//   const [project, setProject] = useState(null); 

//   useEffect(() => {
//     const fetchProject = async () => {
//       const projectData = await getProjectById(projectId);
//       setProject(projectData);
//     };

//     fetchProject();
//   }, [projectId]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       if (projectId && sectionKey) {
//         try {
//           const tasks = await getTaskBySection(projectId, sectionKey);
//           setTaskData(tasks);
//         } catch (error) {
//           console.error('Error fetching tasks:', error);
//         }
//       }
//     };

//     fetchTasks();
//   }, [projectId, sectionKey, setTaskData]);

//   const handleDeleteTask = async (taskId) => {
//     try {
//       await deleteTask(taskId);
//       setTaskData((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
//     } catch (error) {
//       console.error('Error eliminando la tarea:', error);
//     }
//   };

//   const handleToggleExpand = (taskId) => {
//     setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
//   };

//   return (
//     <Box>
//       {taskData.length === 0 ? (
//         <Typography>No hay tareas para esta sección.</Typography>
//       ) : (
//         taskData.map((task) => (
//           <Box key={task.taskId} id={`task-${task.taskId}`} sx={{ marginBottom: 3, border: '1px solid #ccc', borderRadius: '5px', padding: 2 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Typography variant="h6">{task.taskName}</Typography>
//               <Box>
//                 <IconButton onClick={() => handleToggleExpand(task.taskId)}>
//                   {expandedTaskId === task.taskId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                 </IconButton>
//                 <IconButton onClick={() => handleDeleteTask(task.taskId)}>
//                   <DeleteForeverIcon sx={{ color: 'red' }} />
//                 </IconButton>
//                 <IconButton onClick={() => navigate(`/edit-task/${task.taskId}`)}>
//                   <EditIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//             <Collapse in={expandedTaskId === task.taskId}>
//               <Box mt={2}>
//                 <Typography variant="body1"><strong>Descripción: </strong>{task.taskDescription}</Typography>
//                 <Typography variant="body1"><strong>Fecha de inicio: </strong>{task.startDate}</Typography>
//                 <Typography variant="body1"><strong>Fecha de fin: </strong>{task.endDate}</Typography>

//                 <Box mt={2}>
//                   <Typography variant="body1"><strong>Imágenes Iniciales:</strong></Typography>
//                   <Box display="flex" flexWrap="wrap">
//                     {task.prevImages && task.prevImages.map((image, index) => (
//                       <img key={index} src={image} alt={`Inicial ${index}`} style={{ width: '100px', margin: '5px' }} />
//                     ))}
//                   </Box>
//                 </Box>

//                 <Box mt={2}>
//                   <Typography variant="body1"><strong>Imágenes Finales:</strong></Typography>
//                   <Box display="flex" flexWrap="wrap">
//                     {task.finalImages && task.finalImages.map((image, index) => (
//                       <img key={index} src={image} alt={`Final ${index}`} style={{ width: '100px', margin: '5px' }} />
//                     ))}
//                   </Box>
//                 </Box>
//                 {project && (
//                   <CreatePDFButton project={project} tasks={[task]} fileName={`reporte_${project.projectName}_${task.taskName}.pdf`} />
//                 )}
//               </Box>
//             </Collapse>
//           </Box>
//         ))
//       )}
//     </Box>
//   );
// };

// SectionsAndTasks.propTypes = {
//   projectId: PropTypes.string,
//   sectionKey: PropTypes.string,
//   taskData: PropTypes.array,
//   setTaskData: PropTypes.func,
// };



// export default SectionsAndTasks;





// import { useState, useEffect } from 'react';
// import { Box, Typography, IconButton, Collapse } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import PropTypes from 'prop-types';
// import { deleteTask } from '../api/deleteTask';
// import { getTaskBySection } from '../api/getTaskBySection';
// import { useNavigate } from 'react-router-dom';
// import CreatePDFButton from '../components/CreatePDFButton';

// export const SectionsAndTasks = ({ projectId, sectionKey, taskData = [], setTaskData }) => {
//   const [expandedTaskId, setExpandedTaskId] = useState(null);
//   const navigate = useNavigate();
//   const [project, setProject] = useState(null); // State para almacenar datos del proyecto

//   useEffect(() => {
//     const fetchProject = async () => {
//       // Aquí deberías llamar a una función que obtenga los datos del proyecto
//       const projectData = await getProjectById(projectId);
//       setProject(projectData);
//     };

//     fetchProject();
//   }, [projectId]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       if (projectId && sectionKey) {
//         try {
//           const tasks = await getTaskBySection(projectId, sectionKey);
//           setTaskData(tasks);
//         } catch (error) {
//           console.error('Error fetching tasks:', error);
//         }
//       }
//     };

//     fetchTasks();
//   }, [projectId, sectionKey, setTaskData]);

//   const handleDeleteTask = async (taskId) => {
//     try {
//       await deleteTask(taskId);
//       setTaskData((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
//     } catch (error) {
//       console.error('Error eliminando la tarea:', error);
//     }
//   };

//   const handleToggleExpand = (taskId) => {
//     setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
//   };

//   return (
//     <Box>
//       {taskData.length === 0 ? (
//         <Typography>No hay tareas para esta sección.</Typography>
//       ) : (
//         taskData.map((task) => (
//           <Box key={task.taskId} id={`task-${task.taskId}`} sx={{ marginBottom: 3, border: '1px solid #ccc', borderRadius: '5px', padding: 2 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Typography variant="h6">{task.taskName}</Typography>
//               <Box>
//                 <IconButton onClick={() => handleToggleExpand(task.taskId)}>
//                   {expandedTaskId === task.taskId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                 </IconButton>
//                 <IconButton onClick={() => handleDeleteTask(task.taskId)}>
//                   <DeleteForeverIcon sx={{ color: 'red' }} />
//                 </IconButton>
//                 <IconButton onClick={() => navigate(`/edit-task/${task.taskId}`)}>
//                   <EditIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//             <Collapse in={expandedTaskId === task.taskId}>
//               <Box mt={2}>
//                 <Typography variant="body1"><strong>Descripción: </strong>{task.taskDescription}</Typography>
//                 <Typography variant="body1"><strong>Fecha de inicio: </strong>{task.startDate}</Typography>
//                 <Typography variant="body1"><strong>Fecha de fin: </strong>{task.endDate}</Typography>

//                 <Box mt={2}>
//                   <Typography variant="body1"><strong>Imágenes Iniciales:</strong></Typography>
//                   <Box display="flex" flexWrap="wrap">
//                     {task.prevImages && task.prevImages.map((image, index) => (
//                       <img key={index} src={image} alt={`Inicial ${index}`} style={{ width: '100px', margin: '5px' }} />
//                     ))}
//                   </Box>
//                 </Box>

//                 <Box mt={2}>
//                   <Typography variant="body1"><strong>Imágenes Finales:</strong></Typography>
//                   <Box display="flex" flexWrap="wrap">
//                     {task.finalImages && task.finalImages.map((image, index) => (
//                       <img key={index} src={image} alt={`Final ${index}`} style={{ width: '100px', margin: '5px' }} />
//                     ))}
//                   </Box>
//                 </Box>
//                 {project && (
//                   <CreatePDFButton project={project} tasks={[task]} fileName={`reporte_${project.projectName}_${task.taskName}.pdf`} />
//                 )}
//               </Box>
//             </Collapse>
//           </Box>
//         ))
//       )}
//     </Box>
//   );
// };

// SectionsAndTasks.propTypes = {
//   projectId: PropTypes.string,
//   sectionKey: PropTypes.string,
//   taskData: PropTypes.array,
//   setTaskData: PropTypes.func,
// };



// export default SectionsAndTasks;






// // import  { useState, useEffect } from "react";
// // import { Box, Typography, IconButton, Collapse } from "@mui/material";
// // import EditIcon from "@mui/icons-material/Edit";
// // import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// // import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// // import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// // import PropTypes from "prop-types";
// // import { deleteTask } from "../api/deleteTask";
// // import { getTaskBySection } from "../api/getTaskBySection";
// // import { useNavigate } from "react-router-dom";
// // import CreatePDFButton from "../components/CreatePDFButton"
   

// // export const SectionsAndTasks = ({ projectId, sectionKey, taskData = [], setTaskData }) => {
// //   const [expandedTaskId, setExpandedTaskId] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchTasks = async () => {
// //       if (projectId && sectionKey) {
// //         try {
// //           const tasks = await getTaskBySection(projectId, sectionKey);
// //           setTaskData(tasks);
// //         } catch (error) {
// //           console.error("Error fetching tasks:", error);
// //         }
// //       }
// //     };

// //     fetchTasks();
// //   }, [projectId, sectionKey, setTaskData]);

// //   const handleDeleteTask = async (taskId) => {
// //     try {
// //       await deleteTask(taskId);
// //       setTaskData((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
// //     } catch (error) {
// //       console.error("Error eliminando la tarea:", error);
// //     }
// //   };

// //   const handleToggleExpand = (taskId) => {
// //     setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
// //   };

// //   return (
// //     <Box>
// //       {taskData.length === 0 ? (
// //         <Typography>No hay tareas para esta sección.</Typography>
// //       ) : (
// //         taskData.map((task) => (
// //           <Box key={task.taskId} id={`task-${task.taskId}`} sx={{ marginBottom: 3, border: '1px solid #ccc', borderRadius: '5px', padding: 2 }}>
// //             <Box display="flex" justifyContent="space-between" alignItems="center">
// //               <Typography variant="h6">{task.taskName}</Typography>
// //               <Box>
// //                 <IconButton onClick={() => handleToggleExpand(task.taskId)}>
// //                   {expandedTaskId === task.taskId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
// //                 </IconButton>
// //                 <IconButton onClick={() => handleDeleteTask(task.taskId)}>
// //                   <DeleteForeverIcon sx={{ color: "red" }} />
// //                 </IconButton>
// //                 <IconButton onClick={() => navigate(`/edit-task/${task.taskId}`)}>
// //                   <EditIcon />
// //                 </IconButton>
// //               </Box>
// //             </Box>
// //             <Collapse in={expandedTaskId === task.taskId}>
// //               <Box mt={2}>
// //                 <Typography variant="body1"><strong>Descripción: </strong>{task.taskDescription}</Typography>
// //                 <Typography variant="body1"><strong>Fecha de inicio: </strong>{task.startDate}</Typography>
// //                 <Typography variant="body1"><strong>Fecha de fin: </strong>{task.endDate}</Typography>

// //                 <Box mt={2}>
// //                   <Typography variant="body1"><strong>Imágenes Iniciales:</strong></Typography>
// //                   <Box display="flex" flexWrap="wrap">
// //                     {task.prevImages && task.prevImages.map((image, index) => (
// //                       <img key={index} src={image} alt={`Inicial ${index}`} style={{ width: "100px", margin: "5px" }} />
// //                     ))}
// //                   </Box>
// //                 </Box>

// //                 <Box mt={2}>
// //                   <Typography variant="body1"><strong>Imágenes Finales:</strong></Typography>
// //                   <Box display="flex" flexWrap="wrap">
// //                     {task.finalImages && task.finalImages.map((image, index) => (
// //                       <img key={index} src={image} alt={`Final ${index}`} style={{ width: "100px", margin: "5px" }} />
// //                     ))}
// //                   </Box>
// //                 </Box>
// //                 <CreatePDFButton/>
// //               </Box>
// //             </Collapse>
// //           </Box>
// //         ))
// //       )}
// //     </Box>
// //   );
// // };

// // SectionsAndTasks.propTypes = {
// //   projectId: PropTypes.string,
// //   sectionKey: PropTypes.string,
// //   taskData: PropTypes.array,
// //   setTaskData: PropTypes.func,
// // };



















// // // import React, { useState, useEffect } from "react";
// // // import { Box, Typography, IconButton, Collapse } from "@mui/material";
// // // import EditIcon from "@mui/icons-material/Edit";
// // // import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// // // import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// // // import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// // // import CreatePDFButton from "../components/CreatePDFButton";
// // // import PropTypes from "prop-types";
// // // import { deleteTask } from "../api/deleteTask";
// // // import { getTaskBySection } from "../api/getTaskBySection";
// // // import { useNavigate } from "react-router-dom";
// // // import { getProjectById } from '../api/getProjectById';

// // // const fetchProjectSections = async (projectId) => {
// // //   try {
// // //     const project = await getProjectById(projectId);
// // //     const sections = project.sections || {};
// // //     const filteredSections = Object.keys(sections).filter(
// // //       (key) => sections[key] === true
// // //     );
// // //     return filteredSections;
// // //   } catch (error) {
// // //     console.error('Error fetching project sections:', error);
// // //     return [];
// // //   }
// // // };

// // // export const SectionsAndTasks = ({ projectId }) => {
// // //   const [taskData, setTaskData] = useState([]);
// // //   const [sections, setSections] = useState([]);
// // //   const [expandedTaskId, setExpandedTaskId] = useState(null);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchSectionsAndTasks = async () => {
// // //       if (projectId) {
// // //         try {
// // //           const sections = await fetchProjectSections(projectId);
// // //           setSections(sections);

// // //           const allTasks = await Promise.all(
// // //             sections.map(async (section) => {
// // //               const tasks = await getTaskBySection(projectId, section);
// // //               return { section, tasks };
// // //             })
// // //           );

// // //           // Flattening tasks to have a simple array of tasks with section info
// // //           const flattenedTasks = allTasks.flatMap(({ section, tasks }) =>
// // //             tasks.map(task => ({ ...task, section }))
// // //           );

// // //           setTaskData(flattenedTasks);
// // //         } catch (error) {
// // //           console.error('Error fetching sections and tasks:', error);
// // //         }
// // //       }
// // //     };

// // //     fetchSectionsAndTasks();
// // //   }, [projectId]);

// // //   const handleDeleteTask = async (taskId) => {
// // //     try {
// // //       await deleteTask(taskId);
// // //       setTaskData((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
// // //     } catch (error) {
// // //       console.error("Error eliminando la tarea:", error);
// // //     }
// // //   };

// // //   const handleToggleExpand = (taskId) => {
// // //     setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
// // //   };

// // //   return (
// // //     <Box>
// // //       {taskData.length === 0 ? (
// // //         <Typography>No hay tareas para esta sección.</Typography>
// // //       ) : (
// // //         taskData.map((task, index) => (
// // //           <Box
// // //             key={`${task.taskId}-${task.section}-${index}`}
// // //             sx={{
// // //               marginBottom: 3,
// // //               border: "1px solid #ccc",
// // //               borderRadius: "5px",
// // //               padding: 2,
// // //             }}
// // //           >
// // //             <Box display="flex" justifyContent="space-between" alignItems="center">
// // //               <Typography variant="h6">{task.taskName} - {task.section}</Typography>
// // //               <Box>
// // //                 <IconButton onClick={() => handleToggleExpand(task.taskId)}>
// // //                   {expandedTaskId === task.taskId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
// // //                 </IconButton>
// // //                 <IconButton onClick={() => handleDeleteTask(task.taskId)}>
// // //                   <DeleteForeverIcon sx={{ color: "red" }} />
// // //                 </IconButton>
// // //                 <IconButton onClick={() => navigate(`/edit-task/${task.taskId}`)}>
// // //                   <EditIcon />
// // //                 </IconButton>
// // //               </Box>
// // //             </Box>
// // //             <Collapse in={expandedTaskId === task.taskId}>
// // //               <Box mt={2}>
// // //                 <Typography textAlign={"left"} variant="body1">
// // //                   <strong>Fecha de inicio: </strong>{task.startDate}
// // //                 </Typography>
// // //                 <Typography textAlign={"left"} variant="body1">
// // //                   <strong>Fecha de fin: </strong>{task.endDate}
// // //                 </Typography>
// // //                 <Typography textAlign={"left"} variant="body1">
// // //                   <strong>Descripción: </strong>{task.taskDescription}
// // //                 </Typography>
// // //                 <Box mt={2}>
// // //                   <Typography textAlign={"left"} variant="body1">
// // //                     <strong>Imágenes Iniciales:</strong>
// // //                   </Typography>
// // //                   <Box display="flex" flexWrap="wrap" backgroundColor={"#EDF5F4"} padding={"1em"} borderRadius={"5px"}>
// // //                     {task.prevImages && task.prevImages.map((image, index) => (
// // //                       <img
// // //                         key={`${task.taskId}-prev-${index}`}
// // //                         src={image}
// // //                         alt={`Inicial ${index}`}
// // //                         style={{ width: "100px", margin: "5px" }}
// // //                         onError={() => console.log("Error cargando imagen inicial", image)}
// // //                       />
// // //                     ))}
// // //                   </Box>
// // //                 </Box>
// // //                 <Box mt={2}>
// // //                   <Typography textAlign={"left"} variant="body1">
// // //                     <strong>Imágenes Finales:</strong>
// // //                   </Typography>
// // //                   <Box display="flex" flexWrap="wrap" backgroundColor={"#EDF5F4"} padding={"1em"} borderRadius={"5px"}>
// // //                     {task.finalImages && task.finalImages.map((image, index) => (
// // //                       <img
// // //                         key={`${task.taskId}-final-${index}`}
// // //                         src={image}
// // //                         alt={`Final ${index}`}
// // //                         style={{ width: "100px", margin: "5px" }}
// // //                         onError={() => console.log("Error cargando imagen final", image)}
// // //                       />
// // //                     ))}
// // //                   </Box>
// // //                 </Box>
// // //                 <Box mt={2}>
// // //                   <Typography>Crear reporte de esta tarea</Typography>
// // //                   <CreatePDFButton
// // //                     content={[
// // //                       { text: `Fecha: ${new Date().toLocaleDateString()}` },
// // //                       { text: `Nombre de Proyecto: ${task.projectName}` },
// // //                       { text: `Sección: ${task.section}` },
// // //                       { text: `Trabajo por hacer: ${task.taskName}` },
// // //                       { text: `Descripción: ${task.taskDescription}` },
// // //                       { text: `Fecha de inicio: ${task.startDate}` },
// // //                       { text: `Fecha de fin: ${task.endDate}` },
// // //                     ]}
// // //                     images={task.prevImages ? task.prevImages.concat(task.finalImages || []) : task.finalImages || []}
// // //                   />
// // //                 </Box>
// // //               </Box>
// // //             </Collapse>
// // //           </Box>
// // //         ))
// // //       )}
// // //     </Box>
// // //   );
// // // };

// // // SectionsAndTasks.propTypes = {
// // //   projectId: PropTypes.string.isRequired,
// // // };














// // // import { useState, useEffect } from "react";
// // // import { Box, Typography, IconButton, Collapse } from "@mui/material";
// // // import EditIcon from "@mui/icons-material/Edit";
// // // import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// // // import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// // // import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// // // import CreatePDFButton from "../components/CreatePDFButton";
// // // import PropTypes from "prop-types";
// // // import { deleteTask } from "../api/deleteTask";
// // // import { getTaskBySection } from "../api/getTaskBySection";
// // // import { useNavigate } from "react-router-dom";

// // // export const SectionsAndTasks = ({
// // //   projectId,
// // //   sectionKey,
// // //   taskData = [],
// // //   setTaskData,
// // // }) => {
// // //   console.log("esto es lo que me trae el task Data", taskData);
// // //   const [expandedTaskId, setExpandedTaskId] = useState(null);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchTasks = async () => {
// // //       if (projectId && sectionKey) {
// // //         try {
// // //           console.log(
// // //             "Fetching tasks for projectId:",
// // //             projectId,
// // //             "and sectionKey:",
// // //             sectionKey
// // //           );
// // //           const tasks = await getTaskBySection(projectId, sectionKey);
// // //           console.log("este es el clg de las tareas del useEffect", tasks);
// // //           setTaskData(tasks);
// // //         } catch (error) {
// // //           console.error("Error fetching tasks:", error);
// // //         }
// // //       }
// // //     };

// // //     fetchTasks();
// // //   }, [projectId, sectionKey, setTaskData]);

// // //   const handleDeleteTask = async (taskId) => {
// // //     try {
// // //       await deleteTask(taskId);
// // //       setTaskData((prevTasks) =>
// // //         prevTasks.filter((task) => task.taskId !== taskId)
// // //       );
// // //     } catch (error) {
// // //       console.error("Error eliminando la tarea:", error);
// // //     }
// // //   };

// // //   const handleToggleExpand = (taskId) => {
// // //     setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
// // //   };

// // //   return (
// // //     <Box>
// // //       {taskData.length === 0 ? (
// // //         <Typography>No hay tareas para esta sección.</Typography>
// // //       ) : (
// // //         taskData.map((task) => (
// // //           <Box
// // //             key={task.taskId}
// // //             sx={{
// // //               marginBottom: 3,
// // //               border: "1px solid #ccc",
// // //               borderRadius: "5px",
// // //               padding: 2,
// // //             }}
// // //           >
// // //             <Box
// // //               display="flex"
// // //               justifyContent="space-between"
// // //               alignItems="center"
// // //             >
// // //               <Typography variant="h6">{task.taskName}</Typography>
// // //               <Box>
// // //                 <IconButton onClick={() => handleToggleExpand(task.taskId)}>
// // //                   {expandedTaskId === task.taskId ? (
// // //                     <ExpandLessIcon />
// // //                   ) : (
// // //                     <ExpandMoreIcon />
// // //                   )}
// // //                 </IconButton>
// // //                 <IconButton onClick={() => handleDeleteTask(task.taskId)}>
// // //                   <DeleteForeverIcon sx={{ color: "red" }} />
// // //                 </IconButton>
// // //                 <IconButton
// // //                   onClick={() => navigate(`/edit-task/${task.taskId}`)}
// // //                 >
// // //                   <EditIcon />
// // //                 </IconButton>
// // //               </Box>
// // //             </Box>
// // //             <Collapse in={expandedTaskId === task.taskId}>
// // //               <Box mt={2}>
// // //                 <Typography textAlign={"left"} variant="body1">
// // //                   <strong>Fecha de inicio: </strong>
// // //                   {task.startDate}
// // //                 </Typography>
// // //                 <Typography textAlign={"left"} variant="body1">
// // //                   <strong>Fecha de fin: </strong>
// // //                   {task.endDate}
// // //                 </Typography>
// // //                 <Typography textAlign={"left"} variant="body1">
// // //                   <strong>Descripción: </strong>
// // //                   {task.taskDescription}
// // //                 </Typography>
// // //                 <Box mt={2}>
// // //                   <Typography textAlign={"left"} variant="body1">
// // //                     <strong>Imágenes Iniciales:</strong>
// // //                   </Typography>
// // //                   <Box
// // //                     display="flex"
// // //                     flexWrap="wrap"
// // //                     backgroundColor={"#EDF5F4"}
// // //                     padding={"1em"}
// // //                     borderRadius={"5px"}
// // //                   >
// // //                     {task.prevImages &&
// // //                       task.prevImages.map((image, index) => (
// // //                         <img
// // //                           key={index}
// // //                           src={image}
// // //                           alt={`Inicial ${index}`}
// // //                           style={{ width: "100px", margin: "5px" }}
// // //                           onError={() =>
// // //                             console.log("Error cargando imagen inicial", image)
// // //                           }
// // //                         />
// // //                       ))}
// // //                   </Box>
// // //                 </Box>

// // //                 <Box mt={2}>
// // //                   <Typography textAlign={"left"} variant="body1">
// // //                     <strong>Imágenes Finales:</strong>
// // //                   </Typography>
// // //                   <Box
// // //                     display="flex"
// // //                     flexWrap="wrap"
// // //                     backgroundColor={"#EDF5F4"}
// // //                     padding={"1em"}
// // //                     borderRadius={"5px"}
// // //                   >
// // //                     {task.finalImages &&
// // //                       task.finalImages.map((image, index) => (
// // //                         <img
// // //                           key={index}
// // //                           src={image}
// // //                           alt={`Final ${index}`}
// // //                           style={{ width: "100px", margin: "5px" }}
// // //                           onError={() =>
// // //                             console.log("Error cargando imagen final", image)
// // //                           }
// // //                         />
// // //                       ))}
// // //                   </Box>
// // //                 </Box>

// // //                 <Box mt={2}>
// // //                   <Typography>Crear reporte de esta tarea</Typography>
// // //                   <CreatePDFButton
// // //                     content={[
// // //                       { text: `Fecha: ${new Date().toLocaleDateString()}` },
// // //                       { text: `Nombre de Proyecto: ${task.projectName}` },
// // //                       { text: `Sección: ${sectionKey}` },
// // //                       { text: `Trabajo por hacer: ${task.taskName}` },
// // //                       { text: `Descripción: ${task.taskDescription}` },
// // //                       { text: `Fecha de inicio: ${task.startDate}` },
// // //                       { text: `Fecha de fin: ${task.endDate}` },
// // //                     ]}
// // //                     images={
// // //                       task.prevImages
// // //                         ? task.prevImages.concat(task.finalImages || [])
// // //                         : task.finalImages || []
// // //                     }
// // //                   />
// // //                 </Box>
// // //               </Box>
// // //             </Collapse>
// // //           </Box>
// // //         ))
// // //       )}
// // //     </Box>
// // //   );
// // // };

// // // SectionsAndTasks.propTypes = {
// // //   projectId: PropTypes.string.isRequired,
// // //   sectionKey: PropTypes.string.isRequired,
// // //   taskData: PropTypes.array.isRequired,
// // //   setTaskData: PropTypes.func.isRequired,
// // // };

// // // import { useState, useEffect } from "react";
// // // import { Box, Typography, IconButton, Collapse } from "@mui/material";
// // // import EditIcon from "@mui/icons-material/Edit";
// // // import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// // // import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// // // import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// // // import CreatePDFButton from "../components/CreatePDFButton";
// // // import PropTypes from "prop-types";
// // // import { deleteTask } from "../api/deleteTask";
// // // import { getTaskBySection } from "../api/getTaskBySection"
// // // import { useNavigate } from "react-router-dom";

// // // export const SectionsAndTasks = ({ projectId, sectionKey, taskData = [], setTaskData }) => {
// // //   console.log("esto es lo que me trae el task Data", taskData)
// // //   const [expandedTaskId, setExpandedTaskId] = useState(null);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchTasks = async () => {
// // //       if (projectId && sectionKey) {
// // //         try {
// // //           console.log("Fetching tasks for projectId:", projectId, "and sectionKey:", sectionKey);
// // //           const tasks = await getTaskBySection(projectId, sectionKey);
// // //           console.log("este es el clg de las tareas del useEffect", tasks);
// // //           setTaskData(tasks);
// // //         } catch (error) {
// // //           console.error("Error fetching tasks:", error);
// // //         }
// // //       }
// // //     };

// // //     fetchTasks();
// // //   }, [projectId, sectionKey, setTaskData]);

// // //   const handleDeleteTask = async (taskId) => {
// // //     try {
// // //       await deleteTask(taskId);
// // //       setTaskData((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
// // //     } catch (error) {
// // //       console.error("Error eliminando la tarea:", error);
// // //     }
// // //   };

// // //   const handleToggleExpand = (taskId) => {
// // //     setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
// // //   };

// // //   return (
// // //     <Box>
// // //       {taskData.length === 0 ? (
// // //         <Typography>No hay tareas para esta sección.</Typography>
// // //       ) : (
// // //         taskData.map((task) => (
// // //           <Box key={task.taskId} sx={{ marginBottom: 3, border: '1px solid #ccc', borderRadius: '5px', padding: 2 }}>
// // //             <Box display="flex" justifyContent="space-between" alignItems="center">
// // //               <Typography variant="h6">{task.taskName}</Typography>
// // //               <Box>
// // //                 <IconButton onClick={() => handleToggleExpand(task.taskId)}>
// // //                   {expandedTaskId === task.taskId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
// // //                 </IconButton>
// // //                 <IconButton onClick={() => handleDeleteTask(task.taskId)}>
// // //                   <DeleteForeverIcon sx={{ color: "red" }} />
// // //                 </IconButton>
// // //                 <IconButton onClick={() => navigate(`/edit-task/${task.taskId}`)}>
// // //                   <EditIcon />
// // //                 </IconButton>
// // //               </Box>
// // //             </Box>
// // //             <Collapse in={expandedTaskId === task.taskId}>
// // //               <Box mt={2}>
// // //                 <Typography variant="body1"><strong>Descripción: </strong>{task.description}</Typography>
// // //                 <Typography variant="body1"><strong>Fecha de inicio: </strong>{task.startDate}</Typography>
// // //                 <Typography variant="body1"><strong>Fecha de fin: </strong>{task.endDate}</Typography>

// // //                 <Box mt={2}>
// // //                   <Typography variant="body1"><strong>Imágenes Iniciales:</strong></Typography>
// // //                   <Box display="flex" flexWrap="wrap">
// // //                     {task.prevImages && task.prevImages.map((image, index) => (
// // //                       <img key={index} src={image} alt={`Inicial ${index}`} style={{ width: "100px", margin: "5px" }} onError={() => console.log('Error cargando imagen inicial', image)} />
// // //                     ))}
// // //                   </Box>
// // //                 </Box>

// // //                 <Box mt={2}>
// // //                   <Typography variant="body1"><strong>Imágenes Finales:</strong></Typography>
// // //                   <Box display="flex" flexWrap="wrap">
// // //                     {task.finalImages && task.finalImages.map((image, index) => (
// // //                       <img key={index} src={image} alt={`Final ${index}`} style={{ width: "100px", margin: "5px" }} onError={() => console.log('Error cargando imagen final', image)} />
// // //                     ))}
// // //                   </Box>
// // //                 </Box>

// // //                 <Box mt={2}>
// // //                   <Typography>Crear reporte de esta tarea</Typography>
// // //                   <CreatePDFButton
// // //                     content={[
// // //                       { text: `Fecha: ${new Date().toLocaleDateString()}` },
// // //                       { text: `Nombre de Proyecto: ${task.projectName}` },
// // //                       { text: `Sección: ${sectionKey}` },
// // //                       { text: `Trabajo por hacer: ${task.taskName}` },
// // //                       { text: `Descripción: ${task.description}` },
// // //                       { text: `Fecha de inicio: ${task.startDate}` },
// // //                       { text: `Fecha de fin: ${task.endDate}` },
// // //                     ]}
// // //                     images={task.prevImages ? task.prevImages.concat(task.finalImages || []) : task.finalImages || []}
// // //                   />
// // //                 </Box>
// // //               </Box>
// // //             </Collapse>
// // //           </Box>
// // //         ))
// // //       )}
// // //     </Box>
// // //   );
// // // };

// // // SectionsAndTasks.propTypes = {
// // //   projectId: PropTypes.string.isRequired,
// // //   sectionKey: PropTypes.string.isRequired,
// // //   taskData: PropTypes.array.isRequired,
// // //   setTaskData: PropTypes.func.isRequired,
// // // };

// // // import { useState, useEffect } from "react";
// // // import { Box, Typography, IconButton, Collapse, Button } from "@mui/material";
// // // import EditIcon from "@mui/icons-material/Edit";
// // // import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// // // import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// // // import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// // // import CreatePDFButton from "../components/CreatePDFButton";
// // // import PropTypes from "prop-types";
// // // import { deleteTask } from "../api/deleteTask";
// // // import { getTaskBySection } from "../api/getTaskBySection"
// // // import { useNavigate } from "react-router-dom";

// // // export const SectionsAndTasks = ({ projectId, sectionKey, taskData = [], setTaskData }) => {
// // //   console.log("esto es lo que me trae el task Data", taskData)
// // //   const [expandedTaskId, setExpandedTaskId] = useState(null);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchTasks = async () => {
// // //       if (projectId && sectionKey) {
// // //         try {
// // //           console.log("Fetching tasks for projectId:", projectId, "and sectionKey:", sectionKey);
// // //           const tasks = await getTaskBySection(projectId, sectionKey);
// // //           console.log( "este es el clg de las tareas del useEffect", tasks)
// // //           setTaskData(tasks);

// // //         } catch (error) {
// // //           console.error("Error fetching tasks:", error);
// // //         }
// // //       }
// // //     };

// // //     fetchTasks();
// // //   }, [projectId, sectionKey, setTaskData]);

// // //   const handleDeleteTask = async (taskId) => {
// // //     try {
// // //       await deleteTask(taskId);
// // //       setTaskData((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
// // //     } catch (error) {
// // //       console.error("Error eliminando la tarea:", error);
// // //     }
// // //   };

// // //   const handleToggleExpand = (taskId) => {
// // //     setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
// // //   };

// // //   return (
// // //     <Box>
// // //       {taskData.length === 0 ? (
// // //         <Typography>No hay tareas para esta sección.</Typography>
// // //       ) : (
// // //         taskData.map((task) => (
// // //           <Box key={task.taskId} sx={{ marginBottom: 3, border: '1px solid #ccc', borderRadius: '5px', padding: 2 }}>
// // //             <Box display="flex" justifyContent="space-between" alignItems="center">
// // //               <Typography variant="h6">{task.taskName}</Typography>
// // //               <Box>
// // //                 <IconButton onClick={() => handleToggleExpand(task.taskId)}>
// // //                   {expandedTaskId === task.taskId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
// // //                 </IconButton>
// // //                 <IconButton onClick={() => handleDeleteTask(task.taskId)}>
// // //                   <DeleteForeverIcon sx={{ color: "red" }} />
// // //                 </IconButton>
// // //                 <IconButton onClick={() => navigate(`/edit-task/${task.taskId}`)}>
// // //                   <EditIcon />
// // //                 </IconButton>
// // //               </Box>
// // //             </Box>
// // //             <Collapse in={expandedTaskId === task.taskId}>
// // //               <Box mt={2}>
// // //                 <Typography variant="body1"><strong>Descripción: </strong>{task.description}</Typography>
// // //                 <Typography variant="body1"><strong>Fecha de inicio: </strong>{task.startDate}</Typography>
// // //                 <Typography variant="body1"><strong>Fecha de fin: </strong>{task.endDate}</Typography>

// // //                 <Box mt={2}>
// // //                   <Typography variant="body1"><strong>Imágenes Iniciales:</strong></Typography>
// // //                   <Box display="flex" flexWrap="wrap">
// // //                     {task.prevImages && task.prevImages.map((image, index) => (
// // //                       <img key={index} src={image} alt={`Inicial ${index}`} style={{ width: "100px", margin: "5px" }} />
// // //                     ))}
// // //                   </Box>
// // //                 </Box>

// // //                 <Box mt={2}>
// // //                   <Typography variant="body1"><strong>Imágenes Finales:</strong></Typography>
// // //                   <Box display="flex" flexWrap="wrap">
// // //                     {task.finalImages && task.finalImages.map((image, index) => (
// // //                       <img key={index} src={image} alt={`Final ${index}`} style={{ width: "100px", margin: "5px" }} />
// // //                     ))}
// // //                   </Box>
// // //                 </Box>

// // //                 <Box mt={2}>
// // //                 <Typography>Crear reporte de esta tarea</Typography>
// // //                   <CreatePDFButton
// // //                     content={[
// // //                       { text: `Fecha: ${new Date().toLocaleDateString()}` },
// // //                       { text: `Nombre de Proyecto: ${task.projectName}` },
// // //                       { text: `Sección: ${sectionKey}` },
// // //                       { text: `Trabajo por hacer: ${task.taskName}` },
// // //                       { text: `Descripción: ${task.description}` },
// // //                       { text: `Fecha de inicio: ${task.startDate}` },
// // //                       { text: `Fecha de fin: ${task.endDate}` },
// // //                     ]}
// // //                     images={task.prevImages ? task.prevImages.concat(task.finalImages || []) : task.finalImages || []}
// // //                   />
// // //                 </Box>
// // //               </Box>
// // //             </Collapse>
// // //           </Box>
// // //         ))
// // //       )}
// // //     </Box>
// // //   );
// // // };

// // // SectionsAndTasks.propTypes = {
// // //   projectId: PropTypes.string.isRequired,
// // //   sectionKey: PropTypes.string.isRequired,
// // //   taskData: PropTypes.array.isRequired,
// // //   setTaskData: PropTypes.func.isRequired,
// // // };
