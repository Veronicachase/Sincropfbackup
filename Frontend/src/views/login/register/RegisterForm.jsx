import { useFormik } from "formik";
import { RegisterFormSchema } from "../LoginRegisterSchemaAndInitialValues/RegisterFormSchema";
import { useNavigate, Link } from "react-router-dom";
import { handleSubmitRegister } from '../../../api/registerApis/handleSubmitRegister'


const RegisterForm = () => {
  
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname:"",
      email: "",
      company:"",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterFormSchema,
    onSubmit: async (values, actions) => {
      const { confirmPassword, ...userData } = values; 
      try {
        await handleSubmitRegister (values, actions, navigate);
        
        navigate("/login");
      } catch (error) {
        console.error("Error registering:", error);
      }
    },
  });

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card shadow" style={{ maxWidth: '400px', width: '100%', padding: '1em'}}>
        <h2 className="text-primary text-center mb-4">Regístrate</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3 text-start">
            <label htmlFor="name" style={{ marginLeft: '10px' }}>Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${formik.errors.name && formik.touched.name ? 'is-invalid' : ''}`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
          </div>
          <div className="form-group mb-3 text-start">
            <label htmlFor="surname" style={{ marginLeft: '10px' }}>Apellido</label>
            <input
              type="text"
              id="surname"
              name="surname"
              className={`form-control ${formik.errors.surname && formik.touched.surname ? 'is-invalid' : ''}`}
              value={formik.values.surname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.surname && formik.touched.surname && (
              <div className="invalid-feedback">{formik.errors.surname}</div>
            )}
          </div>
          <div className="form-group mb-3 text-start">
            <label htmlFor="company" style={{ marginLeft: '10px' }}>Empresa</label>
            <input
              type="text"
              id="company"
              name="company"
              className={`form-control ${formik.errors.company && formik.touched.company ? 'is-invalid' : ''}`}
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.company && formik.touched.company && (
              <div className="invalid-feedback">{formik.errors.company}</div>
            )}
          </div>

          <div className="form-group mb-3 text-start">
            <label htmlFor="email " style={{ marginLeft: '10px' }}>Email</label>
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

          <div className="form-group mb-3 text-start">
            <label htmlFor="password" style={{ marginLeft: '10px' }}>Contraseña</label>
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

          <div className="form-group mb-3 text-start">
            <label htmlFor="confirmPassword" style={{ marginLeft: '10px' }}>Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`form-control ${formik.errors.confirmPassword && formik.touched.confirmPassword ? 'is-invalid' : ''}`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <div className="d-grid mb-3 text-start m">
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
              Registrarse
            </button>
          </div>

          <div className="text-center">
            <p className="mb-1">
              ¿Ya tienes una cuenta?
              <Link to="/login" className="text-primary ms-1">
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
