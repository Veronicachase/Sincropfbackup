
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
    <Box marginBottom={5}  >
    <Button variant="outlined" sx={{border:"1px solid #fff"}} onClick={() => navigate(`/create-new-project`)} > 
    <Typography variant="body" color={"#000"} paddingRight={1} >Agregar Proyecto </Typography>
    <AddCircleIcon sx={{color:"#fff"}} />
   </Button>

     </Box> 
      <Box display="flex" height="100vh">
        <Box width={{ xs: "100%", md: "25%" }} flexShrink={0}>
          <SideMenu />
        </Box>
        <Box
          flexGrow={1}
          overflow="auto"
          padding={2}
        >
          {projects.length > 0 ? (
            projects.map((project) => (
              <Box
                key={project.projectId}
                sx={{
                  display: "flex",
                  padding: 2,
                  border: "1px solid #9e9b9bdc",
                  cursor: "pointer",
                  marginBottom: ".5em",
                  borderRadius: "5px",
                  backgroundColor: "#ffffff4d",
                  justifyContent: "space-between",
                  paddingLeft: "2em",
                  paddingRight: "2em",
                }}
                onClick={() => handleClickProject(project.projectId)}
              >
                <IconColors />
                <Box
                  sx={{
                    textAlign: "left",
                    display: "flex",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">{project.startDate}</Typography>
                  <Typography variant="subtitle1">
                    {project.projectName}
                  </Typography>
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
                  <EditIcon />
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
                  <ArrowForwardIosIcon />
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












