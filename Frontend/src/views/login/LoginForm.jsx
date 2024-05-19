import { TextField, Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Logo from "../../assets/images/sincro.webp";
import MyButton from "../../components/MyButton";
import { useFormik } from "formik";
import { LoginFormSchema } from "../../forms/LoginAndRegister/LoginFormSchema";
import { useNavigate, Link } from "react-router-dom";
import Espana from "../../assets/images/Espana.png";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../context/AuthContext";
import "../../assets/styles/estilosGenerales.css";
import "./loginForm.css";

const LoginForm = () => {
  const { t, i18n } = useTranslation("home");
  const { login } = useAuthContext();
  const navigate = useNavigate();

  function changeLanguage() {
    i18n.language === "es"
      ? i18n.changeLanguage("en")
      : i18n.changeLanguage("es");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginFormSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        navigate("/home");
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
  });

  return (
    <Box display={{ flexGrow: 1, width: "100%", maxWidth: "700px" }} flexDirection={"column"} margin={"auto"}>
      <Box>
        <ToggleButtonGroup>
          <ToggleButton onClick={changeLanguage} value="Español" aria-label="español">
            <img src={Espana} alt="Bandera de España" />
          </ToggleButton>
          <ToggleButton onClick={changeLanguage} value="English" aria-label="English">
            {t("button")}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <img className="logo" src={Logo} alt="Sincro" />
      <Box
        display="flex"
        flexDirection="column"
        margin="0 auto"
        alignItems="center"
        backgroundColor="#f6fbf9"
        borderRadius="49px"
        paddingTop={3}
        paddingBottom={3}
      >
        <Typography className="fc-primary" mb={5} variant="h4">
          Iniciar Sesión
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              type="email"
              label="Ingrese su email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              className={formik.errors.email && formik.touched.email ? "input-error" : ""}
              InputProps={{ style: { borderRadius: 20 } }}
              sx={{
                marginBottom: "2em",
                width: "300px",
                backgroundColor: "#fff",
              }}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="error">{formik.errors.email}</p>
            )}

            <TextField
              type="password"
              label="Ingrese su contraseña"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              className={formik.errors.password && formik.touched.password ? "input-error" : ""}
              InputProps={{ style: { borderRadius: 20 } }}
              sx={{
                marginBottom: "2em",
                width: "300px",
                borderRadius: "15.34px",
                backgroundColor: "#fff",
              }}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="error">{formik.errors.password}</p>
            )}

            <MyButton disabled={formik.isSubmitting}>Iniciar sesión</MyButton>
          </Box>

          <Typography variant="body2">
            ¿No tienes una cuenta?
            <Link to="/register" style={{ color: "inherit" }}>
              Regístrate
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
