/* eslint-disable no-unused-vars */
import { TextField, Box, Typography, Button } from "@mui/material";
import Logo from "../../assets/images/logo2.png"
import { useFormik } from "formik";
import { RegisterFormSchema } from "../../forms/LoginAndRegister/RegisterFormSchema";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import "../../assets/styles/estilosGenerales.css";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      company: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterFormSchema,
    onSubmit: async (values, actions) => {
      const { confirmPassword, ...userData } = values;
      console.log("Enviando datos al servidor:", userData);
      
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success('Te has registrado correctamente, inicia sesión para entrar!')
         
          navigate("/login");
        } else {
          console.error("Error en el registro", data);
          actions.setFieldError(
            "general",
            data.message || "Error en el registro"
          );
        }
        actions.setSubmitting(false);
        actions.resetForm();
      } catch (error) {
        console.error("Error de conexión:", error);
        actions.setFieldError("general", "No se puede conectar al servidor");
        actions.setSubmitting(false);
      }
    },
  });
  function placeHolderText(field) {
    switch (field) {
      case "name":
        return "Nombre";
      case "surname":
        return "Apellido";
      case "company":
        return "Empresa";
      case "email":
        return "Email";
      case "password":
        return "Contraseña";
      case "confirmPassword":
        return "Confirme la contraseña";
      default:
        return "Campo no indicado";
    }
  }

  return (
    <Box
      display={{ flexGrow: 1, width: "100%", maxwidth: "700px" }}
      flexDirection={"column"}
      margin={"auto"}
    >
      <Box
        backgroundColor="#fff"
        borderRadius="10px"
        paddingTop={3}
        paddingBottom={3}
      >
        <Typography sx={{color:"#1976D2"}} mb={5} variant="h4">
          Registrar
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            margin={"auto"}
            width={300}
          >
            {[
              "name",
              "surname",
              "company",
              "email",
              "password",
              "confirmPassword",
            ].map((field) => (
              <TextField
                key={field}
                type={field.includes("password") ? "password" : "text"}
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={placeHolderText(field)}
                sx={{ marginBottom: "1em" }}
                className={
                  formik.errors[field] && formik.touched[field]
                    ? "input-error"
                    : ""
                }
                InputProps={{
                  style: {
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    marginBottom: ".8em",
                  },
                }}
              />
            ))}
            <Button 
  variant="contained" 
  sx={{
    backgroundColor: "#1976D2",
    marginBottom: "1em",
    '&:active': {
      backgroundColor: "#A9A9A9 !important" 
    },
    '&:hover': {
      backgroundColor: "#1976d28e", 
    }
  }} 
  disabled={formik.isSubmitting}
>
  Registrar
</Button>
          </Box>

          <Typography variant="body2">
            ¿Ya tienes una cuenta?
            <Link to="/login" style={{ color: "inherit" }}>
              Inicia Sesión
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
