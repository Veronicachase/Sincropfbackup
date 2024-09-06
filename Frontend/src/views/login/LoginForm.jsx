
import { useFormik } from "formik";
import { LoginFormSchema } from "./LoginRegisterSchemaAndInitialValues/LoginFormSchema";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card shadow" style={{ maxWidth: '400px', width: '100%', padding: '2em' }}>
        <h2 className="text-primary text-center mb-4">Iniciar Sesión</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Ingrese su email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Ingrese su contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control ${formik.errors.password && formik.touched.password ? 'is-invalid' : ''}`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
              Iniciar sesión
            </button>
          </div>

          <div className="text-center">
            <p className="mb-1">
              ¿No tienes una cuenta?
              <Link to="/register" className="text-primary ms-1">
                Regístrate
              </Link>
            </p>
            <p className="mb-1">
              ¿Olvidaste tu contraseña?
              <Link to="/forgot-password" className="text-primary ms-1">
                Haz click aquí para recuperarla
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;