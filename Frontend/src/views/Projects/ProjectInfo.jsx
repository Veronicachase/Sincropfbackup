/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getProjectById } from '../../api/getProjectId'; 
import IconColors from "../../components/IconColors";
import { Box, Typography, IconButton, Collapse, Link } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// aquí hay que agregar desplegable 
function ProjectInfo({ projectId }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGeneralInfo, setShowGeneralInfo] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(projectId);
        setProject(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el proyecto:', error);
      }
    };

    fetchProject();
  }, [projectId]);

  const toggleGeneralInfo = () => {
    setShowGeneralInfo(!showGeneralInfo);
  };

  return (
    <div>
      {loading ? (
        <p>Cargando proyecto...</p>
      ) : project ? (
        <div>
          <Typography variant="h4">{project.projectName} - {project.constructionType}</Typography>
          <IconButton onClick={toggleGeneralInfo}>
            <Typography variant="h5">Información General del Proyecto</Typography>
            {showGeneralInfo ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconButton>
          <Collapse in={showGeneralInfo}>
            <Typography variant="body2"><strong>Contratante:</strong> {project.hiringCompany}</Typography>
            <Typography variant="body2"><strong>Dirección:</strong> {project.address}</Typography>
            <Typography variant="body2"><strong>Descripción:</strong> {project.projectDescription}</Typography>
            <Typography variant="body2"><strong>Fecha de inicio:</strong> {project.startDate}</Typography>
            <Typography variant="body2"><strong>Fecha de entrega:</strong> {project.endDate}</Typography>
            <Typography variant="body2"><strong>Status:</strong> {project.status}</Typography>
            <Box> {project.map} </Box>
          </Collapse>
          <Typography variant="h5">Secciones</Typography>
          {project.sections && project.sections.map((section, index) => (
            <Box key={index}>
              <IconColors status={project.status}/>
              <Typography>{section}</Typography>
              <ArrowForwardIosIcon/>
              <Link to ="/section-detail"></Link>
            </Box>
          ))}
        </div>
      ) : (
        <p>No se encontró el proyecto</p>
      )}
    </div>
  );
}

export default ProjectInfo;
