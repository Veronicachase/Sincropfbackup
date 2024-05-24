import { useState } from "react";
import { Box, Typography, IconButton, Collapse, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { deleteTask, } from "../api/deleteTask"; 
import { updateTaskStatus } from "../api/updateTaskByStatus"

export const SectionsAndTasks = ({ projectId, sectionKey, taskData, setTaskData }) => {
  const navigate = useNavigate();
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTaskData(prevTasks => prevTasks.filter(task => task.taskId !== taskId));
      alert("Tarea eliminada correctamente");
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
      alert("Error al eliminar la tarea");
    }
  };

  const handleToggleExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      setTaskData(prevTasks =>
        prevTasks.map(task =>
          task.taskId === taskId ? { ...task, status: newStatus } : task
        )
      );
      alert(`Estado actualizado a: ${newStatus}`);
    } catch (error) {
      console.error("Error cambiando el estado de la tarea:", error);
      alert("Error al cambiar el estado de la tarea");
    }
  };

  if (taskData.length === 0) {
    return (
      <Box>
        <Typography>No hay tareas para esta sección.</Typography>
        <EditIcon onClick={() => navigate(`/create-task/${projectId}/${sectionKey}`)} style={{ cursor: "pointer", color: "blue" }} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6">Sección: {sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}</Typography>
      {taskData.map((task) => (
        <Box key={task.taskId} sx={{ marginTop: "2em", marginBottom: "2em", boxShadow: "1px 1px 1px #ccc", borderRadius: "10px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">{task.taskName}</Typography>
            <Box>
              <IconButton onClick={() => navigate(`/edit-task/${task.taskId}`)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteTask(task.taskId)}>
                <DeleteForeverIcon sx={{ color: "red" }} />
              </IconButton>
              <IconButton onClick={() => handleToggleExpand(task.taskId)}>
                {expandedTaskId === task.taskId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
          </Box>
          <Collapse in={expandedTaskId === task.taskId}>
            <Box sx={{ padding: "1em", backgroundColor: "#f9f9f9" }}>
              <Typography variant="body1">{task.description}</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {task.prevImages && task.prevImages.map((url, index) => (
                  <img key={index} src={url} alt={`Preview ${index}`} style={{ maxWidth: "100px", margin: "5px" }} />
                ))}
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {task.finalImages && task.finalImages.map((url, index) => (
                  <img key={index} src={url} alt={`Final ${index}`} style={{ maxWidth: "100px", margin: "5px" }} />
                ))}
              </Box>
              <Box sx={{ marginTop: "2em", marginBottom: "2em" }}>
                <Typography variant="body2">Estado de la tarea</Typography>
                <Button
                  sx={{ backgroundColor: "#F2CB05", margin: "1em" }}
                  variant={task.status === "iniciado" ? "contained" : "outlined"}
                  onClick={() => handleStatusChange(task.taskId, "iniciado")}
                >
                  Iniciado
                </Button>
                <Button
                  sx={{ border: "1px solid #fff", color: "#fff" }}
                  variant={task.status === "terminado" ? "contained" : "outlined"}
                  onClick={() => handleStatusChange(task.taskId, "terminado")}
                >
                  Terminado
                </Button>
              </Box>
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

SectionsAndTasks.propTypes = {
  projectId: PropTypes.string.isRequired,
  sectionKey: PropTypes.string.isRequired,
  taskData: PropTypes.array.isRequired,
  setTaskData: PropTypes.func.isRequired, 
};













// import { useState } from "react";
// import { Box, Typography, IconButton, Collapse } from "@mui/material";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { useNavigate } from "react-router-dom";
// import PropTypes from 'prop-types';
// import { deleteTask } from "../api/deleteTask"; 
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// export const SectionsAndTasks = ({ projectId, sectionKey, taskData, setTaskData }) => {
//   const navigate = useNavigate();
//   const [expandedTaskId, setExpandedTaskId] = useState(null);

//   const handleDeleteTask = async (taskId) => {
//     try {
//       await deleteTask(taskId);
    
//       setTaskData(prevTasks => prevTasks.filter(task => task.taskId !== taskId));
//       alert("Tarea eliminada correctamente");
//     } catch (error) {
//       console.error("Error eliminando la tarea:", error);
//       alert("Error al eliminar la tarea");
//     }
//   };

//   const handleToggleExpand = (taskId) => {
//     setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
//   };

//   if (taskData.length === 0) {
//     return (
//       <Box>
//         <Typography>No hay tareas para esta sección.</Typography>
//         <EditIcon onClick={() => navigate(`/create-task/${projectId}/${sectionKey}`)} style={{ cursor: "pointer", color: "blue" }} />
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Typography variant="h6">Sección: {sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}</Typography>
//       {taskData.map((task) => (
//         <Box key={task.taskId} sx={{ marginTop: "2em", marginBottom: "2em", boxShadow: "1px 1px 1px #ccc", borderRadius: "10px" }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Typography variant="h6">{task.taskName}</Typography>
//             <Box>
//               <IconButton onClick={() => navigate(`/edit-task/${task.taskId}`)}>
//                 <EditIcon />
//               </IconButton>
//               <IconButton onClick={() => handleDeleteTask(task.taskId)}>
//                 <DeleteForeverIcon sx={{ color: "red" }} />
//               </IconButton>
//               <IconButton onClick={() => handleToggleExpand(task.taskId)}>
//                 {expandedTaskId === task.taskId ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
//               </IconButton>
//             </Box>
//           </Box>
//           <Collapse in={expandedTaskId === task.taskId}>
//             <Box sx={{ padding: "1em", backgroundColor: "#f9f9f9" }}>
//               <Typography variant="body1">{task.description}</Typography>
//               <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//                 {task.prevImages && task.prevImages.map((url, index) => (
//                   <img key={index} src={url} alt={`Preview ${index}`} style={{ maxWidth: "100px", margin: "5px" }} />
                  
//                 ))}
//               </Box>
//               <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//                 {task.finalImages && task.finalImages.map((url, index) => (
//                   <img key={index} src={url} alt={`Final ${index}`} style={{ maxWidth: "100px", margin: "5px" }} />
//                 ))}
//               </Box>
//             </Box>
//           </Collapse>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// SectionsAndTasks.propTypes = {
//   projectId: PropTypes.string.isRequired,
//   sectionKey: PropTypes.string.isRequired,
//   taskData: PropTypes.array.isRequired,
//   setTaskData: PropTypes.func.isRequired, 
// };


