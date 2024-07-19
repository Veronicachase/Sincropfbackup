import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/getProjectById";
import { getTaskBySection } from "../../api/getTaskBySection";
import { sectionMapping } from "../../components/SectionMappingIcons";
import MapView from "../../components/MapView";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  useMediaQuery,
} from "@mui/material";
import CreatePDFButtonPData from "../../components/CreatePDFButtonData";

export default function ProjectinfoData() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId)
        .then((projectData) => {
          setProject(projectData);
          setLoading(false);
          projectData.sections.forEach((section) => {
            getTaskBySection(projectId, section)
              .then((taskData) => {
                setTasks((prevTasks) => ({
                  ...prevTasks,
                  [section]: taskData,
                }));
              })
              .catch((error) => {
                console.error(
                  `Error fetching tasks for section ${section}:`,
                  error
                );
              });
          });
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

  const sectionsWithTasks = project.sections.filter(
    (section) => tasks[section] && tasks[section].length > 0
  );

  return (
    <>
      <Button
        sx={{ marginBottom: "2em", marginTop: "2em" }}
        variant="contained"
        onClick={() => navigate(`/project-info/${projectId}`)}
      >
        Volver a Tareas
      </Button>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          paddingTop: "1em",
          width: isMobile ? "100%" : "800px",
          margin: "0 auto",
        }}
      >
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Card sx={{ width: "100%", marginBottom: 2 }}>
              <CardActionArea>
                <CardContent>
                  <Typography
                    sx={{ textAlign: "left" }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    Datos del Proyecto
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    <strong>Nombre del proyecto: </strong>
                    {project.projectName}
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    <strong>Identificador: </strong>
                    {project.identifier}
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    <strong>Empresa contratante: </strong>
                    {project.hiringCompany}
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    <strong>Tipo de Proyecto: </strong>
                    {project.typeOfWork}
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    <strong>Tipo de construcción: </strong>
                    {project.constructionType}
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    <strong>Descripción general del proyecto: </strong>
                    {project.projectDescription}
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    <strong>Fecha de inicio: </strong>
                    {project.startDate}
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    <strong>Fecha de entrega: </strong>
                    {project.endDate}
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    <strong>Estado:</strong>
                    {project.status}
                  </Typography>
                </CardContent>
                {project.image && (
                  <CardMedia
                    component="img"
                    alt="Project"
                    height="auto"
                    image={project.image}
                    title="Imagen general del proyecto"
                  />
                )}
              </CardActionArea>
            </Card>
          </Grid>

          
          <Grid item xs={12}>
            <Card sx={{ width : isMobile? "100%": "800px", minWidth:"355px" }}>
              <CardActionArea>
                <CardContent>
                  <Typography
                    sx={{ textAlign: "left" }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    Dirección
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    <strong>Dirección:</strong>
                    {project.addressDescription}
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    <strong>Bloque:</strong>
                    {project.block}
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    <strong>No.:</strong>
                    {project.unit}
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    <strong>Código Postal:</strong>
                    {project.zipCode}
                  </Typography>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    <strong>Provincia:</strong>
                    {project.province}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography
                    sx={{ textAlign: "left" }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    Mapa
                  </Typography>
                  <Box
                    border={1}
                    borderRadius={2}
                    p={2}
                    backgroundColor="#fff"
                    borderColor="#fff"
                  >
                    <MapView />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>

      
      <Box sx={{ width: isMobile ? "100%" : "800px", margin: "0 auto" }}>
        {sectionsWithTasks.map((section) => (
          <Box key={section} sx={{ marginBottom: "2em" }}>
            <Typography
              sx={{ textAlign: "left", marginBottom: "1em", marginTop: "1em", padding:"1em" }}
              variant="h5"
            >
              {sectionMapping[section]?.icon} {sectionMapping[section]?.name || section}
            </Typography>
            {tasks[section] &&
              tasks[section].map((task) => (
                <Box
                  key={task.taskId}
                  id={`task-${task.taskId}`}
                  sx={{
                    margin:"3 auto",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding:"1em",
                    backgroundColor: "#fff",
                    justifyContent: "left",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                    },
                    width: "100%",
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="h6"
                      sx={{ cursor: "pointer", textAlign: "left" }}
                    >
                      {task.taskName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        textAlign: "left",
                        marginBottom: 3,
                        marginTop: 3,
                      }}
                    >
                      {task.taskDescription}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        textAlign: "left",
                        marginBottom: 3,
                        marginTop: 3,
                      }}
                    >
                      Fecha de inicio: {task.startDate}, Fecha de terminación:{" "}
                      {task.endDate}
                    </Typography>
                  </Box>

                  <Box>
                    <Box display="flex" flexDirection={isMobile ? "column" : "row"} width= {isMobile? "auto" : "400px"} sx={{gap:1}} >

                      {task.prevImages &&
                        task.prevImages.map((image, index) => (
                          <CardMedia
                            key={index}
                            component="img"
                            alt={`Prev Image ${index + 1}`}
                            height="200"
                            
                            image={image}
                            title={`Prev Image ${index + 1}`}
                            sx={{marginBottom:"1em"}}
                          />
                        ))}
                    </Box>
                    
                    <Box display="flex" flexDirection={isMobile ? "column" : "row"} marginBottom={isMobile ? "1em" : "auto"} width= {isMobile? "auto" : "400px"}sx={{gap:1}} >
                      {task.finalImages &&
                        task.finalImages.map((image, index) => (
                          <CardMedia
                            key={index}
                            component="img"
                            alt={`Final Image ${index + 1}`}s
                            height="200"
                            image={image}
                            title={`Final Image ${index + 1}`}
                          />
                        ))}
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        ))}
      </Box>

      <Box sx={{ marginTop: "2em" }}>
        <CreatePDFButtonPData
          project={project}
          tasks={tasks}
          fileName={`reporte_Proyecto_${project.projectName}.pdf`}
          projectId={projectId} 
        />
      </Box>
    </>
  );
}
