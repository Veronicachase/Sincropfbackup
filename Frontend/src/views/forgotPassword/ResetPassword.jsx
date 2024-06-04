import { TextField, Box, Typography, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";



export default function ResetPassword(){
const { sendPasswordResetEmail } = useAuthContext();
const [ emailSent, setEmailSent] = useState(false)

const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Email inválido").required("Requerido"),
    }),

    onSubmit: async (values) => {
        try {
          await sendPasswordResetEmail(values.email);
          setEmailSent(true);
        } catch (error) {
          console.error("Error sending reset email:", error);
        }
      },
    });
    return (
        <Box
          sx={{
            width: "80%",
            maxWidth: "400px",
            margin: "2em auto",
            padding: "2em",
            boxShadow: 3,
            borderRadius: "20px",
          }}
        >
          <Typography sx={{ color: "#1976d2" }} mb={3} variant="h5">
            Recuperar Contraseña
          </Typography>
          {emailSent ? (
            <Typography sx={{ color: "#1976d2" }}>
              Un correo ha sido enviado a tu dirección para restablecer tu contraseña.
            </Typography>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                type="email"
                label="Ingrese su email"
                variant="outlined"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ marginBottom: "1.5em" }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#1976d2",
                  padding: "0.5em 2em",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Enviar
              </Button>
            </form>
          )}
        </Box>
      );
    };
