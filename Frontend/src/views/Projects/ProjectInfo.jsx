import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/getProjectById";
import MapView from "../../components/MapView";
import SideMenu from "../../components/SideMenu";
import { SectionsAndTask } from "../../components/SectionsAndTasks";
import { Box, Typography, Grid } from "@mui/material";

export default function ProjectInfo() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId)
        .then((projectData) => {
          setProject(projectData);
        })
        .catch((error) => {
          console.error("Error si esto se muestra es porque no se pudieron traer los datos del getProjectById Frontend:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [projectId]);

  if (loading) {
    return <p>Cargando proyecto...</p>;
  }

  if (!project) {
    return <p>No se encontró el proyecto</p>;
  }

  return (
    <> 
      <Box display="flex">
        <SideMenu />
        <Box flex="1" p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box border={1} borderRadius={2} p={2} backgroundColor="#ffffff4d" borderColor="#ccc">
                <Typography variant="h5">Proyecto</Typography>
                <Typography variant="body1">Nombre del proyecto: {project.projectName}</Typography>
                <Typography variant="body1">Identificador: {project.identifier}</Typography>
                <Typography variant="body1">Empresa contratante: {project.hiringCompany}</Typography>
                <Typography variant="body1">Tipo de Proyecto: {project.typeOfWork}</Typography>
                <Typography variant="body1">Tipo de construcción: {project.constructionType}</Typography>
                <Typography variant="body1">Descripción general del proyecto: {project.projectDescription}</Typography>
                <Typography variant="body1">Fecha de inicio: {project.startDate}</Typography>
                <Typography variant="body1">Fecha de entrega: {project.endDate}</Typography>
                <Typography variant="body1">Estado: {project.status}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box border={1} borderRadius={2} p={2} backgroundColor="#ffffff4d" borderColor="#ccc">
                <Typography variant="h5">Dirección</Typography>
                <Typography variant="body1">Dirección: {project.addressDescription}</Typography>
                <Typography variant="body1">Bloque: {project.block}</Typography>
                <Typography variant="body1">No.: {project.unit}</Typography>
                <Typography variant="body1">Código Postal: {project.zipCode}</Typography>
                <Typography variant="body1">Provincia: {project.province}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box border={1} borderRadius={2} p={2} backgroundColor="#ffffff4d" borderColor="#ccc">
                <Typography variant="h5">Mapa</Typography>
                <MapView />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box border={1} borderRadius={2} p={2} backgroundColor="#ffffff4d" borderColor="#ccc">
                <Typography variant="h5">Imagen</Typography>
                {project.image && <img src={project.image} alt="Project" width="100%" />}
              </Box>
            </Grid>
          </Grid>
          
          {/* Visualización de secciones activas fuera de los grupos */}
          <SectionsAndTask />
        </Box>
      </Box>
    </>
  );
}
