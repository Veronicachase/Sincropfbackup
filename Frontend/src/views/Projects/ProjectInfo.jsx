
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/getProjectById"; 
import { getTaskBySection } from "../../api/getTaskBySection"
import MapView from "../../components/MapView";
import SideMenu from "../../components/SideMenu";
import { SectionsAndTasks} from "../../components/SectionsAndTask"; 
import { Box, Typography, Grid, Button, List, ListItem, ListItemText } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import  CreatePDFButton  from "../../components/CreatePDFButton"

export default function ProjectInfo() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [selectedSectionKey, setSelectedSectionKey] = useState(null);
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
  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageUrls((prev) => ({
      ...prev,
      [type]: urls,
    }));
  };

  return (
    <>
      <Box display="flex" sx={{ backgroundColor: "#EDF5F4", paddingTop: "2em" }}>
        <SideMenu />
        <Box flex="1" p={3}>
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

          {/* Visualización de secciones y tareas */}
          <Box display="flex" mt={3}>
            <Box width="25%" borderRight={1} borderColor="#ccc">
              <Typography variant="h6" sx={{ padding: 1 }}>Secciones activas del proyecto</Typography>
              <List>
                {Object.keys(project.sections).map((key) => (
                  <ListItem key={key} onClick={() => setSelectedSectionKey(key)}>
                    <ListItemText primary={key.charAt(0).toUpperCase() + key.slice(1)} />
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
                  <SectionsAndTasks sectionKey={selectedSectionKey} taskData={taskData} setTaskData={setTaskData} />
                  <Box>
                  <CreatePDFButton
                    // content={[
                    //   { text: `Task Name: ${values.taskName}` },
                    //   { text: `Description: ${values.taskDescription}` },
                    // ]}
                    // imageUrl={imageUrls.prevImages.concat(
                    //   imageUrls.finalImages
                    // )}
                  />
                </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
















// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getProjectById } from "../../api/getProjectById";
// import { getTaskBySection } from "../../api/getTaskBySection"
// import MapView from "../../components/MapView";
// import SideMenu from "../../components/SideMenu";
// import { SectionsAndTask }from "../../components/SectionsAndTasks";
// import { Box, Typography, Grid, Button } from "@mui/material";
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// export default function ProjectInfo() {
//   const { projectId, sectionKey } = useParams();
//   const [project, setProject] = useState(null);
//   const [taskData, setTaskData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (projectId) {
//       getProjectById(projectId)
//         .then((projectData) => {
//           setProject(projectData);
//           if (projectData.sections && projectData.sections[sectionKey]) {
//             getTaskBySection(projectId, sectionKey)
//               .then((tasks) => {
//                 setTaskData(tasks);
//               })
//               .catch((error) => {
//                 console.error("Error fetching tasks:", error);
//               })
//               .finally(() => setLoading(false));
//           } else {
//             setLoading(false);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching project data:", error);
//         });
//     }
//   }, [projectId, sectionKey]);

//   if (loading) {
//     return <p>Cargando proyecto...</p>;
//   }

//   if (!project) {
//     return <p>No se encontró el proyecto</p>;
//   }

//   return (
//     <> 
//       <Box display="flex" sx={{ backgroundColor: "#EDF5F4", paddingTop: "2em" }}>
//         <SideMenu />
//         <Box flex="1" p={3} height={300}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Box border={1} display={"flex"} flexDirection={"column"} borderRadius={2} p={2} backgroundColor="#fff" borderColor="#ccc" textAlign={"left"} lineHeight={"2"}>
//                 <Typography variant="h5">Datos</Typography>
//                 <Typography variant="body1"><strong>Nombre del proyecto: </strong>{project.projectName}</Typography>
//                 <Typography variant="body1"><strong>Identificador: </strong>{project.identifier}</Typography>
//                 <Typography variant="body1"><strong>Empresa contratante: </strong>{project.hiringCompany}</Typography>
//                 <Typography variant="body1"><strong>Tipo de Proyecto: </strong>{project.typeOfWork}</Typography>
//                 <Typography variant="body1"><strong>Tipo de construcción: </strong>{project.constructionType}</Typography>
//                 <Typography variant="body1"><strong>Descripción general del proyecto: </strong>{project.projectDescription}</Typography>
//                 <Typography variant="body1"><strong>Fecha de inicio: </strong>{project.startDate}</Typography>
//                 <Typography variant="body1"><strong>Fecha de entrega: </strong>{project.endDate}</Typography>
//                 <Typography variant="body1"><strong>Estado:</strong>{project.status}</Typography>
//               </Box>
//             </Grid>

//             <Grid item xs={12}>
//               <Box border={1} borderRadius={2} p={2} backgroundColor="#fff" borderColor="#ccc" textAlign={"left"}>
//                 <Typography variant="h5">Dirección</Typography>
//                 <Typography variant="body1"><strong>Dirección:</strong>{project.addressDescription}</Typography>
//                 <Typography variant="body1"><strong>Bloque:</strong>{project.block}</Typography>
//                 <Typography variant="body1"><strong>No.:</strong>{project.unit}</Typography>
//                 <Typography variant="body1"><strong>Código Postal:</strong>{project.zipCode}</Typography>
//                 <Typography variant="body1"><strong>Provincia:</strong>{project.province}</Typography>
//               </Box>
//             </Grid>

//             <Grid item xs={12}>
//               <Box border={1} borderRadius={2} p={2} backgroundColor="#fff" borderColor="#ccc">
//                 <Typography variant="h5">Mapa</Typography>
//                 <MapView />
//               </Box>
//             </Grid>

//             <Grid item xs={12}>
//               <Box border={1} borderRadius={2} p={2} backgroundColor="#fff" borderColor="#ccc">
//                 <Typography variant="h5">Imagen general del proyecto</Typography>
//                 <Box sx={{ marginTop: "1em" }}>
//                   {project.image && <img src={project.image} alt="Project" width="100%" />}
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>

//           {/* Visualización de secciones y tareas */}
//           <Box>
//             <Typography variant="h6">Secciones activas del proyecto</Typography>
//             <Typography>Acceso a tareas</Typography>
//             <Box marginBottom={5}>
            
//             </Box>
//             <Box display={"flex"} justifyContent={"space-evenly"}>
//               <Box padding={"2em"} borderRadius={"10px"}>
//                 <SectionsAndTask projectId={projectId} sectionKey={sectionKey} taskData={taskData} />
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }





