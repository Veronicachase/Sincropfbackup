import { Box, Typography } from "@mui/material";
import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import {getProjectById} from "../../api/getProjectById"
import IconColors from "../../components/IconColors";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import deleteTaskById from "../../api/deleteTaskById"
import deleteSectionById from "../../api/deleteSeccionById";
import { useParams } from 'react-router-dom';
import { getTaskBySection } from "../../api/getTaskBySection"

/* Aquí debo mostrar las tareas de la sección escogida, si no hay tareas, 
mostrar solo el icono de crear tarea ( cada tarea debe incluir edit y delete) */


export default function ProjectSectionTasks() {
  const { projectId, sectionKey } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null); 
  const [taskData, setTaskData] = useState([]);
 
  useEffect(() => {
    if (projectId) {
    getProjectById(projectId).then(setProjectData); 
    getTaskBySection (projectId,sectionKey).then(setTaskData); 
    
    }
  }, [projectId, sectionKey]);

  if (!projectData) { 
    return <div>No hay tareas creadas...</div>; 
  }
  if (taskData && taskData.length === 0) { 
    return <div>No hay tareas para esta sección.</div>; 
  }

  return (
    <Box>
      <Box>
        <Typography variant="body">{projectData.projectName}</Typography>
        <Typography variant="body">{projectData.constructionType}</Typography>
        <Typography variant="body">{projectData.section}</Typography>
      </Box>
      {projectData.sections && Object.entries(projectData.sections).map(([sectionKey, isActive]) => (
        isActive && (
          <Box key={sectionKey}> 
            <IconColors/>
            <Typography variant="h6">{sectionKey}</Typography>
            <EditIcon onClick={() => console.log('Agregar función de editar sección')}/>
            <DeleteForeverIcon onClick={() => deleteSectionById(projectData.projectId, sectionKey)} />
          </Box>
        )
      ))}
      <Box>
        {taskData.map((task) => (
          <Box key={task.taskId}>
            <IconColors/>
            <Typography variant="h5">{task}</Typography>
            <EditIcon onClick={() => navigate("/project-info-task")}/>
            <DeleteForeverIcon onClick={() => deleteTaskById(task.taskId)}/>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
