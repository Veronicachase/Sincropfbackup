import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,

} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import { Formik, Form, Field } from 'formik';
import MyButton from '../../components/MyButton';
import '../../assets/styles/estilosGenerales.css';
import VoiceInputNoFormik  from "../../components/VoiceInputNoFormik"

const apiUrl = import.meta.env.VITE_API_URL;
export default function Proyecto() {
  const [isToggled, setIsToggled] = useState(false);
  const [trabajador, setTrabajador] = useState('');
  const [proyecto, setProyecto] = useState({ sections: [] });
  const [selectedSection, setSelectedSection] = useState(null);
  const [error, setError] = useState('');

  const statusIcon = {
    terminado: <CheckCircleIcon sx={{ color: "#8BB443" }} />,
    pendiente: <WarningIcon sx={{ color: "#F2CB05" }} />,
    noIniciado: <DangerousIcon sx={{ color: "#F25244" }} />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${apiUrl}/trabajador`),
          fetch(`${apiUrl}/proyecto-nuevo`)
        ]);
        const trabajadorData = await responses[0].json();
        const proyectoData = await responses[1].json();

        if (responses[0].ok && responses[1].ok) {
          setTrabajador(trabajadorData);
          setProyecto(proyectoData);
        } else {
          setError('Error al obtener datos');
        }
      } catch (error) {
        console.error('Error de conexión:', error);
        setError('No se puede conectar al servidor');
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (section, newStatus) => {
    setProyecto((prevProyecto) => ({
      ...prevProyecto,
      sections: prevProyecto.sections.map(s =>
        s.name === section.name ? { ...s, status: newStatus } : s
      )
    }));
  };

  const toggleVisibility = () => {
    setIsToggled(!isToggled);
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <Box>
      <Button onClick={toggleVisibility} startIcon={<ArrowBackIosIcon />}>
        {isToggled ? "Ocultar Secciones" : "Mostrar Secciones"}
      </Button>
      {isToggled && proyecto.sections.map((section, index) => (
        <Box key={index} sx={{ marginTop: 2, backgroundColor: "#f2faff", padding: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }} onClick={() => handleSectionClick(section)}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ marginRight: 2 }}>{statusIcon[section.status]}</Box>
              <Typography variant="body2">{section.name}</Typography>
            </Box>
          </Box>
        </Box>
      ))}

      {selectedSection && (
        <Formik
          initialValues={{
            area: selectedSection.details?.area || '',
            taskDescription: selectedSection.details?.taskDescription || '',
            image: null
          }}
          onSubmit={(values) => {
            console.log(values);
            // API call to update or create section details
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <Typography variant="h6">Detalles de {selectedSection.name}</Typography>
              <Field as={TextField} name="area" label="Área" fullWidth />
              <Field as={TextField} name="taskDescription" label="Descripción del Trabajo" fullWidth multiline rows={4} />
              <input
                accept="image/*"
                type="file"
                onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                style={{ marginTop: 20 }}
              />
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
                Guardar
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
}




