/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { getProjectById } from "../../api/getProjectById";
import IconColors from "../../components/IconColors";
import { Box, Typography, IconButton, Collapse } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useParams } from "react-router-dom";

/* En esta página debo mostrar en un dropdown todos los datos generales del proyecto
además de las secciones escogidas y creadas previamente, cuando se clica en una sección 
esta debe llevar a su lista de tareas correspondiente. opción de editar y agregar sección */

function ProjectInfo() {
  const { projectId } = useParams();
  const navigate = useNavigate(); 
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGeneralInfo, setShowGeneralInfo] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProjectById(projectId);
        setProject(projectData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el proyecto:", error);
      }
    };

    fetchProject();
  }, [projectId]);

  const toggleGeneralInfo = () => {
    setShowGeneralInfo(!showGeneralInfo);
  };

  if (loading) {
    return <p>Cargando proyecto...</p>;
  }

  if (!project) {
    return <p>No se encontró el proyecto</p>;
  }

  return (
    
    <Box sx={{textAlign:"left", marginLeft:"2em"}}>
      <Typography variant="h5">
        {project.projectName} - {project.constructionType}
      </Typography>
      <IconButton onClick={toggleGeneralInfo}>
        <Typography variant="h5">Información General del Proyecto</Typography>
        {showGeneralInfo ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </IconButton>
      <Collapse in={showGeneralInfo}>
        <Box sx={{ borderBottom: '1px solid #ccc', marginBottom:"1em"}}>
          <Typography variant="body2">
            <strong>Nombre del proyecto:</strong> {project.projectName}
          </Typography>
        </Box>
        <Box sx={{ borderBottom: '1px solid #ccc', marginBottom:"1em"}}>
          <Typography variant="body2">
            <strong>Identificador:</strong> {project.identifier}
          </Typography>
        </Box>
        <Box sx={{ borderBottom: '1px solid #ccc', marginBottom:"1em"}}>
          <Typography variant="body2">
            <strong>Contratante:</strong> {project.hiringCompany}
          </Typography>
        </Box>
        <Box sx={{ borderBottom: '1px solid #ccc', marginBottom:"1em"}}>
          <Typography variant="body2">
            <strong>Dirección:</strong> {project.address}
            {project.block}
            {project.unit}
            {project.zipCode}
            {project.province}
            {project.addressDescription}
          </Typography>
        </Box>
        <Box sx={{ borderBottom: '1px solid #ccc', marginBottom:"1em"}}>
          <Typography variant="body2">
            <strong>Descripción:</strong> {project.projectDescription}
          </Typography>
        </Box>
        <Box sx={{ borderBottom: '1px solid #ccc', marginBottom:"1em"}}>
          <Typography variant="body2">
            <strong>Fecha de inicio:</strong> {project.startDate}
          </Typography>
        </Box>
        <Box sx={{ borderBottom: '1px solid #ccc', marginBottom:"1em"}}>
          <Typography variant="body2">
            <strong>Fecha de entrega:</strong> {project.endDate}
          </Typography>
        </Box>
        <Box sx={{ borderBottom: '1px solid #ccc', marginBottom:"1em"}}>
          <Typography variant="body2">
            <strong>Status:</strong> {project.status}
          </Typography>
        </Box>
        <Box sx={{ borderBottom: '1px solid #ccc', marginBottom:"1em"}}>
          <Typography variant="body2">
            <strong>Mapa:</strong> {project.map} aqui falta detalle para traer
            el mapa
          </Typography>
        </Box>
        <Box sx={{ borderBottom: '1px solid #ccc', marginBottom:"1em"}}>
          {" "}
          <Typography>aqui van la imagenes cambiar map por file</Typography>
          <Box> {project.map} </Box>
        </Box>
      </Collapse>
      <Typography variant="h5">Secciones</Typography>
      {project.sections &&
        Object.entries(project.sections).map(
          ([sectionKey, isActive]) =>
            isActive && (
              <Box
                key={sectionKey}
                sx={{ display: "flex", alignItems: "center", marginBottom: 1, margin: " 1em auto ",  justifyContent:"center" }}
              >
                <IconColors status={project.status} />
                <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 2 }}>
                  {sectionKey}
                </Typography>
                <IconButton onClick={() => navigate("/project-info-task")}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            )
        )}
    </Box>
  );
}

export default ProjectInfo;
