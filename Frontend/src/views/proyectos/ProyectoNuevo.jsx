import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { initialValues } from "../../forms/Proyectos/CrearProyectoInitialValues";
import { AdvancedFormSchema } from "../../forms/Proyectos/CrearProyectoFormSchema";
import CustomTextField from "../../ui/CustomTextField";
import MapView from "../../components/MapView";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import CheckboxC from "../../components/CheckboxC"
import Select from "../../ui/Select";
import "../../assets/styles/estilosGenerales.css";
import "./proyectoNuevo.css";
import MyButton from "../../components/MyButton";
import { Grid, Box } from "@mui/material";

function ProyectoNuevo() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AdvancedFormSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        actions.setSubmitting(false);
        actions.resetForm();
        navigate("/mis-proyectos");
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              maxWidth: "800px",
              margin: "2em auto",
              flexDirection: "column",
              boxShadow: "shadow-custom",
              color: "#021F59",
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
                  name="hiringCompany"
                  type="text"
                  label="Empresa Contratante"
                  placeholder="Empresa Contratante"
                  sx={{ backgroundColor: "#f2faff" }}
                />
              </Grid>
              <Grid item xs={10} sm={10}>
                <CustomTextField
                  name="identifier"
                  type="text"
                  label="Identificador del Proyecto"
                  placeholder="Identificador del proyecto"
                  sx={{ backgroundColor: "#f2faff" }}
                />
              </Grid>
              <Grid item xs={3} sm={5}>
                <CustomTextField
                  name="block"
                  type="text"
                  label="Bloque"
                  placeholder="Bloque"
                  sx={{ backgroundColor: "#f2faff" }}
                />
              </Grid>
              <Grid item xs={3} sm={5}>
                <CustomTextField
                  name="portal"
                  type="text"
                  label="Portal"
                  placeholder="Portal"
                  sx={{ backgroundColor: "#f2faff" }}
                />
              </Grid>
              <Grid item xs={3} sm={3}>
                <CustomTextField
                  name="unit"
                  type="text"
                  label="Unidad"
                  placeholder="Unidad"
                  sx={{ backgroundColor: "#f2faff" }}
                />
              </Grid>
              <Grid item xs={5} sm={3}>
                <CustomTextField
                  name="ZipCode"
                  type="text"
                  label="Código Postal"
                  placeholder="Código Postal"
                  sx={{ backgroundColor: "#f2faff" }}
                />
              </Grid>
              <Grid item xs={5} sm={3}>
                <CustomTextField
                  name="province"
                  type="text"
                  label="Provincia"
                  placeholder="Provincia"
                  sx={{ backgroundColor: "#f2faff" }}
                />
              </Grid>
              <Grid item xs={10} sm={10}>
                <CustomTextField
                  name="addressDrescription"
                  type="text"
                  label="Detalle de Dirección"
                  placeholder="Detalle de dirección"
                  sx={{ backgroundColor: "#f2faff" }}
                />
              </Grid>

              <Grid item xs={10} sm={5}>
                <Select
                  name="typeOfWork"
                  label="Tipo de Trabajo"
                  sx={{ backgroundColor: "#f2faff" }}
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="construccion">Construcción</option>
                  <option value="repasos">Repasos</option>
                  <option value="instalacionEquipo">
                    Instalación de equipo
                  </option>
                  <option value="piscinas">Piscinas</option>
                  <option value="instPanelesSolares">
                    Instalación de paneles solares
                  </option>
                  <option value="otra">Otra</option>
                </Select>
              </Grid>
              <Grid item xs={10} sm={5}>
                <Select name="constructionType" label="Tipo de Construcción">
                  <option value="">Selecciona un tipo</option>
                  <option value="chalet">Chalet</option>
                  <option value="piso">Piso</option>
                  <option value="otra">Otra</option>
                </Select>
              </Grid>
              <Grid item xs={5} sm={5}>
                <CustomTextField
                  name="startDate"
                  type="date"
                  label="Fecha de Inicio"
                  placeholder="Fecha de Inicio"
                  sx={{ backgroundColor: "#f2faff" }}
                />
              </Grid>
              <Grid item xs={5} sm={5}>
                <CustomTextField
                  name="endDate"
                  type="date"
                  label="Fecha de Entrega"
                  placeholder="Fecha de Entrega"
                  sx={{ backgroundColor: "#f2faff" }}
                />
              </Grid>

              <Grid item xs={10}>
                <div id="map" style={{ height: "400px", width: "100%" }}>
                  <MapView setFieldValue={setFieldValue} />
                </div>
              </Grid>

              <Grid item xs={10} sm={10}>
                <CustomTextField
                  name="createTask"
                  type="text"
                  placeholder="Crear Nueva Tarea"
                  className="bg-light-blue"
                />
              </Grid>
              <Grid item xs={10} sm={10}>
                <CustomTextField
                  name="area"
                  type="text"
                  label="Área"
                  className="bg-light-blue"
                />
              </Grid>

              <Grid item xs={10} sm={10}>
                <CheckboxC />
              </Grid>

              <Grid item xs={10} sm={10}>
                <CustomTextField
                  name="proyectDescription"
                  type="text"
                  label="Descripción del Trabajo"
                  className="bg-light-blue"
                />
              </Grid>
              <Grid item xs={5} sm={5}>
                <Box
                  name="image"
                  type="img"
                  placeholder={<LocalSeeIcon />}
                  className="bg-light-blue"
                />
              </Grid>
              <Grid item xs={5} sm={5}>
                <input
                  accept="image/*"
                  type="file"
                  className="bg-light-blue"
                  onChange={(event) => {
                    const file = event.target.files[0];
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <MyButton disabled={isSubmitting}> Crear Proyecto</MyButton>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default ProyectoNuevo;

// /* eslint-disable no-undef */
// // import { useState } from "react";
// import { Typography, Box, TextField,  Select } from '@mui/material';
// import MyButton from '../../components/MyButton';
// import { useState } from 'react';
// import MapView from '../../components/MapView'
// import InputEmpresa from '../../components/InputEmpresa'

// export default function ProyectoNuevo(){
//     const [nombreProyecto, setNombreProyecto] = useState('');
//     const [edificio, setEdificio] = useState('');
//     const [portal, setPortal] = useState('');
//     const [Detalle de dirección, setUnidad] = useState('');
//     const [detalleAdicional, setDetalleAdicional] = useState('');
//     const [codigoPostal, setCodigoPostal] = useState('');
//     const [provincia, setProvincia] = useState('');
//     // eslint-disable-next-line no-unused-vars
//     const [tipoTrabajo, setTipoTrabajo] = useState('');
//     // const [construccion, setTipoConstruccion] = useState('');
//     const [date, setDate] = useState(new Date());
//     const [fechaEntrega, setFechaEntrega] = useState('');
//     // const theme =useTheme();

// const handleSubmit =(e)=>{
//     e.preventDefault()
//             {/* Aqui va la logica para ingresarlo a la base de datos,  para que me de el mensaje de el proyecto ha sido creado. y me lleve a la pagina de proyectos creados.  */}
// }

// const handleInputChanges = (e,type) =>{
//     const value = e.target.value;
//     switch(type) {
//         case 'nombreProyecto':
//             setNombreProyecto(value);
//             break;
//         case 'edificio':
//             setEdificio(value);
//             break;
//         case 'portal':
//             setPortal(value);
//             break;
//         case 'unidad':
//             setUnidad(value);
//             break;
//         case 'detalle':
//             setDetalleAdicional(value);
//             break;
//         case 'codigoPostal':
//             setCodigoPostal(value);
//             break;
//         case 'provincia':
//             setProvincia(value);
//             break;
//         case 'fechaEntrega':
//             setFechaEntrega(value);
//             break;
//         default:
//             break;
//     }
//   }

//     return(
//     <>
//     <Typography>Generales </Typography>
//     <Box component = 'form' onSubmit={handleSubmit}>

//      <InputEmpresa/>

//     <TextField
//       label="Identificador - Nombre del Proyecto"
//       value={nombreProyecto}
//       onChange={(e) => handleInputChanges(e, 'nombreProyecto')}

//     />
//     <TextField

//     label="Bea"
//     value={edificio}
//     onChange={(e) => handleInputChanges(e, 'edificio')}/>

//     <TextField

//     label="Portal"
//     value={portal}
//     onChange={(e) => handleInputChanges(e, 'portal')}/>

//     <TextField

//     label="Unidad"
//     value={unidad}
//     onChange={(e) => handleInputChanges(e, 'unidad')}/>

//     <TextField

//     label="Detalle Adicional"
//     value={detalleAdicional}
//     onChange={(e) => handleInputChanges(e, 'detalleAdicional')}/>
//         {/*pobablemente necesite colocarle algo para controlar la cantidad de palabras y overflow hidden */}

//     <TextField

//     label="Codigo Postal"
//     value={codigoPostal}
//     onChange={(e) => handleInputChanges(e, 'codigoPostal')}/>
//         {/*pobablemente necesite controlar a 5 digitos */}

//     <TextField

//     label="provincia"
//     value={provincia}
//     onChange={(e) => handleInputChanges(e, 'provincia')}/>

//         <MapView/>

// <Select onChange={(e)=> setTipoTrabajo(e.target.value)}>
// <option> Construcción </option>
// <option>Reparaciones </option>
// <option>Instalación de pisos</option>
// <option>Piscinas</option>
// <option>Instalación de paneles solares</option>
// <option>Control de partidas</option>
// <option>Otra</option>
// </Select>

// <Select onChange={(e)=> setTipoConstruccion(e.target.value)}>
// <option> Chalet </option>
// <option>Piso </option>
// <option>Rural</option>
// <option>Otra</option>

// </Select>

// <TextField
// type='date'
// label="Fecha de inicio"
// value={date.toISOString().split('T')[0]}
// onChange={(e)=> setDate(new Date(e.target.value))}/>

//     <TextField
//     type='date'
//     label="Fecha de entrega"
//     value={fechaEntrega}
//     onChange={(e) => handleInputChanges(e, 'fechaEntrega')}/>

// <MyButton>Crear Proyecto </MyButton>

// <Box>  <MapView/>   </Box>

// {/* aqui van las medias y estilos del contenedor del mapa */}

// <MapView/>

// </Box>
// </>
// )}
