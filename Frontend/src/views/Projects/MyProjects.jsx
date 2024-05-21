import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconColors from '../../components/IconColors';
import {getAllProjects} from "../../api/getAllProjects"
import { Link, useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SideMenu from '../../components/SideMenu';

export default  function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
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
    <Box sx={{ display:"flex", width:"100px", backgroundColor:"#ffffff4d", padding:"1em 2em", marginBottom:"1em", borderRadius:"5px"}}> 
    <Typography>Agregar Proyecto</Typography>
    <AddCircleIcon sx={{color:"#fff", fontSize:"40px", padding:".2em"}}/>
    </Box>
      <Box>  
<sideMenu
      <Box>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Box 
              key={project.projectId} 
              sx={{ display: "flex", 
              padding: 2, 
              border: '1px solid #9e9b9bdc', 
              cursor: 'pointer', 
              marginBottom:".5em",
              borderRadius:"5px",
              backgroundColor: "#ffffff4d",
              justifyContent:"space-between" 
               }}
              onClick={() => handleClickProject(project.projectId)}
            >
              <IconColors/>
              <Box sx={{textAlign:"left", display:"flex", gap:3, alignItems:"center"}}> 
              <Typography variant="body2">{project.startDate}</Typography>
                <Typography variant="subtitle1">{project.projectName}</Typography>
                
              </Box>
              <Box sx={{display:"flex", justifyContent:"space-between"}}> 
              <Box sx={{ display: "flex", flexDirection:"column", marginRight:"2em" }}> 
                <EditIcon  /> 
                <Link to={`/project-info/${project.projectId}`}>
                  <Typography variant="caption">Editar</Typography>
                </Link>
                </Box>
                <Box sx={{ display: "flex", flexDirection:"column" }}>
                <ArrowForwardIosIcon/>
                <Link to={`/project-info/${project.projectId}`}>
                  <Typography variant="caption">Ver</Typography>
                </Link>
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
