import { useState } from "react";
import { Box, Typography, IconButton, Collapse, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CreatePDFButton from "../components/CreatePDFButton"; 
import PropTypes from "prop-types";
import { deleteTask } from "../api/deleteTask";

export const SectionsAndTasks = ({ projectId, sectionKey, taskData = [], setTaskData }) => {
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTaskData((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
    }
  };

  const handleToggleExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  return (
    <Box>
      {taskData.length === 0 ? (
        <Typography>No hay tareas para esta sección.</Typography>
      ) : (
        taskData.map((task) => (
          <Box key={task.taskId} sx={{ marginBottom: 3, border: '1px solid #ccc', borderRadius: '5px', padding: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{task.taskName}</Typography>
              <Box>
                <IconButton onClick={() => handleToggleExpand(task.taskId)}>
                  {expandedTaskId === task.taskId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <IconButton onClick={() => handleDeleteTask(task.taskId)}>
                  <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
                <IconButton onClick={() => navigate(`/edit-task/${task.taskId}`)}>
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
            <Collapse in={expandedTaskId === task.taskId}>
              <Box mt={2}>
                <Typography variant="body1"><strong>Descripción: </strong>{task.description}</Typography>
                <Typography variant="body1"><strong>Fecha de inicio: </strong>{task.startDate}</Typography>
                <Typography variant="body1"><strong>Fecha de fin: </strong>{task.endDate}</Typography>
                
                <Box mt={2}>
                  <Typography variant="body1"><strong>Imágenes Iniciales:</strong></Typography>
                  <Box display="flex" flexWrap="wrap">
                    {task.prevImages && task.prevImages.map((image, index) => (
                      <img key={index} src={image} alt={`Inicial ${index}`} style={{ width: "100px", margin: "5px" }} />
                    ))}
                  </Box>
                </Box>
                
                <Box mt={2}>
                  <Typography variant="body1"><strong>Imágenes Finales:</strong></Typography>
                  <Box display="flex" flexWrap="wrap">
                    {task.finalImages && task.finalImages.map((image, index) => (
                      <img key={index} src={image} alt={`Final ${index}`} style={{ width: "100px", margin: "5px" }} />
                    ))}
                  </Box>
                </Box>

                <Box mt={2}>
                  <CreatePDFButton
                    content={[
                      { text: `Fecha: ${new Date().toLocaleDateString()}` },
                      { text: `Nombre de Proyecto: ${task.projectName}` },
                      { text: `Sección: ${sectionKey}` },
                      { text: `Trabajo por hacer: ${task.taskName}` },
                      { text: `Descripción: ${task.description}` },
                      { text: `Fecha de inicio: ${task.startDate}` },
                      { text: `Fecha de fin: ${task.endDate}` },
                    ]}
                    images={task.prevImages ? task.prevImages.concat(task.finalImages || []) : task.finalImages || []}
                  />
                </Box>
              </Box>
            </Collapse>
          </Box>
        ))
      )}
    </Box>
  );
};

SectionsAndTasks.propTypes = {
  projectId: PropTypes.string.isRequired,
  sectionKey: PropTypes.string.isRequired,
  taskData: PropTypes.array.isRequired,
  setTaskData: PropTypes.func.isRequired,
};
