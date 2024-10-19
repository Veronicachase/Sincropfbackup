import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { getContactById } from "../../api/contactApi/getContactById";
import { updateContactById } from "../../api/contactApi/updateContactById";
import { deleteContact } from "../../api/contactApi/deleteContact"
import { NewContactFormSchema } from "./ContactsSchemaAndInitialValues/NewContactSchema";
import toast, { Toaster } from "react-hot-toast";

const defaultInitialValues = {
  category: "",
  contactName: "",
  company: "",
  address: "",
  email: "",
  phone: "",
  comments: "",
  mobile: "",
};

export default function ContactDetails() {
  const { contactId } = useParams();
  const navigate =useNavigate()
  const [contact, setContact] = useState({});
  const [formValues, setFormValues] = useState(defaultInitialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        if (contactId) {
          const contactById = await getContactById(contactId);
          const sanitizedContact = {
            ...contactById,
            phone: contactById.phone || "",       
            email: contactById.email || "",     
            mobile: contactById.mobile || "",
            address: contactById.address || "",
            comments: contactById.comments || "",
          };

          setContact(sanitizedContact);
          setFormValues({ ...defaultInitialValues, ...sanitizedContact });
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

      toast.success("Datos actualizados!", {
        icon: "👏",
      });
    } catch (error) {
      toast.error("No has podido editar, intenta denuevo.");
    }
  };
  const handleDelete = async (contactId) => {
    try {
      await deleteContact(contactId);
      toast.success("Contacto eliminado exitosamente!", {
        icon: "👏",
      });
      navigate("/allcontacts"); 
    } catch (error) {
      toast.error("No se ha podido eliminar el contacto, intenta de nuevo.");
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
          {(formik) => (
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
                    <IconButton
                      href={`tel:${formik.values.phone}`}
                      sx={{ marginLeft: "0.5em" }}
                    >
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
                    <IconButton
                      href={`https://wa.me/${formik.values.mobile}`}
                      sx={{ marginLeft: "0.5em" }}
                    >
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
                    <IconButton
                      href={`mailto:${formik.values.email}`}
                      sx={{ marginLeft: "0.5em" }}
                    >
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
                    <IconButton
                      href={`https://maps.google.com/?q=${formik.values.address}`}
                      sx={{ marginLeft: "0.5em" }}
                    >
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
        <Button
        variant="outlined"
        color="error"
        sx={{ marginTop: "1em" }}
        onClick={() => handleDelete(contact.contactId)}
      >
        Eliminar Contacto
      </Button>
      </Box>
    </Box>
  );
}
