
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/getProjectById";
import IconColors from "../../components/IconColors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteTask } from "../../api/deleteTask";
import { getTaskBySection } from "../../api/getTaskBySection";
import { SectionsAndTask } from "../../components/SectionsAndTasks"
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
        console.log("Project data received:", data);
        setProjectData(data);
        if (data && data.sections && data.sections[sectionKey]) {
          getTaskBySection(projectId, sectionKey).then(tasks => {
            console.log("Task data received:", tasks);
            setTaskData(tasks);
          });
        }
      }).catch(error => {
        console.error("Error fetching project data:", error);  
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
    <>  
    <Box marginBottom={5}  >
   <Button variant="outlined" sx={{border:"1px solid #fff"}} onClick={() => navigate(`/project-create-task/${projectId}/${sectionKey}`)} > 
   <Typography variant="body" color={"#000"} paddingRight={1} >Agregar tarea </Typography>
   <AddCircleIcon sx={{color:"#fff"}} />
  </Button>
    </Box>   
    <Box display={"flex"} justifyContent={"space-evenly"}  > 
    
    <Box
     padding={"2em"} borderRadius={"10px"} ><SectionsAndTask />  </Box>   
    <Box backgroundColor="#ffffff4d" padding={"2em"} borderRadius={"10px"}>
      <Box  marginBottom= "2em">
        <Typography variant="body">{projectData.projectName}</Typography>
        <Typography variant="body" sx={{ mx: 1 }}>
          {projectData.constructionType}
        </Typography>
        <Typography variant="body">Tareas: </Typography>
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
              flexDirection: "column",
              marginTop: "2em",
              justifyContent: "space-around",
              marginBottom: "2em",
              boxShadow: "1px 1px 1px #ccc",
              borderRadius: "10px",
            }}
          >
          <Box sx={{display:"flex" , justifyContent:"space-around"}} >
            <Box sx={{ display: "flex" }}>
              <IconColors />
              <Typography variant="h6" sx={{ marginLeft: "1em" }}>
                {task.taskName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <EditIcon onClick={() => navigate(`/edit-task/${task.taskId}`)} style={{ cursor: 'pointer' }} />
              <DeleteForeverIcon
                sx={{ marginLeft: "1em", color: "red" }}
                onClick={() => deleteTask(task.taskId)}
                style={{ cursor: 'pointer' }}
              />
            </Box>
            </Box>

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
          </Box>
        ))}
      </Box>
      <IconButton onClick={() => navigate(`/project-create-task/${projectId}/${sectionKey}`)}>
       
      </IconButton>
    </Box>
    </Box>
    </>
  );
  
}


