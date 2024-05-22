import { Box, Typography, IconButton } from "@mui/material";
import { getProjectById } from "../api/getProjectById";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IconColors from "./IconColors";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { TranslateSectionName } from "./translateSectionName";  

export function SectionsAndTask() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (projectId) {
      getProjectById(projectId)
        .then((projectData) => {
          setProject(projectData);
        })
        .catch((error) => {
          console.error("Error si esto se muestra es porque no se pudieron traer los datos del getProjectById Frontend:", error);
        });
    }
  }, [projectId]);

  if (!project) {
    return <p>Cargando proyecto...</p>;  
  }

  const sections = project.sections || {};

  return (
    <Box sx={{ width: "90%", margin: "auto" }}>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Secciones Activas del Proyecto
      </Typography>
      {Object.entries(sections).map(([sectionKey, isActive]) => (
        isActive && (
          <Box
            key={sectionKey}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginBottom: 1,
              justifyContent: "space-between",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <IconColors />
            <Typography variant="h6">
              {TranslateSectionName(sectionKey)}
            </Typography>
            <IconButton onClick={() => navigate(`/project-section-tasks/${projectId}/${sectionKey}`)}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        )
      ))}
    </Box>
  );
}
