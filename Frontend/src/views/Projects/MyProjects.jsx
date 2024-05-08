import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconColors from '../../components/IconColors';
import {getAllProjects} from "../../api/getAllProjects"
import { Link, useNavigate } from "react-router-dom";

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
    navigate(`/projects/${projectId}`);
  };

  return (
    <> 
      <Box>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Box 
              key={project.projectId} 
              sx={{ display: "flex", padding: 2, borderBottom: '1px solid #ccc', cursor: 'pointer', backgroundColor: "#EDF5F4" }}
              onClick={() => handleClickProject(project.projectId)}
            >
              <IconColors/>
              <Box> 
                <Typography variant="subtitle1">{project.projectName}</Typography>
                <Typography variant="body2">{project.startDate}</Typography>
              </Box>
              <Box sx={{ display: "flex" }}> 
                <EditIcon /> 
                <Link to={`/project/${project.projectId}`}>
                  <Typography variant="caption">Editar</Typography>
                </Link>
                <ArrowForwardIosIcon/>
                <Link to={`/project/${project.projectId}`}>
                  <Typography variant="caption">Ver</Typography>
                </Link>
              </Box>
            </Box>
          ))
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </>
  );
}
