
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Box, Button, Grid, TextField, Typography, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { getContactById } from '../../api/getContactById';
import { updateContactById } from '../../api/updateContactById';
import { NewContactFormSchema } from '../../forms/Contactos/NewContactSchema';
import toast, { Toaster } from 'react-hot-toast';

const defaultInitialValues = {
  category: "",
  contactName: "",
  company: "",
  address: "",
  email: "",
  phone: "",
  comments: "",
  mobile: ""
};

export default function ContactDetails() {
  const { contactId } = useParams();
  const [contact, setContact] = useState({});
  const [formValues, setFormValues] = useState(defaultInitialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        if (contactId) {
          const contactById = await getContactById(contactId);
          setContact(contactById);
          setFormValues({ ...defaultInitialValues, ...contactById });
        } else {
          console.log("Error al recuperar los datos del contacto");
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
      setLoading(false);
    };

    fetchContacts();
  }, [contactId]);

  if (loading) return <p>Cargando datos de contacto...</p>;
  if (!contact.contactId) return <p>No se encontró el contacto</p>;

  const handleSubmit = async (values) => {
    try {
      await updateContactById(contactId, values);
      console.log("Valores de contacto actualizados", values);
      toast.success("Datos actualizados!", {
        icon: '👏',
      });
    } catch (error) {
      toast.error("No has podido editar, intenta denuevo.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" marginTop="2em">
      <Toaster />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "600px",
          padding: "2em",
          boxShadow: 3,
          borderRadius: "10px",
          backgroundColor: "#fff",
          transition: "transform 0.3s, box-shadow 0.3s",
          ":hover": {
            transform: "scale(1.01)",
            boxShadow: 6,
          },
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "1em" }}>
          {contact.category}
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: "1em" }}>
          {contact.contactName}
        </Typography>
        <Formik
          initialValues={formValues}
          enableReinitialize={true}
          validationSchema={NewContactFormSchema}
          onSubmit={handleSubmit}
        >
          {formik => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} display="flex" alignItems="center">
                  <Field
                    as={TextField}
                    name="phone"
                    label="Teléfono"
                    fullWidth
                    sx={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
                  />
                  {formik.values.phone && (
                    <IconButton href={`tel:${formik.values.phone}`} sx={{ marginLeft: "0.5em" }}>
                      <PhoneIcon sx={{ color: "#84c7ae" }} />
                    </IconButton>
                  )}
                </Grid>
                <Grid item xs={12} display="flex" alignItems="center">
                  <Field
                    as={TextField}
                    name="mobile"
                    label="Móvil"
                    fullWidth
                    sx={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
                  />
                  {formik.values.mobile && (
                    <IconButton href={`https://wa.me/${formik.values.mobile}`} sx={{ marginLeft: "0.5em" }}>
                      <WhatsAppIcon sx={{ color: "#84c7ae" }} />
                    </IconButton>
                  )}
                </Grid>
                <Grid item xs={12} display="flex" alignItems="center">
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    sx={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
                  />
                  {formik.values.email && (
                    <IconButton href={`mailto:${formik.values.email}`} sx={{ marginLeft: "0.5em" }}>
                      <EmailIcon sx={{ color: "#84c7ae" }} />
                    </IconButton>
                  )}
                </Grid>
                <Grid item xs={12} display="flex" alignItems="center">
                  <Field
                    as={TextField}
                    name="address"
                    label="Dirección"
                    fullWidth
                    sx={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
                  />
                  {formik.values.address && (
                    <IconButton href={`https://maps.google.com/?q=${formik.values.address}`} sx={{ marginLeft: "0.5em" }}>
                      <FmdGoodIcon sx={{ color: "#84c7ae" }} />
                    </IconButton>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="comments"
                    label="Comentarios"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      borderRadius: "10px",
                      ":hover": {
                        backgroundColor: "#1565c0",
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    Guardar Cambios
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}




// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Formik, Form, Field } from 'formik';
// import { Box, Button, Grid, TextField, Typography } from '@mui/material';
// import PhoneIcon from '@mui/icons-material/Phone';
// import EmailIcon from '@mui/icons-material/Email';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import FmdGoodIcon from '@mui/icons-material/FmdGood';
// import { getContactById } from '../../api/getContactById';
// import { updateContactById } from '../../api/updateContactById';
// import { NewContactFormSchema } from '../../forms/Contactos/NewContactSchema';
// import SideMenu from "../../components/SideMenu"
// import toast, { Toaster } from 'react-hot-toast';

// const defaultInitialValues = {
//   category: "",
//   contactName: "",
//   company: "",
//   address: "",
//   email: "",
//   phone: "",
//   comments: "",
//   mobile: ""
// };

// export default function ContactDetails() {
//   <div><Toaster/></div>
//   const { contactId } = useParams();
//   const [contact, setContact] = useState({});
//   const [formValues, setFormValues] = useState(defaultInitialValues);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       setLoading(true);
//       try {
//         if (contactId) {
//           const contactById = await getContactById(contactId);
//           setContact(contactById);
//           setFormValues({ ...defaultInitialValues, ...contactById });
//         } else {
//           console.log("Error al recuperar los datos del contacto");
//         }
//       } catch (error) {
//         console.error("Error fetching contacts:", error);
//       }
//       setLoading(false);
//     };

//     fetchContacts();
//   }, [contactId]);

//   if (loading) return <p>Cargando datos de contacto...</p>;
//   if (!contact.contactId) return <p>No se encontró el contacto</p>;

//   const handleSubmit = async (values) => {
//     try {
//       await updateContactById(contactId, values);
//       console.log("Valores de contacto actualizados", values);
//       toast('Datos actualizados!', {
//         icon: '👏',
//       });
//     } catch (error) {
//       toast.error("No has podido editar, intenta denuevo.");
//     }
//   };

//   return (
//     <Box display={"flex"}> 
    
//     <Box sx={{ textAlign: "left", marginLeft: "2em", width:"100%" }}>
//       <Typography variant="h5">{contact.category}</Typography>
//       <Typography variant="h5">{contact.contactName}</Typography>
//       <Formik
//         initialValues={formValues}
//         enableReinitialize={true}
//         validationSchema={NewContactFormSchema}
//         onSubmit={handleSubmit}
//       >
//         {formik => (
//           <Form>
//             <Grid sx={{marginBottom:"2em",marginTop:"2em"}} >
//               <Field as={TextField} name="phone" label="Teléfono"  />
//               {formik.values.phone && <a href={`tel:${formik.values.phone}`}><PhoneIcon sx={{color:"#84c7ae", marginLeft:".3em"}} /></a>}
//             </Grid>
//             <Grid sx={{marginBottom:"2em"}} >
//               <Field as={TextField} name="mobile" label="Móvil" />
//               {formik.values.mobile && <a href={`https://wa.me/${formik.values.mobile}`}><WhatsAppIcon sx={{color:"#84c7ae", marginLeft:".3em"}} /></a>}
//             </Grid>
//             <Grid sx={{marginBottom:"2em"}}>
//               <Field as={TextField} name="email" label="Email" />
//               {formik.values.email && <a href={`mailto:${formik.values.email}`}><EmailIcon  sx={{color:"#84c7ae", marginLeft:".3em", alignSelf:"center"}}/></a>}
//             </Grid>
//             <Grid sx={{marginBottom:"2em"}}>
//               <Field as={TextField} name="address" label="Dirección" />
//               {formik.values.address && <a href={`https://maps.google.com/?q=${formik.values.address} `}><FmdGoodIcon sx={{color:"#84c7ae", marginLeft:".3em"}}  /></a>}
//             </Grid>
//             <Grid sx={{marginBottom:"2em"}}>
//               <Field as={TextField} name="comments" label="Comentarios" />
//             </Grid>

//             <Button sx={{color:"#fff", border:" 1px solid #fff", marginBottom:"2em"}}  type='submit'> Guardar Cambios </Button>
//           </Form>
//         )}
//       </Formik>
//     </Box>
//     </Box>
//   );
// }













