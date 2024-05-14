import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Box, Grid, TextField, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { getContactById,  } from '../../api/getContactById';
import { updateContactById }from '../../api/updateContactById'
import { NewContactFormSchema } from '../../forms/Contactos/NewContactSchema';

const defaultInitialValues = {
  category: "",
  contactName: "",
  company: "",
  address: "",
  email: "",
  phone: "",
  comments: ""
};

export default function ContactDetails() {
  const { contactId } = useParams();
  const [contact, setContact] = useState("");
  const [formValues, setFormValues] = useState(defaultInitialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (contactId) {
      getContactById(contactId)
        .then((contactData) => {
          if (contactData) {
            setFormValues({ ...defaultInitialValues, ...contactData });
            setContact(contactData);
          } else {
            console.log("Error al recuperar los datos del contacto");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al cargar datos del contacto:", error);
          setLoading(false);
        });
    }
  }, [contactId]);

  if (loading) return <p>Cargando datos de contacto...</p>;
  if (!contact) return <p>No se encontró el contacto</p>;

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
            <Grid>
              <Field as={TextField} name="phone" />
              <a href={`tel:${formik.values.phone}`}><PhoneIcon /></a>
            </Grid>
            <Grid>
              <Field as={TextField} name="mobil" />
              <a href={`https://wa.me/${formik.values.mobil}`}><WhatsAppIcon /></a>
            </Grid>
            <Grid>
              <Field as={TextField} name="email" />
              <a href={`mailto:${formik.values.email}`}><EmailIcon /></a>
            </Grid>
            <Grid>
              <Typography variant='body'>{formik.values.address}</Typography>
              <Field as={TextField} name="address" />
              <a href={`https://maps.google.com/?q=${formik.values.address}`}><FmdGoodIcon /></a>
            </Grid>
            <Grid>
              <Field as={TextField} name="comments" />
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
