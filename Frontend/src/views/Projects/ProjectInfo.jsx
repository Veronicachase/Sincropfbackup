
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Drawer, Box, List, ListItem, ListItemText, Typography, AppBar, Toolbar, IconButton, ListItemIcon, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { SectionsAndTasks } from "../../components/SectionsAndTask";
import { getProjectById } from "../../api/getProjectById";
import { getTaskBySection } from "../../api/getTaskBySection";
import { HamburgerMenu } from "../../components/HamburguerMenu";
import { sectionMapping } from "../../components/SectionMappingIcons";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const drawerWidth = 240;

const ProjectInfo = () => {
  const { projectId } = useParams(); // No inicialices sectionKey aquí
  const [project, setProject] = useState(null);
  const [selectedSectionKey, setSelectedSectionKey] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newSection, setNewSection] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectData = async () => {
      if (projectId) {
        setLoading(true);
        try {
          const data = await getProjectById(projectId);
          setProject(data);
          if (data.sections && Array.isArray(data.sections)) {
            setSelectedSectionKey(data.sections[0]); // Pre-seleccionar la primera sección
          }
        } catch (error) {
          console.error("Error fetching project data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProjectData();
  }, [projectId]);

  useEffect(() => {
    const fetchTaskData = async () => {
      if (projectId && selectedSectionKey) {
        try {
          const tasks = await getTaskBySection(projectId, selectedSectionKey);
          setTaskData(tasks);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };

    fetchTaskData();
  }, [projectId, selectedSectionKey]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewSection("");
  };

  const handleUpdateSection = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sections/${projectId}/sections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section: newSection }),
      });

      if (!response.ok) {
        throw new Error('No se pudo agregar la nueva sección');
      }

      const result = await response.json();
      console.log('Nueva sección agregada exitosamente:', result);

      // Actualizar el estado del proyecto con la nueva sección
      setProject((prevProject) => ({
        ...prevProject,
        sections: [...prevProject.sections, newSection],
      }));

      handleClose(); // Cerrar el diálogo
    } catch (error) {
      console.error('Error al agregar la sección:', error);
      
    }
  };

  if (loading) return <p>Cargando proyecto...</p>;
  if (!project) return <p>No se encontró el proyecto</p>;

  const drawer = (
    <div>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
        <Typography variant="h6" noWrap>
          Secciones del Proyecto
        </Typography>
        
      </Box>
      <List>
      <HamburgerMenu/>
        {project.sections && project.sections.map((section) => (
          <ListItem
            key={section}
            onClick={() => setSelectedSectionKey(section)}
            sx={{
              borderRadius: '5px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor:"pointer",
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              {sectionMapping[section] ? sectionMapping[section].icon : <ArrowCircleRightIcon />}
            </ListItemIcon>
            <ListItemText primary={sectionMapping[section] ? sectionMapping[section].name : section} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
      >
        Agregar sección
      </Button>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1976d2' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none', cursor:"pointer" } }}
            onClick={() => {/* toggle mobile drawer logic here if needed */}}
          >
            <ArrowCircleRightIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Información del Proyecto
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawer}
        <Button
          variant="contained"
          sx={{
            margin: '10px',
            backgroundColor: '#218BFE',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
          onClick={() => navigate(`/project-info-data/${projectId}`)}
        >
          Datos del proyecto
        </Button>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Toolbar />
        <Box>
          <Button variant="outlined" sx={{ border: "1px solid #1976d2" }} onClick={() => {
            if (selectedSectionKey) {
              navigate(`/project-create-task/${projectId}/${selectedSectionKey}`);
            } else {
              console.error('No sectionKey selected');
            }
          }}>
            Agregar Tarea  <AddCircleIcon sx={{ marginLeft: ".5em", color: "#1976d2" }} /> 
          </Button>
        </Box>
        <SectionsAndTasks projectId={projectId} sectionKey={selectedSectionKey} taskData={taskData} setTaskData={setTaskData} />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Nueva Sección</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingrese el nombre de la nueva sección que desea agregar.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la Sección"
            type="text"
            fullWidth
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleUpdateSection} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectInfo;




// import { useNavigate, useParams } from "react-router-dom";
// import { useState, useEffect } from 'react';
// import { Drawer, Box, List, ListItem, ListItemText, Typography, AppBar, Toolbar, IconButton, ListItemIcon, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
// import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
// import { SectionsAndTasks } from "../../components/SectionsAndTask";
// import { getProjectById } from "../../api/getProjectById";
// import { getTaskBySection } from "../../api/getTaskBySection";
// import { HamburgerMenu } from "../../components/HamburguerMenu";
// import { sectionMapping } from "../../components/SectionMappingIcons";
// import AddCircleIcon from '@mui/icons-material/AddCircle';

// const drawerWidth = 240;

// const ProjectInfo = () => {
//   const { projectId, sectionKey } = useParams();
//   const [project, setProject] = useState(null);
//   const [selectedSectionKey, setSelectedSectionKey] = useState(null);
//   const [taskData, setTaskData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [newSection, setNewSection] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProjectData = async () => {
//       if (projectId) {
//         setLoading(true);
//         try {
//           const data = await getProjectById(projectId);
//           setProject(data);
//           if (data.sections && Array.isArray(data.sections)) {
//             setSelectedSectionKey(data.sections[0]); // Pre-seleccionar la primera sección
//           }
//         } catch (error) {
//           console.error("Error fetching project data:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchProjectData();
//   }, [projectId]);

//   useEffect(() => {
//     const fetchTaskData = async () => {
//       if (projectId && selectedSectionKey) {
//         try {
//           const tasks = await getTaskBySection(projectId, selectedSectionKey);
//           setTaskData(tasks);
//         } catch (error) {
//           console.error("Error fetching tasks:", error);
//         }
//       }
//     };

//     fetchTaskData();
//   }, [projectId, selectedSectionKey]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setNewSection("");
//   };

//   const handleUpdateSection = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/sections/${projectId}/sections`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ section: newSection }),
//       });

//       if (!response.ok) {
//         throw new Error('No se pudo agregar la nueva sección');
//       }

//       const result = await response.json();
//       console.log('Nueva sección agregada exitosamente:', result);

//       // Actualizar el estado del proyecto con la nueva sección
//       setProject((prevProject) => ({
//         ...prevProject,
//         sections: [...prevProject.sections, newSection],
//       }));

//       handleClose(); // Cerrar el diálogo
//     } catch (error) {
//       console.error('Error al agregar la sección:', error);
//       alert('Error al agregar la sección. Por favor, intenta de nuevo.');
//     }
//   };

//   if (loading) return <p>Cargando proyecto...</p>;
//   if (!project) return <p>No se encontró el proyecto</p>;

//   const drawer = (
//     <div>
//       <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
//         <Typography variant="h6" noWrap>
//           Secciones del Proyecto
//         </Typography>
//         <HamburgerMenu />
//       </Box>
//       <List>
//         {project.sections && project.sections.map((section) => (
//           <ListItem
//             key={section}
//             onClick={() => setSelectedSectionKey(section)}
//             sx={{
//               borderRadius: '5px',
//               transition: 'transform 0.2s, box-shadow 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.02)',
//                 boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//               },
//             }}
//           >
//             <ListItemIcon>
//               {sectionMapping[section] ? sectionMapping[section].icon : <ArrowCircleRightIcon />}
//             </ListItemIcon>
//             <ListItemText primary={sectionMapping[section] ? sectionMapping[section].name : section} />
//           </ListItem>
//         ))}
//       </List>
//       <Button
//         variant="outlined"
//         onClick={handleClickOpen}
//       >
//         Agregar sección
//       </Button>
//     </div>
//   );

//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1976d2' }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             sx={{ mr: 2, display: { sm: 'none' } }}
//             onClick={() => {/* toggle mobile drawer logic here if needed */}}
//           >
//             <ArrowCircleRightIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap>
//             Información del Proyecto
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//         }}
//       >
//         {drawer}
//         <Button
//           variant="contained"
//           sx={{
//             margin: '10px',
//             backgroundColor: '#218BFE',
//             '&:hover': {
//               backgroundColor: '#1976d2',
//             },
//           }}
//           onClick={() => navigate(`/project-info-data/${projectId}`)}
//         >
//           Datos del proyecto
//         </Button>
//       </Drawer>

//       <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
//         <Toolbar />
//         <Box >
//           <Button variant="oulined" sx={{ border: "1px solid #1976d2" }} onClick={() => {
//             navigate(`/project-create-task/${projectId}/${sectionKey}`)
//           }}>
//             Agregar Tarea  <AddCircleIcon sx={{ marginLeft: ".5em", color: "#1976d2" }} /> </Button>
//         </Box>
//         <SectionsAndTasks projectId={projectId} sectionKey={selectedSectionKey} taskData={taskData} setTaskData={setTaskData} />
//       </Box>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Agregar Nueva Sección</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Por favor, ingrese el nombre de la nueva sección que desea agregar.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Nombre de la Sección"
//             type="text"
//             fullWidth
//             value={newSection}
//             onChange={(e) => setNewSection(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancelar
//           </Button>
//           <Button onClick={handleUpdateSection} color="primary">
//             Agregar
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default ProjectInfo;



// import { useNavigate, useParams } from "react-router-dom";
// import { sectionMapping } from "../../components/SectionMappingIcons"
// import { getProjectById } from "../../api/getProjectById";
// import { getTaskBySection } from "../../api/getTaskBySection";
// import { Drawer, Box, List, ListItem, ListItemText, Typography, AppBar, Toolbar, IconButton,ListItemIcon } from "@mui/material";
// import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
// import { SectionsAndTasks } from "../../components/SectionsAndTask"
// import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';


// const drawerWidth = 240;

// const ProjectInfo = () => {
//   const { projectId } = useParams();
//   const [project, setProject] = useState(null);
//   const [selectedSectionKey, setSelectedSectionKey] = useState(null);
//   const [taskData, setTaskData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (projectId) {
//       setLoading(true);
//       getProjectById(projectId)
//         .then(data => {
//           setProject(data);
//           setSelectedSectionKey(Object.keys(data.sections)[0]); // Pre-select the first section
//         })
//         .catch(error => console.error("Error fetching project data:", error))
//         .finally(() => setLoading(false));
//     }
//   }, [projectId]);

//   useEffect(() => {
//     if (projectId && selectedSectionKey) {
//       getTaskBySection(projectId, selectedSectionKey)
//         .then(setTaskData)
//         .catch(error => console.error("Error fetching tasks:", error));
//     }
//   }, [projectId, selectedSectionKey]);

//   if (loading) return <p>Cargando proyecto...</p>;
//   if (!project) return <p>No se encontró el proyecto</p>;

//   const drawer = (
//     <div>
//       <Typography variant="h6" noWrap component="div" sx={{ p: 2 }}>
//         Secciones del Proyecto
//       </Typography>
//       <List>
//         {project.sections && Object.keys(project.sections).map((key) => (
//           <ListItem key={key} onClick={() => setSelectedSectionKey(key)}>
//             <ListItemIcon>
//               {sectionMapping[key] ? sectionMapping[key].icon : <ArrowCircleRightIcon/>} 
//             </ListItemIcon>
//             <ListItemText primary={sectionMapping[key] ? sectionMapping[key].name : key} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             sx={{ mr: 2, display: { sm: 'none' } }}
//             onClick={() => {/* toggle mobile drawer logic here if needed */}}
//           >
//             <ArrowCircleRightIcon/>
//           </IconButton>
//           <Typography variant="h6" noWrap>
//             Información del Proyecto
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//         }}
//       >
//         {drawer}
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar />
//         <SectionsAndTasks/>
//       </Box>
//     </Box>
//   );
// };

// export default ProjectInfo;







// import React, { useState, useEffect } from "react";
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
// //import { CreatePDFButton } from "../../components/CreatePDFButton";
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

//   const sectionsWithTasks = taskData.reduce((acc, task) => {
//     if (!acc[task.section]) {
//       acc[task.section] = [];
//     }
//     acc[task.section].push(task);
//     return acc;
//   }, {});

//   return (
//     <>
//       <Box display="flex" sx={{ backgroundColor: "#EDF5F4", paddingTop: "2em" }}>
//         <SideMenu />
//         <Box flex="1" p={3}>
//           <IconButton
//             onClick={handleExpandClick}
//             aria-expanded={expanded}
//             aria-label="mostrar más"
//           >
//             {expanded ?  <ExpandLessIcon />  : <Typography style={{display: "flex"}}> Ver datos<ExpandMoreIcon /></Typography>}
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
//                 </>
//               )}
//             </Box>
//           </Box>

          
//         </Box>
//       </Box>
//     </>
//   );
// }







// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getProjectById } from "../../api/getProjectById"; 
// import { getTaskBySection } from "../../api/getTaskBySection";
// import MapView from "../../components/MapView";
// import SideMenu from "../../components/SideMenu";
// import { SectionsAndTasks } from "../../components/SectionsAndTask"; 
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

//   const sectionsWithTasks = taskData.reduce((acc, task) => {
//     if (!acc[task.section]) {
//       acc[task.section] = [];
//     }
//     acc[task.section].push(task);
//     return acc;
//   }, {});

//   return (
//     <>
//       <Box display="flex" sx={{ backgroundColor: "#EDF5F4", paddingTop: "2em" }}>
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
//                 </>
//               )}
//             </Box>
//           </Box>

//           <Box mt={2}>
//             <Typography>Crear reporte del proyecto</Typography>
//             <CreatePDFButton
//               project={project}
//               tasks={taskData}
//               fileName="project-details.pdf"
//             />
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }




// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getProjectById } from "../../api/getProjectById"; 
// import { getTaskBySection } from "../../api/getTaskBySection";
// import MapView from "../../components/MapView";
// import SideMenu from "../../components/SideMenu";
// import { SectionsAndTasks } from "../../components/SectionsAndTask"; 
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

//   const sectionsWithTasks = taskData.reduce((acc, task) => {
//     if (!acc[task.section]) {
//       acc[task.section] = [];
//     }
//     acc[task.section].push(task);
//     return acc;
//   }, {});

//   return (
//     <>
//       <Box display="flex" sx={{ backgroundColor: "#EDF5F4", paddingTop: "2em" }}>
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
//                 </>
//               )}
//             </Box>
//           </Box>

//           <Box mt={2}>
//             <Typography>Crear reporte del proyecto</Typography>
//             <CreatePDFButton
//               project={project}
//               tasks={taskData}
//               fileName="project-details.pdf"
//             />
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }

















// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getProjectById } from "../../api/getProjectById"; 
// import { getTaskBySection } from "../../api/getTaskBySection";
// import MapView from "../../components/MapView";
// import SideMenu from "../../components/SideMenu";
// import { SectionsAndTasks } from "../../components/SectionsAndTask"; 
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

//   const sectionsWithTasks = taskData.reduce((acc, task) => {
//     if (!acc[task.section]) {
//       acc[task.section] = [];
//     }
//     acc[task.section].push(task);
//     return acc;
//   }, {});

//   return (
//     <>
//       <Box display="flex" sx={{ backgroundColor: "#EDF5F4", paddingTop: "2em" }}>
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
//                 </>
//               )}
//             </Box>
//           </Box>
//            const { taskData }= SectionsAndTask()
//           <Box mt={2}>
//           <Typography>Crear reporte de esta tarea</Typography>
//           <CreatePDFButton
//             content={[
//               project={project}
//               tasks={tasks}
              
//             ]}
//             images={
//               task.prevImages
//                 ? task.prevImages : [])
//                 task.finalImages ? task.finalImages:[]
               
//             }
//           />
//         </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }



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
