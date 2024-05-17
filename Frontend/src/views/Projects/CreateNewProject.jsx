import { Formik, Form,  } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialValues } from '../../forms/Proyectos/CrearProyectoInitialValues';
import { NewProjectFormSchema } from '../../forms/Proyectos/NewProjectFormSchema';
import CustomTextField from '../../ui/CustomTextField';
import { ProjectTextField, projectTextField2 } from '../../configs/projectTextField';
import MapView from '../../components/MapView';
import CheckboxC from '../../components/CheckboxC';
import MyButton from '../../components/MyButton';
import { Grid, Box, Typography, Button } from '@mui/material';
import Select from '../../ui/Select';
import '../../assets/styles/estilosGenerales.css';
import './createNewProject.css';
import { handleSubmitProject } from '../../api/handlerSubmitProject';

function CreateNewProject() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState('');

  function previewFiles(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NewProjectFormSchema}
      onSubmit={(values, actions) => {
        console.log('Formulario enviado');
        handleSubmitProject(values)
        
          .then(() => {
            console.log(values);
            actions.setSubmitting(false);
            actions.resetForm();
            alert('Proyecto creado correctamente');
            navigate('/my-projects');
          })
          .catch(error => {
            console.error('Error en el proceso: ', error);
            actions.setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting, setFieldValue, values, errors }) => (
        <Form>
          <Box
            sx={{
             display:"flex",
              width: '100%',
              maxWidth: '800px',
              margin: '2em auto',
              boxShadow: 'shadow-custom',
              color: '#021F59',
              
            }}
          >
            <Grid container spacing={4} alignItems="center" justifyContent="center">
              <Grid container spacing={2} marginTop={3} justifyContent={'center'} margin={'auto'}>
                {ProjectTextField.map((field) => (
                  <Grid key={field.name} item xs={field.size}>
                    <CustomTextField
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      value={values[field.name]}
                      placeholder={field.placeholder}
                      autoComplete="off"
                      sx={{
                        backgroundColor: '#edf5f4',
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            border: 'none',
                          },
                          '&:hover fieldset': {
                            border: 'none',
                          },
                          '&.Mui-focused fieldset': {
                            border: 'none',
                          },
                        },
                      }}
                      InputLabelProps={{
                        className: 'my-custom-label',
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={12}>
                <div id="map" style={{ height: '400px', width: '100%' }}>
                  <MapView setFieldValue={setFieldValue} />
                </div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Select
                  name="typeOfWork"
                  value={values.typeOfWork}
                  onChange={(event) => setFieldValue('typeOfWork', event.target.value)}
                  label="Tipo de Trabajo"
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="construction">Construcción</option>
                  <option value="finishings">Repasos</option>
                  <option value="installations">Instalación de equipos</option>
                  <option value="pool">Piscinas</option>
                  <option value="SolarPanels">Instalación de paneles solares</option>
                  <option value="otra">Otra</option>
                </Select>
              </Grid>

              <Grid item xs={12} sm={5}>
                <Select
                  name="constructionType"
                  value={values.constructionType}
                  onChange={(event) => setFieldValue('constructionType', event.target.value)}
                  label="Tipo de Construcción"
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="chalet">Chalet</option>
                  <option value="apartment">Piso</option>
                  <option value="rural">Rural</option>
                  <option value="other">Otra</option>
                </Select>
              </Grid>

              <Grid container spacing={2} marginTop={3}  margin={'auto'}>
                {projectTextField2.map((field) => (
                  <Grid key={field.name} item xs={6} >
                    <CustomTextField
                      name={field.name}
                      type={field.type}
                      value={values[field.name]}
                      label={field.label}
                      placeholder={field.placeholder}
                      autoComplete="off"
                      sx={{
                        backgroundColor: '#edf5f4',
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            border: 'none',
                          },
                          '&:hover fieldset': {
                            border: 'none',
                          },
                          '&.Mui-focused fieldset': {
                            border: 'none',
                          },
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography variant="body" sx={{ paddingBottom: '1em', display: 'block', textAlign: 'left' }}>
                  Escoger las secciones a trabajar
                </Typography>
                <CheckboxC setFieldValue={setFieldValue} values={values} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <label htmlFor="fileInput">Adjuntar Imagen</label>
                <input type="file" id="fileInput" onChange={e => handleFileChange(e)} required accept="image/*" />

                <Button sx={{ backgroundColor: '#84C7AE', color:"#fff" }}>Agregar Imagen</Button>
              </Grid>

              <Grid item xs={8}>
                <MyButton type="submit" disabled={isSubmitting}>
                  Crear Proyecto
                </MyButton>
              </Grid>
            </Grid>
          </Box>
          <pre>{JSON.stringify({ values, errors }, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
}

export default CreateNewProject;
