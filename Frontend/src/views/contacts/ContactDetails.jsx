import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { getContactById } from '../../api/getContactById';
import { updateContactById } from '../../api/updateContactById';
import { NewContactFormSchema } from '../../forms/Contactos/NewContactSchema';

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
      alert("Datos actualizados");
    } catch (error) {
      alert("Error al editar. Por favor, intenta de nuevo.");
    }
  };

  return (
    <Box sx={{ textAlign: "left", marginLeft: "2em" }}>
      <Typography variant="h5">{contact.category}</Typography>
      <Typography variant="h5">{contact.contactName}</Typography>
      <Formik
        initialValues={formValues}
        enableReinitialize={true}
        validationSchema={NewContactFormSchema}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form>
            <Grid sx={{marginBottom:"2em",marginTop:"2em"}} >
              <Field as={TextField} name="phone" label="Teléfono" />
              {formik.values.phone && <a href={`tel:${formik.values.phone}`}><PhoneIcon sx={{color:"#84C7AE"}} /></a>}
            </Grid>
            <Grid sx={{marginBottom:"2em"}}>
              <Field as={TextField} name="mobile" label="Móvil" />
              {formik.values.mobile && <a href={`https://wa.me/${formik.values.mobile}`}><WhatsAppIcon sx={{color:"#84C7AE"}} /></a>}
            </Grid>
            <Grid sx={{marginBottom:"2em"}}>
              <Field as={TextField} name="email" label="Email" />
              {formik.values.email && <a href={`mailto:${formik.values.email}`}><EmailIcon  sx={{color:"#84C7AE"}}/></a>}
            </Grid>
            <Grid sx={{marginBottom:"2em"}}>
              <Field as={TextField} name="address" label="Dirección" />
              {formik.values.address && <a href={`https://maps.google.com/?q=${formik.values.address} `}><FmdGoodIcon sx={{color:"#84C7AE"}}  /></a>}
            </Grid>
            <Grid sx={{marginBottom:"2em"}}>
              <Field as={TextField} name="comments" label="Comentarios" />
            </Grid>

            <Button sx={{color:"#fff", backgroundColor:"#84C7AE", marginBottom:"2em"}}  type='submit'> Guardar Cambios </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}













