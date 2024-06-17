import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SideMenu from "../../components/SideMenu";
import { getAllProjects } from "../../api/getAllProjects";
import { deleteProject } from "../../api/deleteProject";
import { useEffect, useState } from "react";

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

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

  const handleDelete = async (projectId) => {
    const confirmed = window.confirm(
      "¿Estas seguro que quiere borrar el proyecto? No podrás recuperar los datos."
    );
    if (!confirmed) return;

    try {
      await deleteProject(projectId);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.projectId !== projectId)
      );
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        height="100vh"
        sx={{ borderRadius: "5px", marginTop: "2em" }}
      >
        <Box
          width={{ md: "25%" }}
          flexShrink={0}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <SideMenu />
        </Box>
        <Box
          flexGrow={1}
          overflow="auto"
          padding={2}
          sx={{ marginLeft: { xs: 0, md: 0 }, backgroundColor: "#f5f5f5" }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={5}
          >
            <Typography
              variant="h5"
              color={"#333"}
              sx={{
                typography: {
                  xs: "subtitle1",
                  md: "h5",
                },
              }}
            >
              Lista de proyectos
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                fontSize: { xs: "0.75rem" },
              }}
              onClick={() => navigate(`/create-new-project`)}
              startIcon={<AddCircleIcon />}
            >
              Agregar Nuevo
            </Button>
          </Box>

          {projects.length > 0 ? (
            projects.map((project) => (
              <Box
                key={project.projectId}
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  cursor: "pointer",
                  marginBottom: ".5em",
                  color: "#333",
                  borderRadius: "5px",
                  backgroundColor: "#fff",
                  justifyContent: "space-between",
                  padding: 2,
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onClick={() => handleClickProject(project.projectId)}
              >
                <Box
                  sx={{
                    textAlign:  "left",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box display={"flex"} gap={3} alignItems={"center"}>
                    <Typography
                      variant="h6"
                      sx={{
                        typography: {
                          xs: "subtitle1",
                          md: "h6",
                          textAlign: isMobile? "center": "left",
                        },
                      }}
                    >
                      {project.projectName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {project.startDate}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    marginTop: isMobile ? "1em" : 0,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems:"center",
                    }}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project-edit-info/${project.projectId}`);
                      }}
                    >
                      <EditIcon sx={{ color: "#1976d2" }} />
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
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project-info/${project.projectId}`);
                      }}
                    >
                      <ArrowForwardIosIcon sx={{ color: "#1976d2" }} />
                    </IconButton>
                    <Typography variant="caption">Ver</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project.projectId);
                      }}
                    >
                      <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                    <Typography variant="caption">Eliminar</Typography>
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
