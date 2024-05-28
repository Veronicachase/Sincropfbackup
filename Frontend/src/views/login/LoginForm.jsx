import { TextField, Box, Typography, Button } from "@mui/material";
import { useFormik } from "formik";
import { LoginFormSchema } from "../../forms/LoginAndRegister/LoginFormSchema";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import "../../assets/styles/estilosGenerales.css";

const LoginForm = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

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
    <Box
      sx={{
        width: "100%",
        maxWidth: "700px",
        display: "flex",
        margin: "7em auto",
      }}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap={3}
    >
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
              className={
                formik.errors.email && formik.touched.email ? "input-error" : ""
              }
              InputProps={{ style: { borderRadius: 10 } }}
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
              className={
                formik.errors.password && formik.touched.password
                  ? "input-error"
                  : ""
              }
              InputProps={{ style: { borderRadius: 10 } }}
              sx={{
                marginBottom: "2em",
                width: "300px",
                backgroundColor: "#fff",
              }}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="error">{formik.errors.password}</p>
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#84C7AE",
                marginBottom: "1em",
                "&:active": {
                  backgroundColor: "#A9A9A9 !important",
                },
                "&:hover": {
                  backgroundColor: "#72B298",
                },
              }}
              disabled={formik.isSubmitting}
            >
              Iniciar sesión
            </Button>
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
