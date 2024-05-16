


import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/getProjectById";
import IconColors from "../../components/IconColors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import deleteTaskById from "../../api/deleteTaskById";
import { getTaskBySection } from "../../api/getTaskBySection";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";



export default function ProjectSectionTasks() {
  const { projectId, sectionKey } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [taskData, setTaskData] = useState([]);



  useEffect(() => {
    if (projectId) {
      getProjectById(projectId).then(data => {
        setProjectData(data);
        if (data && data.sections && data.sections[sectionKey]) {
          getTaskBySection(projectId, sectionKey).then(setTaskData);
        }
      });
    }
  }, [projectId, sectionKey]);

  if (!projectData) {
    return <div>Cargando datos del proyecto...</div>;
  }

  if (!projectData.sections || !projectData.sections[sectionKey]) {
    return <div>La sección especificada no existe en este proyecto.</div>;
  }

  if (taskData.length === 0) {
    return (
      <Box>
        <Typography>No hay tareas para esta sección.</Typography>
        <EditIcon onClick={() => navigate("/create-task")} style={{ cursor: 'pointer', color: 'blue' }} />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{marginBottom:"2em"}}  >
        <Typography variant="body">{projectData.projectName}</Typography>
        <Typography variant="body" sx={{ mx: 1 }}>
          {projectData.constructionType}
        </Typography>
        <Typography variant="h6">
          Sección: {sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}
        </Typography>
      </Box>

      <Box>
      {taskData.filter(task => task.sectionKey === sectionKey).map((task) => (
          <Box
            key={task.taskId}
            sx={{
              display: "flex",
              marginTop: "2em",
              justifyContent: "space-around",
              marginBottom: "2em",
              boxShadow: "1px 1px 1px #ccc",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <IconColors />
              <Typography variant="h6" sx={{ marginLeft: "1em" }}>
                {task.taskName}
              </Typography>
            </Box>
            <Box>
              <EditIcon onClick={() => navigate(`/edit-task/${task.taskId}`)} style={{ cursor: 'pointer' }} />
              <DeleteForeverIcon
                sx={{ marginLeft: "1em", color: "red" }}
                onClick={() => deleteTaskById(task.taskId)}
                style={{ cursor: 'pointer' }}
              />
            </Box>
           
          </Box>
          
        ))}
      </Box>
      <IconButton onClick={() => navigate(`/project-create-task/${projectId}/${sectionKey}`)}>
      <AddCircleIcon /> 
    </IconButton>
    </Box>
  );
}














