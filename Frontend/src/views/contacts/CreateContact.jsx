import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { NewContactFormSchema } from "./ContactsSchemaAndInitialValues/NewContactSchema";
import { handleSubmitContact } from "../../api/contactApi/handleSubmitContact";
import toast, { Toaster } from "react-hot-toast";
import { initialValues } from "./ContactsSchemaAndInitialValues/InitialValues"
export default function CreateContact() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NewContactFormSchema}
      onSubmit={(values, actions) => {
        handleSubmitContact(values)
          .then(() => {
            actions.setSubmitting(false);
            actions.resetForm();
            toast.success("Contacto creado correctamente!");
            navigate("/allContacts");
          })
          .catch((error) => {
            console.error("Error en el proceso: ", error);
            actions.setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting, setFieldValue, values, errors, touched }) => (
        <Form>
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              maxWidth: "800px",
              margin: "2em auto",
              flexDirection: "column",
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
            <Box sx={{ width: "90%", margin: "auto", marginTop: "3em" }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Select
                    fullWidth
                    name="category"
                    value={values.category}
                    onChange={(event) =>
                      setFieldValue("category", event.target.value)
                    }
                    displayEmpty
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "#f9f9f9",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Selecciona una categoría</em>
                    </MenuItem>
                    <MenuItem value="client">Cliente</MenuItem>
                    <MenuItem value="company">Empresa</MenuItem>
                    <MenuItem value="vendor">Proveedor</MenuItem>
                    <MenuItem value="contractor">Subcontratista</MenuItem>
                    <MenuItem value="employee">Trabajador</MenuItem>
                    <MenuItem value="other">Otra</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Nombre"
                    name="contactName"
                    fullWidth
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "#f9f9f9",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Empresa"
                    name="company"
                    fullWidth
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "#f9f9f9",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Dirección"
                    name="address"
                    fullWidth
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "#f9f9f9",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    fullWidth
                    placeholder="Ejemplo: juan@gmail.com"
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "#f9f9f9",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                      },
                    }}
                    error={touched.email && Boolean(errors.email)}
                    helperText={<ErrorMessage name="email" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Teléfono"
                    name="phone"
                    fullWidth
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "#f9f9f9",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                      },
                    }}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={<ErrorMessage name="phone" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Móvil"
                    name="mobile"
                    fullWidth
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "#f9f9f9",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                      },
                    }}
                    error={touched.mobile && Boolean(errors.mobile)}
                    helperText={<ErrorMessage name="mobile" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Comentarios"
                    name="comments"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "#f9f9f9",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      paddingLeft: "1em",
                      paddingRight: "1em",
                      borderRadius: "10px",
                      marginBottom: "2em",
                      ":hover": {
                        backgroundColor: "#1565c0",
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    Crear Contacto
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
