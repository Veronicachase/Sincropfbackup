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
    <Box>
      <Box
        sx={{
          width: "80%",
          maxWidth: "700px",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          margin: "7em auto",
          padding: "2em",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 3,
          borderRadius: "20px",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            color: "#1976d2",
            caretColor: "transparent",
            cursor: "pointer",
          }}
          mb={3}
          variant="h4"
        >
          Iniciar Sesión
        </Typography>

        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
                marginBottom: "1.5em",
                width: "100%",
                maxWidth: "400px",
                backgroundColor: "#fff",
                caretColor: "transparent",
                cursor: "pointer",
              }}
            />
            {formik.errors.email && formik.touched.email && (
              <Typography
                variant="body2"
                className="error"
                sx={{ color: "red", marginBottom: "1em" }}
              >
                {formik.errors.email}
              </Typography>
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
                marginBottom: "1.5em",
                width: "100%",
                maxWidth: "400px",
                backgroundColor: "#fff",
              }}
            />
            {formik.errors.password && formik.touched.password && (
              <Typography
                variant="body2"
                className="error"
                sx={{ color: "red", marginBottom: "1em" }}
              >
                {formik.errors.password}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                marginBottom: "1.5em",
                padding: "0.5em 2em",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "background-color 0.3s, transform 0.3s",
                "&:hover": {
                  backgroundColor: "#1565c0",
                  transform: "scale(1.05)",
                },
                "&:active": {
                  backgroundColor: "#A9A9A9",
                },
              }}
              disabled={formik.isSubmitting}
            >
              Iniciar sesión
            </Button>

            <Typography
              variant="body2"
              sx={{
                marginBottom: "1em",
                caretColor: "transparent",
                cursor: "pointer",
              }}
            >
              ¿No tienes una cuenta?
              <Link
                to="/register"
                style={{
                  color: "#1976d2",
                  marginLeft: "0.5em",
                  cursor: "pointer",
                }}
              >
                Regístrate
              </Link>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                marginBottom: "0.5em",
                caretColor: "transparent",
                cursor: "pointer",
              }}
            >
              ¿Olvidaste tu contraseña?
            </Typography>
            <Typography
              variant="body2"
              sx={{ caretColor: "transparent", cursor: "pointer" }}
            >
              <Link
                to="/forgot-password"
                style={{ color: "#1976d2", cursor: "pointer" }}
              >
                Haz click aquí para recuperarla
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
