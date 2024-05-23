
import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconColors from "../../components/IconColors";
import { getAllProjects } from "../../api/getAllProjects";
import { Link, useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SideMenu from "../../components/SideMenu";


export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getAllProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error de conexión:", error);
        setError("No se puede conectar al servidor");
      }
    };

    fetchProjects();
  }, []);

  const handleClickProject = (projectId) => {
    navigate(`/project-info/${projectId}`);
  };

  return (
    <>
    <Box marginBottom={5} display={"flex"} justifyContent={"right"} >
    <Button variant="outlined" sx={{backgroundColor:"#fff", border:"1px solid #218BFE"}} onClick={() => navigate(`/create-new-project`)} > 
    <Typography variant="body" color={"#218BFE"} paddingRight={1} >Agregar Proyecto </Typography>
    <AddCircleIcon sx={{color:"#218BFE"}} />
   </Button>
   
     </Box> 
      <Box display="flex"  height="90vh" sx={{borderRadius:"5px"}}   >
        <Box width={{ xs: "100%", md: "25%" }} flexShrink={0}>
          <SideMenu/>
        </Box>
        <Box 

          width={"100%"}
          overflow="auto"
          padding={2}
        >
        <Typography variant="h5" color={"#98A1B4"} marginBottom={2}>Lista de proyectos</Typography>
          {projects.length > 0 ? (
            
            projects.map((project) => (
              <Box
                key={project.projectId}
                sx={{
                  display: "flex",
                  padding: 2,
                  cursor: "pointer",
                  marginBottom: ".5em",
                  color:"#98A1B4",
                  borderRadius: "5px",
                  backgroundColor: "#fff",
                  justifyContent: "space-between",
                  paddingLeft: "2em",
                  paddingRight: "2em",
                }}
                onClick={() => handleClickProject(project.projectId)}
              >
                
                <Box
                
                  sx={{
                    textAlign: "left",
                    display: "flex",
                    gap: 3,
                    alignItems: "center",
                   
                    
                  }}
                >
                <IconColors />
                <Typography variant="h5">
                    {project.projectName}
                  </Typography>
                  <Typography variant="subtitle1">{project.startDate}</Typography>
           
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "2em",
                    }}
                  >
                  <IconButton onClick={(e) => e.stopPropagation()} component={Link} to={`/project-edit-info/${project.projectId}`}>
                  <EditIcon sx={{color:"#218BFE"}} />
                </IconButton>
                <Typography variant="caption">Editar</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <IconButton onClick={(e) => e.stopPropagation()} component={Link} to={`/project-info/${project.projectId}`}>
                  <ArrowForwardIosIcon sx={{color:"#218BFE"}} />
                </IconButton>
                <Typography variant="caption">Ver</Typography>
                  
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












