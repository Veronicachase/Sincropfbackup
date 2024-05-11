/* eslint-disable react/prop-types */
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initialValues as defaultInitialValues } from "../../forms/Proyectos/CrearProyectoInitialValues";
import { NewProjectFormSchema } from "../../forms/Proyectos/NewProjectFormSchema";
import { getProjectById } from "../../api/getProjectById";
import updateProjectById from "../../api/updateProjectById";
import MapView from "../../components/MapView";
import { useParams } from "react-router-dom";
import {
  Button,
  Grid,
  IconButton,
  Collapse,
  Box,
  Typography,
  
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import IconColors from "../../components/IconColors";
//import ProjectInfoBox from "../../components/ProjectInfoBox";

// falta diseño, confrimar funcionamiento de update y ver mapa e imagenes. 


export default function ProjectInfo() {
  const { projectId, sectionKey } = useParams();
  const [formValues, setFormValues] = useState(defaultInitialValues);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (projectId) {
      getProjectById(projectId)
        .then((projectData) => {
          if (projectData) {setFormValues({ ...defaultInitialValues, ...projectData});
          setProject(projectData);
          setLoading(false); 
        } else{console.log("Error al recuperar los datos del proyecto");
        setLoading(false);  }
          
        })
        .catch((error) => {
          console.error("Error al cargar datos del proyecto:", error);
          setLoading(false);
        });
    }
  }, [projectId]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  if (loading) {
    return <p>Cargando proyecto...</p>;
  }

  if (!project) {
    return <p>No se encontró el proyecto</p>;
  }

  const handleSubmit = async (values) => {
    try {
      await updateProjectById(projectId, values);
      console.log("estos son los values que necesito ver",values)
      alert("Datos actualizados");
    } catch (error) {
      alert("Error al editar. Por favor, intenta de nuevo.");
    }
  };

  return (
    <>  
      <Box sx={{ textAlign: "left", marginLeft: "2em" }}>
        <Typography variant="h5">
          {project.projectName} - {project.constructionType}
        </Typography>
        <IconButton onClick={toggleForm}>
          <Typography variant="h5">Editar Información del Proyecto</Typography>
          {showForm ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
        <Collapse in={showForm}>
          <Formik
            initialValues={formValues}
            enableReinitialize={true}
            validationSchema={NewProjectFormSchema}
            onSubmit={handleSubmit}
          >
            {formik => (
              <Form>
                {Object.entries(formik.values).filter(([key]) => !['projectId', 'filesId', 'employeeId', 'userId','taskDescription','sections','area','addedSection', 'createTask','portal'].includes(key)).map(([key]) => (
                  <Box  key={key}  > 
                  <Grid key={key} item xs={12} md={6}>
                    <Box sx={{border:"1px solid #ccc",
                     marginBottom:".5em", 
                     paddingTop:"10px",
                     paddingBottom:"10px",
                    borderRadius:"5px"}}> 
                    <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').trim()}: </label>
                    <Field id={key} name={key} as="input" />
                    </Box>
                  </Grid>
                  {key === 'map' && (
                    <MapView 
                      setFieldValue={(lat, lng) => {
                        formik.setFieldValue('latitude', lat);
                        formik.setFieldValue('longitude', lng);
                      }} 
                    />
                  )}
                  </Box>

                ))}
                <Button  type="submit">Guardar Cambios</Button>
                <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
              </Form>
            )}
          </Formik>
        </Collapse>

        {/* Visualización de secciones activas fuera del Collapse */}
        <Typography variant="h5" sx={{ marginTop: 2 }}>Secciones Activas del Proyecto</Typography>
        {project.sections &&
          Object.entries(project.sections).map(
            ([sectionKey, isActive]) =>
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
                <IconColors/>
                  <Typography variant="h6">{sectionKey.replace(/([a-z])([A-Z])/g, '$1 $2')}</Typography>
                  <IconButton onClick={() => navigate(`/project-info-task/${projectId}/${sectionKey}`)}>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>
              )
          )}
      </Box>
    </>
  );
}