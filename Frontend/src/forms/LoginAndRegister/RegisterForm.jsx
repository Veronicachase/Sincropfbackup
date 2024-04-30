import { useFormik } from "formik";
import {RegisterFormSchema } from "./RegisterFormSchema";

export function LoginForm() {
  const { values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting } = useFormik({
    initialValues: {
      name:"",
      lastName:"",
      company:"",
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTC: false
    },
    /* asegurarme de que estos values son iguales en la base de datos */
    validationSchema: RegisterFormSchema,
  
  });
  return (
    <>
      <form onSubmit={handleSubmit}>
      <input
      type="text"
      id="name"
      value={values.name}
      onChange={handleChange}
      placeholder="Name"
      onBlur={handleBlur("name")}
      className={errors.name && touched.name ? "input-error" : ""}
    />
    {errors.name && touched.name &&(
        <p className="error">{errors.name}</p>
    )}
    <input
          type="text"
          id="lastName"
          value={values.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          onBlur={handleBlur("lastName")}
          className={errors.lastName && touched.lastName ? "input-error" : ""}
        />
        {errors.lastName && touched.lastName &&(
            <p className="error">{errors.lastName}</p>
        )}

        <input
          type="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          onBlur={handleBlur}
          className={errors.email && touched.email ? "input-error" : ""}
        />
        {errors.email && touched.email &&(
            <p className="error">{errors.email}</p>
        )}

        
        <input
        type="text"
        id="company"
        value={values.company}
        onChange={handleChange}
        placeholder="Company"
        onBlur={handleBlur}
        className={errors.company && touched.company ? "input-error" : ""}
      />
      {errors.company && touched.company &&(
          <p className="error">{errors.company}</p>
      )}


        <input
          value={values.password}
          id="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          onBlur={handleBlur}
          className={errors.password && touched.password ? "input-error" : ""}
        />
        {errors.password && touched.password &&(
            <p className="error">{errors.password}</p>
        )}

        <input
        value={values.confirmPassword}
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Confirm Password"
        className={errors.confirmPassword && touched.confirmPassword ? "input-error" : ""}
      />
      {errors.confirmPassword && touched.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
      )}
        <button disabled={isSubmitting}>Submit</button>
      </form>
      <pre>{JSON.stringify({ values, errors }, null, 1)}</pre>
    </>
  );
}

export default LoginForm;
