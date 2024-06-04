
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Drawer, Box, List, ListItem, ListItemText, Typography, AppBar, Toolbar, IconButton, ListItemIcon, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { SectionsAndTasks } from "../../components/SectionsAndTask";
import { getProjectById } from "../../api/getProjectById";
import { getTaskBySection } from "../../api/getTaskBySection";
import { HamburgerMenu } from "../../components/HamburguerMenu";
import { sectionMapping } from "../../components/SectionMappingIcons";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const drawerWidth = 240;

const ProjectInfo = () => {
  const { projectId } = useParams(); 
  const [project, setProject] = useState(null);
  const [selectedSectionKey, setSelectedSectionKey] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newSection, setNewSection] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectData = async () => {
      if (projectId) {
        setLoading(true);
        try {
          const data = await getProjectById(projectId);
          setProject(data);
          if (data.sections && Array.isArray(data.sections)) {
            setSelectedSectionKey(data.sections[0]); // Pre-seleccionar la primera sección
          }
        } catch (error) {
          console.error("Error fetching project data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProjectData();
  }, [projectId]);

  useEffect(() => {
    const fetchTaskData = async () => {
      if (projectId && selectedSectionKey) {
        try {
          const tasks = await getTaskBySection(projectId, selectedSectionKey);
          setTaskData(tasks);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
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

  const handleUpdateSection = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sections/${projectId}/sections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section: newSection }),
      });

      if (!response.ok) {
        throw new Error('No se pudo agregar la nueva sección');
      }

      const result = await response.json();
      console.log('Nueva sección agregada exitosamente:', result);

      // Actualizar el estado del proyecto con la nueva sección
      setProject((prevProject) => ({
        ...prevProject,
        sections: [...prevProject.sections, newSection],
      }));

      handleClose(); // Cerrar el diálogo
    } catch (error) {
      console.error('Error al agregar la sección:', error);
      
    }
  };

  if (loading) return <p>Cargando proyecto...</p>;
  if (!project) return <p>No se encontró el proyecto</p>;

  const drawer = (
    <div>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
        <Typography variant="h6" noWrap>
          Secciones del Proyecto
        </Typography>
        
      </Box>
      <List>
      <HamburgerMenu/>
        {project.sections && project.sections.map((section) => (
          <ListItem
            key={section}
            onClick={() => setSelectedSectionKey(section)}
            sx={{
              borderRadius: '5px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor:"pointer",
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              {sectionMapping[section] ? sectionMapping[section].icon : <ArrowCircleRightIcon />}
            </ListItemIcon>
            <ListItemText primary={sectionMapping[section] ? sectionMapping[section].name : section} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
      >
        Agregar sección
      </Button>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1976d2' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none', cursor:"pointer" } }}
            onClick={() => {/* toggle mobile drawer logic here if needed */}}
          >
            <ArrowCircleRightIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Información del Proyecto
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawer}
        <Button
          variant="contained"
          sx={{
            margin: '10px',
            backgroundColor: '#218BFE',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
          onClick={() => navigate(`/project-info-data/${projectId}`)}
        >
          Datos del proyecto
        </Button>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Toolbar />
        <Box>
          <Button variant="outlined" sx={{ border: "1px solid #1976d2" }} onClick={() => {
            if (selectedSectionKey) {
              navigate(`/project-create-task/${projectId}/${selectedSectionKey}`);
            } else {
              console.error('No sectionKey selected');
            }
          }}>
            Agregar Tarea  <AddCircleIcon sx={{ marginLeft: ".5em", color: "#1976d2" }} /> 
          </Button>
        </Box>
        <SectionsAndTasks projectId={projectId} sectionKey={selectedSectionKey} taskData={taskData} setTaskData={setTaskData} />
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
          <Button onClick={handleUpdateSection} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectInfo;


