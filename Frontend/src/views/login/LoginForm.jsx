import { TextField, Box, Typography } from "@mui/material";
import Logo from "../../assets/images/sincro.webp";
import MyButton from "../../components/MyButton";
import { useFormik } from "formik";
import { LoginFormSchema } from "../../forms/LoginAndRegister/LoginFormSchema";
import { useNavigate, Link } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Espana from "../../assets/images/Espana.png";
import { useTranslation } from "react-i18next";
// import  {useAuthContext} from "../../context/AuthContext"
import "../../assets/styles/estilosGenerales.css";
import "./loginForm.css";

const LoginForm = () => {
  const { t, i18n } = useTranslation("home");

  function changeLanguage() {
    i18n.language === "es"
      ? i18n.changeLanguage("en")
      : i18n.changeLanguage("es");
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: LoginFormSchema,
    onSubmit,
  });

  const navigate = useNavigate();
  async function onSubmit(values, actions) {
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/home");
      } else {
        console.error("Error en el login:", data);
        actions.setFieldError("general", data.message || "Error en el login");
      }

      actions.setSubmitting(false);
      actions.resetForm();
    } catch (error) {
      console.error("Error de conexión:", error);
      actions.setFieldError("general", "No se puede conectar al servidor");
      actions.setSubmitting(false);
    }
  }

  return (
    <Box
      display={{ flexGrow: 1, width: "100%", maxWidth:"700px" }}
      flexDirection={"column"}
      margin={"auto"}
    >
      <Box>
        <ToggleButtonGroup>
          <ToggleButton
            onClick={changeLanguage}
            value="Español"
            aria-label="español"
          >
            <img src={Espana} alt="Bandera de España" />
          </ToggleButton>
          <ToggleButton
            onClick={changeLanguage}
            value="English"
            aria-label="English"
          >
            {t("button")}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <img className="logo" src={Logo} alt="Sincro" />
      <Box
        display="flex"
        flexDirection="column"
        margin=" 0 auto"
        alignItems="center"
        backgroundColor="#f6fbf9"
        borderRadius="49px"
        paddingTop={3}
        paddingBottom={3}
      >
        <Typography className="fc-primary" mb={5} variant="h4">
          Iniciar Sesión
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{display:"flex", flexDirection:"column"}}>
            <TextField
              type="email"
              label="Ingrese su email"
              variant="outlined"
              value={values.email}
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              className={errors.email && touched.email ? "input-error" : ""}
              InputProps={{style:{borderRadius:20}}}
              sx={{
                marginBottom: "2em",
                width: "300px",
                backgroundColor:"#fff"
              }}
            />
            {errors.email && touched.email && (
              <p className="error">{errors.email}</p>
            )}

            <TextField
              type="password"
              label="Ingrese su Contaseña"
              variant="outlined"
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              className={
              errors.password && touched.password ? "input-error" : ""
              }
              InputProps={{style:{borderRadius:20}}}
              sx={{
                marginBottom: "2em",
                width: "300px",
                borderRadius: "15.34px",
                backgroundColor:"#fff"
              }}
            />
            {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
            )}

            <MyButton disabled={isSubmitting}>Iniciar sesión</MyButton>
          </Box>

          <Typography variant="body2">
            ¿No tienes una cuenta?
            <Link to="/register" style={{ color: "inherit"}}>
              Registrate
            </Link>
          </Typography>
          <Typography variant="body2">¿Olvidaste tu contraseña?</Typography>
          <Typography variant="body2">
            <Link to="/forgot-password" style={{ color: "inherit" }}>
              Haz click aquí para recuperarla
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};
export default LoginForm;

/**  
 * import Espana from "../../assets/images/espana.png"
   import BritishFlag from "../../assets/images/BritishFLag.png";
 * <ToggleButtonGroup>
      <ToggleButton value="si" aria-label="espana"> {Espana} </ToggleButton>
      <ToggleButton value="no" aria-label="british">{BritishFlag}</ToggleButton>
      <ToggleButton value="incompleto" aria-label="british">{BritishFlag}</ToggleButton>
    </ToggleButtonGroup>      */

// import { useState } from "react";
// import { TextField, Container, Typography } from "@mui/material";
// // import PropTypes from "prop-types";
// import MyButton from "../../components/MyButton";
// import Logo from '../../assets/images/sincro.webp';
// import {useAuthContext} from '../../context/AuthContext'
// import { useNavigate } from "react-router-dom";
// import "./loginForm.css";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const {login, errorMessage}= useAuthContext();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Lógica para manejar el inicio de sesión
//     login(email, password);
//     navigate('/home')
//     if (!errorMessage) navigate('/home');
//   };

//   return (
//     <Container className="container" component="main" maxWidth="xs">
//       <div style={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
//         <img className="logo" src={Logo} alt="Sincro" />
//         <Typography component="h1" variant="h5">Iniciar sesión</Typography>
//         <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 1 }}>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Correo Electrónico"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Contraseña"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <MyButton text="Iniciar Sesión" type="submit" />
//         </form>
//         {errorMessage && <Typography color="error">{errorMessage}</Typography>}
//         <Typography component="body2" variant="body2">Registrate</Typography>
//         <Typography component="body2" variant="body2">¿Olvidaste tu contraseña?</Typography>
//       </div>
//     </Container>
//   );
// };
