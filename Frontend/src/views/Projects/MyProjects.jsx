
import { Box, Typography, Button, IconButton, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconColors from '../../components/IconColors';
import SideMenu from '../../components/SideMenu';
import { getAllProjects } from '../../api/getAllProjects';
import { deleteProject } from '../../api/deleteProject';
import { useEffect, useState } from 'react';

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getAllProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error de conexión:', error);
        setError('No se puede conectar al servidor');
      }
    };

    fetchProjects();
  }, []);

  const handleClickProject = (projectId) => {
    navigate(`/project-info/${projectId}`);
  };

  const handleDelete = async (projectId) => {
    const confirmed = window.confirm(
      '¿Estas seguro que quiere borrar el proyecto? No podrás recuperar los datos.'
    );
    if (!confirmed) return;

    try {
      await deleteProject(projectId);
      setProjects((prevProjects) => prevProjects.filter((project) => project.projectId !== projectId));
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
    }
  };

  return (
    <>
      <Box display="flex" height="100vh" sx={{ borderRadius: '5px' }}>
        <Box width={{ xs: '100%', md: '25%' }} flexShrink={0}>
          <SideMenu />
        </Box>
        <Box flexGrow={1} overflow="auto" padding={2} sx={{ marginLeft: { xs: 0, md: 3 }, backgroundColor: '#f5f5f5' }}>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={5}>
            <Typography variant="h4" color={'#333'}>
              Lista de proyectos
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#1976d2', color: '#fff' }}
              onClick={() => navigate(`/create-new-project`)}
              startIcon={<AddCircleIcon />}
            >
              Agregar Proyecto
            </Button>
          </Box>

          {projects.length > 0 ? (
            projects.map((project) => (
              <Box
                key={project.projectId}
                sx={{
                  display: 'flex',
                  padding: 2,
                  cursor: 'pointer',
                  marginBottom: '.5em',
                  color: '#333',
                  borderRadius: '5px',
                  backgroundColor: '#fff',
                  justifyContent: 'space-between',
                  paddingLeft: '2em',
                  paddingRight: '2em',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  },
                }}
                onClick={() => handleClickProject(project.projectId)}
              >
                <Box
                  sx={{
                    textAlign: 'left',
                    display: 'flex',
                    gap: 3,
                    alignItems: 'center',
                  }}
                >
                  <IconColors />
                  <Typography variant="h6">{project.projectName}</Typography>
                  <Typography variant="body2" color="textSecondary">{project.startDate}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project-edit-info/${project.projectId}`);
                      }}
                    >
                      <EditIcon sx={{ color: '#1976d2' }} />
                    </IconButton>
                    <Typography variant="caption">Editar</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project-info/${project.projectId}`);
                      }}
                    >
                      <ArrowForwardIosIcon sx={{ color: '#1976d2' }} />
                    </IconButton>
                    <Typography variant="caption">Ver</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project.projectId);
                      }}
                    >
                      <DeleteForeverIcon sx={{ color: 'red' }} />
                    </IconButton>
                    <Typography variant="caption">Eliminar</Typography>
                  </Box>
                </Box>
              </Box>
            ))
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
    </>
  );
}









// import { useEffect, useState } from "react";
// import { Box, Typography, CircularProgress, Button, IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import IconColors from "../../components/IconColors";
// import { getAllProjects } from "../../api/getAllProjects";
// import { Link, useNavigate } from "react-router-dom";
// import { deleteProject } from "../../api/deleteProject";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import SideMenu from "../../components/SideMenu";
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// export default function MyProjects() {
//   const [projects, setProjects] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const projectsData = await getAllProjects();
//         setProjects(projectsData);
//       } catch (error) {
//         console.error("Error de conexión:", error);
//         setError("No se puede conectar al servidor");
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleClickProject = (projectId) => {
//     navigate(`/project-info/${projectId}`);
//   };

//   const handleDelete = async (projectId) => {
//     const confirmed = window.confirm("¿Estas seguro que quiere borrar el proyecto? No podrás recuperar los datos.");
//     if (!confirmed) return;

//     try {
//       await deleteProject(projectId);
//       setProjects(prevProjects => prevProjects.filter(project => project.projectId !== projectId));
//     } catch (error) {
//       console.error("Error al eliminar el proyecto:", error);
//     }
//   };

//   return (
//     <>
      
//       <Box display="flex" height="90vh" sx={{borderRadius:"5px"}} backgroundColor={"#EDF5F4"}>
//         <Box width={{ xs: "100%", md: "25%" }} flexShrink={0}>
//           <SideMenu />
//         </Box>
//         <Box width={"100%"} overflow="auto" padding={2}>
//         <Box display={"flex"} justifyContent={"space-between"}>     
        
//         <Typography variant="h6" color={"#98A1B4"} marginBottom={2}>Lista de proyectos</Typography>
//         <Box marginBottom={5} display={"flex"} justifyContent={"right"}>
//         <Button variant="outlined" sx={{backgroundColor:"#fff", border:"1px solid #218BFE"}} onClick={() => navigate(`/create-new-project`)}>
//           <Typography variant="body" color={"#218BFE"} paddingRight={1}>Agregar Proyecto</Typography>
//           <AddCircleIcon sx={{color:"#218BFE"}} />
//         </Button>
//       </Box>
//         </Box>
          
//           {projects.length > 0 ? (
//             projects.map((project) => (
//               <Box
//                 key={project.projectId}
//                 sx={{
//                   display: "flex",
//                   padding: 2,
//                   cursor: "pointer",
//                   marginBottom: ".5em",
//                   color:"#98A1B4",
//                   borderRadius: "5px",
//                   backgroundColor: "#fff",
//                   justifyContent: "space-between",
//                   paddingLeft: "2em",
//                   paddingRight: "2em",
//                 }}
//                 onClick={() => handleClickProject(project.projectId)}
//               >
//                 <Box
//                   sx={{
//                     textAlign: "left",
//                     display: "flex",
//                     gap: 3,
//                     alignItems: "center",
//                   }}
//                 >
//                   <IconColors />
//                   <Typography variant="body1">
//                     {project.projectName}
//                   </Typography>
//                   <Typography variant="body2">{project.startDate}</Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       marginRight: "2em",
//                     }}
//                   >
//                     <IconButton onClick={(e) => e.stopPropagation()} component={Link} to={`/project-edit-info/${project.projectId}`}>
//                       <EditIcon sx={{color:"#218BFE"}} />
//                     </IconButton>
//                     <Typography variant="caption">Editar</Typography>
//                   </Box>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                     }}
//                   >
//                     <IconButton onClick={(e) => e.stopPropagation()} component={Link} to={`/project-info/${project.projectId}`}>
//                       <ArrowForwardIosIcon sx={{color:"#218BFE"}} />
//                     </IconButton>
//                     <Typography variant="caption">Ver</Typography>
//                   </Box>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                     }}
//                   >
//                     <IconButton onClick={(e) => {
//                       e.stopPropagation();
//                       handleDelete(project.projectId);
//                     }}>
//                       <DeleteForeverIcon sx={{color:"red"}} />
//                     </IconButton>
//                     <Typography variant="caption">Eliminar</Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             ))
//           ) : error ? (
//             <Typography color="error">{error}</Typography>
//           ) : (
//             <CircularProgress />
//           )}
//         </Box>
//       </Box>
//     </>
//   );
// }





