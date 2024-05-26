import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/getProjectById"; 
import { getTaskBySection } from "../../api/getTaskBySection";
import MapView from "../../components/MapView";
import SideMenu from "../../components/SideMenu";
import { SectionsAndTasks } from "../../components/SectionsAndTask"; 
import { Box, Typography, Grid, Button, List, ListItem, ListItemText, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreatePDFButton from "../../components/CreatePDFButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ProjectInfo() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [selectedSectionKey, setSelectedSectionKey] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId)
        .then((projectData) => {
          setProject(projectData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching project data:", error);
          setLoading(false);
        });
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId && selectedSectionKey) {
      getTaskBySection(projectId, selectedSectionKey)
        .then((tasks) => {
          setTaskData(tasks);
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        });
    }
  }, [projectId, selectedSectionKey]);

  if (loading) {
    return <p>Cargando proyecto...</p>;
  }

  if (!project) {
    return <p>No se encontró el proyecto</p>;
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const sectionsWithTasks = taskData.reduce((acc, task) => {
    if (!acc[task.section]) {
      acc[task.section] = [];
    }
    acc[task.section].push(task);
    return acc;
  }, {});

  return (
    <>
      <Box display="flex" sx={{ backgroundColor: "#EDF5F4", paddingTop: "2em" }}>
        <SideMenu />
        <Box flex="1" p={3}>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="mostrar más"
          >
            {expanded ?  <ExpandLessIcon />  : <Typography> Ver datos<ExpandMoreIcon /></Typography>}
          </IconButton>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box border={1} display={"flex"} flexDirection={"column"} borderRadius={2} p={2} backgroundColor="#fff" borderColor="#ccc" textAlign={"left"} lineHeight={"2"}>
                  <Typography variant="h5">Datos</Typography>
                  <Typography variant="body1"><strong>Nombre del proyecto: </strong>{project.projectName}</Typography>
                  <Typography variant="body1"><strong>Identificador: </strong>{project.identifier}</Typography>
                  <Typography variant="body1"><strong>Empresa contratante: </strong>{project.hiringCompany}</Typography>
                  <Typography variant="body1"><strong>Tipo de Proyecto: </strong>{project.typeOfWork}</Typography>
                  <Typography variant="body1"><strong>Tipo de construcción: </strong>{project.constructionType}</Typography>
                  <Typography variant="body1"><strong>Descripción general del proyecto: </strong>{project.projectDescription}</Typography>
                  <Typography variant="body1"><strong>Fecha de inicio: </strong>{project.startDate}</Typography>
                  <Typography variant="body1"><strong>Fecha de entrega: </strong>{project.endDate}</Typography>
                  <Typography variant="body1"><strong>Estado:</strong>{project.status}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box border={1} borderRadius={2} p={2} backgroundColor="#fff" borderColor="#ccc" textAlign={"left"}>
                  <Typography variant="h5">Dirección</Typography>
                  <Typography variant="body1"><strong>Dirección:</strong>{project.addressDescription}</Typography>
                  <Typography variant="body1"><strong>Bloque:</strong>{project.block}</Typography>
                  <Typography variant="body1"><strong>No.:</strong>{project.unit}</Typography>
                  <Typography variant="body1"><strong>Código Postal:</strong>{project.zipCode}</Typography>
                  <Typography variant="body1"><strong>Provincia:</strong>{project.province}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box border={1} borderRadius={2} p={2} backgroundColor="#fff" borderColor="#ccc">
                  <Typography variant="h5">Mapa</Typography>
                  <MapView />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box border={1} borderRadius={2} p={2} backgroundColor="#fff" borderColor="#ccc">
                  <Typography variant="h5">Imagen general del proyecto</Typography>
                  <Box sx={{ marginTop: "1em" }}>
                    {project.image && <img src={project.image} alt="Project" width="100%" />}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Collapse>

          {/* Visualización de secciones y tareas */}
          <Box display="flex" mt={3} backgroundColor={"#fff"} borderRadius={"10px"}>
            <Box width="25%" borderRight={1} borderColor="#ccc">
              <Typography variant="body1" sx={{ padding: 1 }}>Secciones activas del proyecto</Typography>
              <List>
                {Object.keys(project.sections).map((key) => (
                  <ListItem key={key} onClick={() => setSelectedSectionKey(key)}>
                    <ListItemText primary={key.charAt(0).toUpperCase() + key.slice(1)} />
                    <ArrowForwardIcon/>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box flex="1" padding="2em">
              {selectedSectionKey && (
                <>
                  <Box marginBottom={5}>
                    <Button
                      variant="outlined"
                      sx={{ border: "1px solid #fff" }}
                      onClick={() => navigate(`/project-create-task/${projectId}/${selectedSectionKey}`)}
                    >
                      <Typography variant="body" color={"#000"} paddingRight={1}>
                        Agregar tarea{" "}
                      </Typography>
                      <AddCircleIcon sx={{ color: "#000" }} />
                    </Button>
                  </Box>
                  <SectionsAndTasks 
                    projectId={projectId} 
                    sectionKey={selectedSectionKey} 
                    taskData={taskData} 
                    setTaskData={setTaskData} 
                  />
                </>
              )}
            </Box>
          </Box>

          <Box>
            <Typography sx={{marginTop:"2em"}}>Crear PDF del Proyecto Completo</Typography>
            <CreatePDFButton
              content={[
                { text: `Fecha: ${new Date().toLocaleDateString()}` },
                { text: `Nombre de Proyecto: ${project.projectName}` },
                { text: `Dirección: ${project.addressDescription}` },
                { text: `Descripción del proyecto: ${project.projectDescription}` },
                { text: `Sección: ${selectedSectionKey}` },
              ]}
              imageUrl={project.image}
              tasks={sectionsWithTasks} 
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}



// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getProjectById } from "../../api/getProjectById"; 
// import { getTaskBySection } from "../../api/getTaskBySection";
// import MapView from "../../components/MapView";
// import SideMenu from "../../components/SideMenu";
// import { SectionsAndTasks} from "../../components/SectionsAndTask"; 
// import { Box, Typography, Grid, Button, List, ListItem, ListItemText, Collapse, IconButton } from "@mui/material";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import CreatePDFButton from "../../components/CreatePDFButton";
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


// export default function ProjectInfo() {
//   const { projectId } = useParams();
//   const [project, setProject] = useState(null);
//   const [selectedSectionKey, setSelectedSectionKey] = useState(null);
//   const [expanded, setExpanded] = useState(false);
//   const [taskData, setTaskData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (projectId) {
//       getProjectById(projectId)
//         .then((projectData) => {
//           setProject(projectData);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching project data:", error);
//           setLoading(false);
//         });
//     }
//   }, [projectId]);

//   useEffect(() => {
//     if (projectId && selectedSectionKey) {
//       getTaskBySection(projectId, selectedSectionKey)
//         .then((tasks) => {
//           setTaskData(tasks);
//         })
//         .catch((error) => {
//           console.error("Error fetching tasks:", error);
//         });
//     }
//   }, [projectId, selectedSectionKey]);

//   if (loading) {
//     return <p>Cargando proyecto...</p>;
//   }

//   if (!project) {
//     return <p>No se encontró el proyecto</p>;
//   }

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <>
//     <Box display="flex" sx={{ backgroundColor: "#EDF5F4", paddingTop: "2em" }}>
//         <SideMenu />
//         <Box flex="1" p={3}>
//           <IconButton
//             onClick={handleExpandClick}
//             aria-expanded={expanded}
//             aria-label="mostrar más"
//           >
//             {expanded ?  <ExpandLessIcon />  : <Typography> Ver datos<ExpandMoreIcon /></Typography>}
//           </IconButton>
//           <Collapse in={expanded} timeout="auto" unmountOnExit>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Box border={1} display={"flex"} flexDirection={"column"} borderRadius={2} p={2} backgroundColor="#fff" borderColor="#ccc" textAlign={"left"} lineHeight={"2"}>
//                   <Typography variant="h5">Datos</Typography>
//                   <Typography variant="body1"><strong>Nombre del proyecto: </strong>{project.projectName}</Typography>
//                   <Typography variant="body1"><strong>Identificador: </strong>{project.identifier}</Typography>
//                   <Typography variant="body1"><strong>Empresa contratante: </strong>{project.hiringCompany}</Typography>
//                   <Typography variant="body1"><strong>Tipo de Proyecto: </strong>{project.typeOfWork}</Typography>
//                   <Typography variant="body1"><strong>Tipo de construcción: </strong>{project.constructionType}</Typography>
//                   <Typography variant="body1"><strong>Descripción general del proyecto: </strong>{project.projectDescription}</Typography>
//                   <Typography variant="body1"><strong>Fecha de inicio: </strong>{project.startDate}</Typography>
//                   <Typography variant="body1"><strong>Fecha de entrega: </strong>{project.endDate}</Typography>
//                   <Typography variant="body1"><strong>Estado:</strong>{project.status}</Typography>
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Box border={1} borderRadius={2} p={2} backgroundColor="#fff" borderColor="#ccc" textAlign={"left"}>
//                   <Typography variant="h5">Dirección</Typography>
//                   <Typography variant="body1"><strong>Dirección:</strong>{project.addressDescription}</Typography>
//                   <Typography variant="body1"><strong>Bloque:</strong>{project.block}</Typography>
//                   <Typography variant="body1"><strong>No.:</strong>{project.unit}</Typography>
//                   <Typography variant="body1"><strong>Código Postal:</strong>{project.zipCode}</Typography>
//                   <Typography variant="body1"><strong>Provincia:</strong>{project.province}</Typography>
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Box border={1} borderRadius={2} p={2} backgroundColor="#fff" borderColor="#ccc">
//                   <Typography variant="h5">Mapa</Typography>
//                   <MapView />
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Box border={1} borderRadius={2} p={2} backgroundColor="#fff" borderColor="#ccc">
//                   <Typography variant="h5">Imagen general del proyecto</Typography>
//                   <Box sx={{ marginTop: "1em" }}>
//                     {project.image && <img src={project.image} alt="Project" width="100%" />}
//                   </Box>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Collapse>

//           {/* Visualización de secciones y tareas */}
//           <Box display="flex" mt={3} backgroundColor={"#fff"} borderRadius={"10px"}>
//             <Box width="25%" borderRight={1} borderColor="#ccc">
//               <Typography variant="body1" sx={{ padding: 1 }}>Secciones activas del proyecto</Typography>
//               <List>
//                 {Object.keys(project.sections).map((key) => (
//                   <ListItem key={key} onClick={() => setSelectedSectionKey(key)}>
//                     <ListItemText primary={key.charAt(0).toUpperCase() + key.slice(1)} />
//                     <ArrowForwardIcon/>
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//             <Box flex="1" padding="2em">
//               {selectedSectionKey && (
//                 <>
//                   <Box marginBottom={5}>
//                     <Button
//                       variant="outlined"
//                       sx={{ border: "1px solid #fff" }}
//                       onClick={() => navigate(`/project-create-task/${projectId}/${selectedSectionKey}`)}
//                     >
//                       <Typography variant="body" color={"#000"} paddingRight={1}>
//                         Agregar tarea{" "}
//                       </Typography>
//                       <AddCircleIcon sx={{ color: "#000" }} />
//                     </Button>
//                   </Box>
//                   <SectionsAndTasks 
//                     projectId={projectId} 
//                     sectionKey={selectedSectionKey} 
//                     taskData={taskData} 
//                     setTaskData={setTaskData} 
                    
//                   />
//                   <Box>
//                     <CreatePDFButton
//                       content={[
//                         { text: `Fecha: ${new Date()}` },
//                         { text: `Nombre de Proyecto: ${project.projectName}` },
//                         { text: `Dirección: ${project.addressDescription}` },
//                         { text: `Descripción del proyecto: ${project.projectDescription}` },
//                         { text: `Sección ${sectionKey}: ${section.sectionKey}` },
//                         { text: `Tarea: ${task.taskName}` },
//                         { text: `Descripción: ${task.taskDescription}` },
                        
//                       ]}
//                       imageUrl={imageUrls.prevImages}
//                       imageUrl={imageUrls.finalImages}
//                       // imageUrl={imageUrls.prevImages.concat(
//                       //   imageUrls.finalImages
//                       )}
//                     />
//                   </Box>
//                 </>
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }
