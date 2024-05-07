import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconColors from '../../components/IconColors';
import { Link, useNavigate } from "react-router-dom";

export default function MyProjects() {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/projects/:projectId");
        const data = await response.json();
        if (response.ok) {
          setProjects(data);
        } else {
          console.error("Error al obtener los datos de proyecto", data);
          setError("Error en proyectos");
        }
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
        {projects ? (
          projects.map((project) => (
            <Box 
              key={project.projectId} 
              sx={{ display:"flex", padding: 2, borderBottom: '1px solid #ccc', cursor: 'pointer', backgroundColor:"#EDF5F4" }}
              onClick={() => handleClickProject(project.proyectId)}
            >

             <IconColors/>

            <Box> 
              <Typography variant="subtitle1">{project.projectName}</Typography>
              <Typography variant="body2">{project.startDate}</Typography>
              </Box>
              <Box sx={{display:"flex"}}> 
              <EditIcon /> 
              <Link to="/project/:projectId"></Link>
              <Typography variant="caption">Editar</Typography>
              <ArrowForwardIosIcon/>
              <Link to="/project/:projectId"></Link> 
              <Typography variant="caption">ver</Typography>
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

{/*<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>  
        <Typography variant="h5" component="h5">
          Agregar proyecto
        </Typography>
        <Link to="/new-project">
          <AddCircleIcon sx={{ fontSize: '50px', color: '#021F59', marginLeft: '10px' }} />
        </Link>

</Box>*/}
