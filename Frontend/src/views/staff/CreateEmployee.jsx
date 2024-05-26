import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Grid, Box, Button, Select, MenuItem, Typography } from '@mui/material';
import CustomTextField from '../../ui/CustomTextField'; 
import { CrearTrabajadorFormSchema }  from '../../forms/Trabajadores/crearTrabajador/CrearTrabajadorFormSchema'; // Asumiendo que tienes un esquema de validación
import { getAllProjects } from "../../api/getAllProjects"
import { getProjectById } from "../../api/getProjectById"

const CrearTrabajador = () => {
  const [selected, setSelected] = useState('');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getAllProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error al obtener los datos de los proyectos:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (value) => {
    setSelected(value);
  };

  const initialValues = {
    date: '',
    name: '',
    position: '',
    project: '',
    comments: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CrearTrabajadorFormSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box
            sx={{
              flexGrow: 1,
              width: '100%',
              maxWidth: '800px',
              margin: '2em auto',
              flexDirection: 'column',
              backgroundColor: '#EDF5F4',
              boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Grid
              container
              spacing={4}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={10} sm={10}>
                <CustomTextField
                  name="date"
                  type="date"
                  label="Fecha"
                  placeholder="Fecha"
                  sx={{ backgroundColor: '#fff' }}
                />
              </Grid>

              <Grid item xs={10} sm={10}>
                <CustomTextField
                  name="name"
                  type="text"
                  label="Nombre"
                  placeholder="Nombre"
                  sx={{ backgroundColor: '#fff' }}
                />
              </Grid>

              <Grid item xs={10} sm={10}>
                <CustomTextField
                  name="position"
                  type="text"
                  label="Posición"
                  placeholder="Posición"
                  sx={{ backgroundColor: '#fff' }}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Seleccione una posición</option>
                  <option value="Encargado">Encargado</option>
                  <option value="Ayudante">Ayudante</option>
                  <option value="Principal">Principal</option>
                  <option value="Becario">Becario</option>
                  <option value="Otro">Otro</option>
                </CustomTextField>
              </Grid>

              <Grid item xs={10} sm={10}>
                <CustomTextField
                  name="project"
                  type="text"
                  label="Obra"
                  placeholder="Obra"
                  sx={{ backgroundColor: '#fff' }}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Seleccione un proyecto</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.projectName}
                    </option>
                  ))}
                </CustomTextField>
              </Grid>

              <Grid container direction="column" alignItems="center" spacing={2}>
                <Typography sx={{marginTop:"2em"}}>Equipo Reglamentario Entregado</Typography>
                <Grid container item justifyContent="center" spacing={2}>
                  <Grid item>
                    <Button
                      sx={{
                        backgroundColor: selected === 'Si' ? '#8BB443' : '#E0E0E0',
                        color: selected === 'Si' ? 'white' : 'black',
                        borderRadius: '10px',
                        '&:hover': {
                          backgroundColor: selected === 'Si' ? '#76A33E' : '#BDBDBD',
                        },
                      }}
                      onClick={() => handleClick('Si')}
                    >
                      SI
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      sx={{
                        backgroundColor: selected === 'No' ? '#F25244' : '#E0E0E0',
                        color: selected === 'No' ? 'white' : 'black',
                        borderRadius: '10px',
                        '&:hover': {
                          backgroundColor: selected === 'No' ? '#D9453A' : '#BDBDBD',
                        },
                      }}
                      onClick={() => handleClick('No')}
                    >
                      NO
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      sx={{
                        backgroundColor: selected === 'Incompleto' ? '#F2CB05' : '#E0E0E0',
                        color: selected === 'Incompleto' ? 'white' : 'black',
                        borderRadius: '10px',
                        '&:hover': {
                          backgroundColor: selected === 'Incompleto' ? '#D4B404' : '#BDBDBD',
                        },
                      }}
                      onClick={() => handleClick('Incompleto')}
                    >
                      Incompleto
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={10}>
                <CustomTextField
                  name="comments"
                  type="text"
                  label="Comentarios"
                  placeholder="Comentarios"
                  sx={{ backgroundColor: '#fff' }}
                />
              </Grid>

              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: '2em', color: '#fff', backgroundColor: '#84C7AE' }}
              >
                Agregar Trabajador
              </Button>

              <Grid item xs={12}></Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CrearTrabajador;
