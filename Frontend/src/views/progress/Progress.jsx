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
          fetch('http://localhost:3000/trabajador'),
          fetch('http://localhost:3000/proyecto-nuevo')
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










// // /* eslint-disable no-unused-vars */
//  import { useState, useEffect } from "react";
//  import {
//  Box,
//  Button,
//  Grid,
//  Typography,
//  TextField,
//  Select,
//  } from "@mui/material";
// import WarningIcon from "@mui/icons-material/Warning";
//  import CheckCircleIcon from "@mui/icons-material/CheckCircle";
//  import DangerousIcon from "@mui/icons-material/Dangerous";
//  import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
//  import LocalSeeIcon from "@mui/icons-material/LocalSee";
//  import { ProyectoIndividualFormSchema } from "../../forms/Proyectos/ProyectoIndividual/ProyectoIndividualFormSchema";
//  import CrearProyectoInitialValues from "../../forms/Proyectos/ProyectoIndividual/CrearProyectoInitialValues";
//  import { Formik, Form } from "formik";
//  import { useNavigate } from "react-router-dom";
// import MyButton from "../../components/MyButton";
//  import "../../assets/styles/estilosGenerales.css";
//  import { Box, TextField, formControlClasses } from "@mui/material";
// import { Formik } from "formik";
// import { useState } from "react"
// import MyButton from "../../components/MyButton";

// export default function Proyecto() {
   
//  const statusIcon = {
//   terminado: <CheckCircleIcon sx={{ color: "#8BB443" }} />,
//    pendiente: <WarningIcon sx={{ color: "#F2CB05" }} />,
//    noIniciado: <DangerousIcon sx={{ color: "#F25244" }} />,
//  };

//   const handleStatusChange = (newStatus) => {
//    setStatus(newStatus);
//  };

//   const toggleVisibility = () => {
//   setIsToggled(!isToggled);
//   };

//   const [trabajador,setTrabajador] =useState("");
// const [proyecto, setProyecto] = useState ({})

//   useEffect(() => {
//     const getTrabajador = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/trabajador");
//         const data = await response.json();
//         if (response.ok) {
//           setTrabajador(data);
//       } else {
//         console.error("Error al obtener los datos del trabajador", data);
//         setError("Error en trabajador");
//       }
//     } catch (error) {
//       console.error("Error de conexión:", error);
//       setError("No se puede conectar al servidor");
//     }
//   };

//     getTrabajador();   }, []);

//  useEffect(() => {
//      const getProyectoData = async () => {
//        try {
//         const response = await fetch("http://localhost:3000/proyecto-nuevo");
//          const data = await response.json();
//          if (response.ok) {
//          setProyectoData(data);
//       } else {
//            console.error("Error al obtener los datos del proyecto", data);
//            setError("Error en Proyecto");
//          }
//        } catch (error) {
//          console.error("Error de conexión:", error);
//          setError("No se puede conectar al servidor");       }
//      };
    
//     getProyectoData();
//   }, []);
    
//     const secciones = [
//         livingRoom,
//         kitchen,
//         hall,
//         room1,
//         room2,
//         bathRoom,
//         terrace,
//         laundry,
// ]


//      <Box>
//    return (
//        <Button onClick={toggleVisibility} startIcon={<ArrowBackIosIcon />}>
//          {isToggled ? "Ocultar Secciones" : "Mostrar Secciones"}
//        </Button>
//        {isToggled &&
//          secciones.map((seccion, index) => (
//            <Box key={index} sx={{ marginTop: 2, backgroundColor: "#f2faff" }}>
//              <Box
//                sx={{
//                  display: "flex",
//                  alignItems: "center",
//                  flexDirection: "column",
//                }}
//              >
//                <Box sx={{ display: "flex", alignItems: "center" }}>
//                  <Box sx={{ marginRight: 2 }}>{statusIcon[status]}</Box>
//                  <Typography variant="body2">{seccion}</Typography>
//               </Box>
//               <Box sx={{ display: "flex" }}>
//                 <Button onClick={() => handleStatusChange("terminado")}>
//                   Terminado
//                 </Button>
//                 <Button onClick={() => handleStatusChange("pendiente")}>
//                   Pendiente
//                </Button>
//                  <Button onClick={() => handleStatusChange("noIniciado")}>
//                    No Iniciado
//                  </Button>
//                </Box>
//              </Box>
//            </Box>
//          ))}
       

//                  <Box>
//                  {secciones.map((item)=>{
//                     if(item === e.target.value && item.length ===0) {  
                    
//                         return (
//                             Formik
//                             <Grid item xs={10} sm={10}>
//                             <TextField
//                               name="area"
//                               type="text"
//                               placeholder="Área a reparar"
//                               sx={{ backgroundColor: "#f2faff" }}
//                               </TextField>
//                           </Grid>
//                           <Grid item xs={10} sm={10}>
//                           <TextField
//                             name="taskDescription"
//                             type="text"
//                             placeholder="Descripción del trabajo"
//                             sx={{ backgroundColor: "#f2faff" }}
//                             </TextField>
//                         </Grid>
//                         <Grid item xs={5} sm={5}>
//                         <Box
//                           name="image" 
//                           type="img"
//                           placeholder={<LocalSeeIcon />}
//                           className="bg-light-blue"
//                         />
//                       </Grid>
//                       <Grid item xs={5} sm={5}>
//                         <input
//                           accept="image/*"
//                           type="file"
//                           className="bg-light-blue"
//                           onChange={(event) => {
//                             const file = event.target.files[0];
//                           }}
//                       </Grid>
                        
                       
                       
                       
//                        </Box>

//                     }

//                         )
//                     } else{
//                         return (
//                         <Box>
//                         <Box> <h4> {data.projectName } {secciones.target.value} </h4>  </Box>
//                         <Box> <p>{data.taskDescription}</p></Box>
//                         <Box> 
//                         {data.image}
//                         </Box>
//                          <MyButton>Guardar</MyButton>
//                         </Box>



//                         )

//                     }

//                  })}

// //         
// //               </Box>
// //           
// //           )}
// //         </Formik>
// //       </Box>
// //     </Box>
// //   );
// // }





// export default function Avances(){}