


import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  ListItemIcon,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useMediaQuery,
  Collapse,
} from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { SectionsAndTasks } from "../../components/proyectComponets/SectionsAndTask";
import { getProjectById } from "../../api/projectsAndTaskApis/getProjectById";
import { getTaskBySection } from "../../api/projectsAndTaskApis/getTaskBySection";
import { handleSubmitSection } from "../../api/projectsAndTaskApis/handleSubmitSection";
import { SectionMappingContext } from "../../context/MappingContext";
import { AddButton } from "../../components/generalComponents/AddButton";
import toast from "react-hot-toast";

const drawerWidth = 240;

const ProjectInfo = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [selectedSectionKey, setSelectedSectionKey] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newSection, setNewSection] = useState("");
  const [openSections, setOpenSections] = useState({});
  const { sectionMapping, updateSectionMapping } = useContext(SectionMappingContext);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchProjectData = async () => {
      if (projectId) {
        setLoading(true);
        try {
          const data = await getProjectById(projectId);
          setProject(data);
          if (data.sections && Array.isArray(data.sections)) {
            setSelectedSectionKey(data.sections[0]);

            // Actualizar el mapping con las nuevas secciones si es necesario
            const newSections = data.sections.filter(section => !sectionMapping[section]);
            if (newSections.length > 0) {
              updateSectionMapping(newSections);
            }
          }
        } catch (error) {
          console.error("Error fetching project data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProjectData();
  }, [projectId, sectionMapping, updateSectionMapping]);

  useEffect(() => {
    const fetchTaskData = async () => {
      if (projectId && selectedSectionKey) {
        try {
          const tasks = await getTaskBySection(projectId, selectedSectionKey);
          setTaskData(tasks);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          setTaskData([]);
        }
      } else {
        setTaskData([]);
      }
    };

    fetchTaskData();
  }, [projectId, selectedSectionKey]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewSection("");
  };

  const handleSectionClick = (section) => {
    if (isMobile) {
      setOpenSections(prev => {
        const newState = { ...prev, [section]: !prev[section] };
        if (newState[section]) {
          setSelectedSectionKey(section);
        }
        return newState;
      });
    } else {
      setSelectedSectionKey(section);
    }
  };

  const handleAddSection = async () => {
    try {
      const result = await handleSubmitSection(projectId, newSection);

      if (result) {
        setProject((prevProject) => ({
          ...prevProject,
          sections: [...prevProject.sections, newSection],
        }));

        updateSectionMapping([newSection]);

        handleClose();
        toast.success('La sección ha sido agregada correctamente!');
      } else {
        toast.error("No se ha podido agregar la sección.");
        console.error("Error: No se pudo agregar la sección");
      }
    } catch (error) {
      console.error("Error al agregar la sección:", error);
    }
  };

  if (loading) return <p>Cargando proyecto...</p>;
  if (!project) return <p>No se encontró el proyecto</p>;

  const drawer = (
    <Box sx={{ width: "100%" }}>
      <List>
        {project.sections &&
          project.sections.map((section) => (
            <div key={section}>
              <ListItem
                onClick={() => handleSectionClick(section)}
                sx={{
                  borderRadius: "5px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <ListItemIcon>
                  {sectionMapping[section] ? (
                    sectionMapping[section].icon
                  ) : (
                    <ArrowCircleRightOutlinedIcon />
                  )}
                </ListItemIcon>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <ListItemText
                    primary={
                      sectionMapping[section]
                        ? sectionMapping[section].name
                        : section
                    }
                  />
                  {isMobile ? (
                    <ArrowDropDownIcon sx={{ color: "grey" }} />
                  ) : (
                    <ArrowCircleRightOutlinedIcon sx={{ color: "grey" }} />
                  )}
                </Box>
              </ListItem>
              {isMobile && (
                <Collapse
                  in={openSections[section]}
                  timeout="auto"
                  unmountOnExit
                >
                  <Box sx={{ margin: "0 16px" }}>
                    <SectionsAndTasks
                      projectId={projectId}
                      sectionKey={section}
                      taskData={taskData}
                      setTaskData={setTaskData}
                    />
                    <AddButton
                      buttonText="Agregar Tarea"
                      onClick={() =>
                        navigate(`/project-create-task/${projectId}/${section}`)
                      }
                    />
                  </Box>
                </Collapse>
              )}
            </div>
          ))}
      </List>
      <Box
        sx={{
          marginTop: "2em",
          display: "flex",
          width: isMobile ? "250px" : "100%",
          justifyContent: "center",
        }}
      >
        <AddButton buttonText="Agregar Sección" onClick={handleClickOpen} />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", overflowX: "hidden" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: isMobile ? "100%" : drawerWidth,
          flexShrink: 0,
          top: "64px",
          [`& .MuiDrawer-paper`]: {
            width: isMobile ? "100%" : drawerWidth,
            boxSizing: "border-box",
            top: "64px",
          },
        }}
      >
        {drawer}
        <Button
          variant="contained"
          sx={{
            marginTop: 2,
            width: "200px",
            display: "flex",
            margin: "2em auto",
            backgroundColor: "#218BFE",
            "&:hover": {
              backgroundColor: "#1976d2",
            },
          }}
          onClick={() => navigate(`/project-info-data/${projectId}`)}
        >
          Datos del proyecto
        </Button>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 1, margin: isMobile ? "0 16px" : "0" }}
      >
        <Toolbar />
        {!isMobile && (
          <>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <AddButton
                buttonText="Agregar Tarea"
                onClick={() =>
                  navigate(
                    `/project-create-task/${projectId}/${selectedSectionKey}`
                  )
                }
              />
            </Box>
            <SectionsAndTasks
              projectId={projectId}
              sectionKey={selectedSectionKey}
              taskData={taskData}
              setTaskData={setTaskData}
            />
          </>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Nueva Sección</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingrese el nombre de la nueva sección que desea agregar.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la Sección"
            type="text"
            fullWidth
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAddSection} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectInfo;

