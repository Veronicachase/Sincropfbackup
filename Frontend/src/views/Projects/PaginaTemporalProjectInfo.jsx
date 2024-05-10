import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initialValues as defaultInitialValues } from "../../forms/Proyectos/CrearProyectoInitialValues";
import NewProjectFormSchema from "../../forms/Proyectos/NewProjectFormSchema";
import getProjectById from "../../api/getProjectById";
import updateProjectById from "../../api/updateProjectById";
import { Button, Grid, IconButton, Collapse, Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import IconColors from "../../components/IconColors";
import ProjectInfoBox from "../../components/ProjectInfoBox";

export function ProjectInfo({ dataId }) {
  const [formValues, setFormValues] = useState(defaultInitialValues);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (dataId) {
      getProjectById(dataId).then(data => {
        setFormValues({ ...defaultInitialValues, ...data });
        setProject(data);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error al recuperar los datos del proyecto', error);
        setLoading(false);
      });
    }
  }, [dataId]);

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
      await updateProjectById(dataId, values);
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
                {Object.entries(formik.values).map(([key, value]) => (
                  <Grid key={key} item xs={12} md={6}>
                    <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').trim()}: </label>
                    <Field name={key} as="input" />
                  </Grid>
                ))}
                <Button onClick={handleSubmit} type="submit">Guardar Cambios</Button>
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
                    padding: "10px"
                  }}
                >
                <IconColors/>
                  <Typography variant="h6">{sectionKey.replace(/([a-z])([A-Z])/g, '$1 $2')}</Typography>
                  <IconButton onClick={() => navigate("/project-info-task/" + sectionKey)}>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>
              )
          )}
      </Box>
    </>
  );
}


{/* 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { getProjectById } from "../../api/getProjectById";
import IconColors from "../../components/IconColors";
import { Box, Typography, IconButton, Collapse } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useParams } from "react-router-dom";
import ProjectInfoBox from "../../components/ProjectInfoBox";

/* En esta página debo mostrar en un dropdown todos los datos generales del proyecto
además de las secciones escogidas y creadas previamente, cuando se clica en una sección 
esta debe llevar a su lista de tareas correspondiente. opción de editar y agregar sección */

function ProjectInfo() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGeneralInfo, setShowGeneralInfo] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProjectById(projectId);
        setProject(projectData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el proyecto:", error);
      }
    };

    fetchProject();
  }, [projectId]);

  const toggleGeneralInfo = () => {
    setShowGeneralInfo(!showGeneralInfo);
  };

  if (loading) {
    return <p>Cargando proyecto...</p>;
  }

  if (!project) {
    return <p>No se encontró el proyecto</p>;
  }

  return (
    <Box sx={{ textAlign: "left", marginLeft: "2em" }}>
      <Typography variant="h5">
        {project.projectName} - {project.constructionType}
      </Typography>
      <IconButton onClick={toggleGeneralInfo}>
        <Typography variant="h5">Información General del Proyecto</Typography>
        {showGeneralInfo ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </IconButton>
      <Collapse in={showGeneralInfo}>
        <ProjectInfoBox
          name="Nombre del proyecto: "
          property={project.projectName}
        />

        <ProjectInfoBox name="Identificador: " property={project.identifier} />
        <ProjectInfoBox name="Contratante: " property={project.hiringCompany} />
        <ProjectInfoBox
          name="Dirección: "
          property={project.address}
          property1={project.block}
          property2={project.unit}
          property3={project.zipCode}
          property4={project.provice}
          property5={project.addressDescription}
        />
        <ProjectInfoBox
          name="Descripción: "
          property={project.projectDescription}
        />
        <ProjectInfoBox name="Fecha de inicio: " property={project.startDate} />
        <ProjectInfoBox name="Fecha entrega: " property={project.endDate} />
        <ProjectInfoBox name="Estado: " property={project.status} />
        <ProjectInfoBox name="Mapa: " property={project.Map} />

        <Box sx={{ borderBottom: "1px solid #ccc", marginBottom: "1em" }}>
          {" "}
          <Typography>aqui van la imagenes cambiar map por file</Typography>
          <Box> {project.map} </Box>
        </Box>
      </Collapse>
      <Typography variant="h5">Secciones</Typography>
      {project.sections &&
        Object.entries(project.sections).map(
          ([sectionKey, isActive]) =>
            isActive && (
              <Box
                key={sectionKey}
                sx={{
                  width: "80vh",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 1,
                  margin: " 1em auto ",
                  justifyContent: "center",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                }}
              >
                <IconColors status={project.status}  />
                <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 2 }}>
                  {sectionKey}
                </Typography>
                <IconButton onClick={() => navigate("/project-info-task")}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            )
        )}
    </Box>
  );
}

export default ProjectInfo;
     */}
