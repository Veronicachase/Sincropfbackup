/* eslint-disable no-unused-vars */
import { TextField, Box, Typography, Button, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo from "../../assets/images/logo2.png";
import { useFormik } from "formik";
import { RegisterFormSchema } from "../../forms/LoginAndRegister/RegisterFormSchema";
import { useNavigate, Link } from "react-router-dom";
import { placeHolderText } from "../../components/PlaceHolderTextRegister";
import { handleSubmitRegister } from "../../api/handleSubmitRegister";
import toast, { Toaster } from 'react-hot-toast';
import "../../assets/styles/estilosGenerales.css";
import "./register.css";
import { useState, useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

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
      await handleSubmitRegister(userData, actions, navigate);
    },
  });

  return (
    <Box
      display={{ flexGrow: 1, width: "100%", maxWidth: "700px" }}
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
                type={
                  (field === "password" && showPassword) || 
                  (field === "confirmPassword" && showConfirmPassword) 
                    ? "text" 
                    : field.includes("password") 
                      ? "password" 
                      : "text"
                }
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={placeHolderText(field)}
                error={formik.errors[field] && formik.touched[field] ? true : false}
                helperText={formik.errors[field] && formik.touched[field] ? formik.errors[field] : ""}
                sx={{ marginBottom: "1em" }}
                InputProps={{
                  endAdornment: field.includes("password") ? (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={`toggle ${field} visibility`}
                        onClick={field === "password" ? handleClickShowPassword : handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {(field === "password" && showPassword) || (field === "confirmPassword" && showConfirmPassword) ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                  style: {
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    marginBottom: ".8em",
                  },
                }}
              />
            ))}
            <Button 
            type="submit"
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

          {formik.errors.general && (
            <Typography color="error" variant="body2">
              {formik.errors.general}
            </Typography>
          )}

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
