import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/getProjectById"; 
import MapView from "../../components/MapView"
import { Box, Typography, Grid, Button, Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
import CreatePDFButtonPData from "../../components/CreatePDFButtonData"
export default function ProjectinfoData() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
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

  if (loading) {
    return <p>Cargando proyecto...</p>;
  }

  if (!project) {
    return <p>No se encontró el proyecto</p>;
  }

  return (
    <>
      <Button sx={{ marginBottom: "2em" }} variant="contained" onClick={() => navigate(`/project-info/${projectId}`)}>Tareas</Button>
      <Box display="flex"  alignItems="center" sx={{ paddingTop: "1em" }}>
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12} md={6}>
            <Card sx={{ width: 700, height: 700, marginBottom: 2 }}>
              <CardActionArea>
                <CardContent>
                  <Typography sx={{ textAlign: "left" }} gutterBottom variant="h5" component="div">
                    Datos del Proyecto
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1"><strong>Nombre del proyecto: </strong>{project.projectName}</Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1"><strong>Identificador: </strong>{project.identifier}</Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1"><strong>Empresa contratante: </strong>{project.hiringCompany}</Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1"><strong>Tipo de Proyecto: </strong>{project.typeOfWork}</Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1"><strong>Tipo de construcción: </strong>{project.constructionType}</Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1"><strong>Descripción general del proyecto: </strong>{project.projectDescription}</Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1"><strong>Fecha de inicio: </strong>{project.startDate}</Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1"><strong>Fecha de entrega: </strong>{project.endDate}</Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1"><strong>Estado:</strong>{project.status}</Typography>
                </CardContent>
                {project.image && (
                  <CardMedia
                    component="img"
                    alt="Project"
                    height="400" // Adjust the height of the image as needed
                    image={project.image}
                    title="Imagen general del proyecto"
                  />
                )}
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ width: 700, height: 700 }}>
              <CardActionArea>
                <CardContent>
                  <Typography sx={{ textAlign: "left" }} gutterBottom variant="h5" component="div">
                    Dirección
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1"><strong>Dirección:</strong>{project.addressDescription}</Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1"><strong>Bloque:</strong>{project.block}</Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1"><strong>No.:</strong>{project.unit}</Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1"><strong>Código Postal:</strong>{project.zipCode}</Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1"><strong>Provincia:</strong>{project.province}</Typography>
                </CardContent>
                <CardContent>
                  <Typography sx={{ textAlign: "left" }} gutterBottom variant="h5" component="div">
                    Mapa
                  </Typography>
                  <Box border={1} borderRadius={2} p={2} backgroundColor="#fff" borderColor="#ccc">
                    <MapView />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{marginTop:"2em"}}>    
      <CreatePDFButtonPData project={project}  fileName={`reporte_Proyecto_${project.projectName}.pdf`} />
      </Box>
      </>
  );
}
