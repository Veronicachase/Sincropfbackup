import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link, useNavigate } from "react-router-dom";

export default function MisProyectos() {
  const [proyectos, setProyectos] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await fetch("http://localhost:3000/proyectos");
        const data = await response.json();
        if (response.ok) {
          setProyectos(data);
        } else {
          console.error("Error al obtener los datos de proyecto", data);
          setError("Error en proyectos");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
        setError("No se puede conectar al servidor");
      }
    };

    fetchProyectos();
  }, []);

  const handleClickProyecto = (proyectoId) => {
    navigate(`/proyectos/${proyectoId}`);
  };

  return (
    <> 
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>  
        <Typography variant="h5" component="h5">
          Agregar proyecto
        </Typography>
        <Link to="/proyecto-nuevo">
          <AddCircleIcon sx={{ fontSize: '50px', color: '#021F59', marginLeft: '10px' }} />
        </Link>
      </Box>

      <Box>
        {proyectos ? (
          proyectos.map((proyecto) => (
            <Box 
              key={proyecto.proyectId} 
              sx={{ padding: 2, borderBottom: '1px solid #ccc', cursor: 'pointer' }}
              onClick={() => handleClickProyecto(proyecto.proyectId)}
            >
              <Typography variant="subtitle1">{proyecto.proyectName}</Typography>
              <Typography variant="body2">{proyecto.startDate}</Typography>
            </Box>
          ))
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </>
  );
}