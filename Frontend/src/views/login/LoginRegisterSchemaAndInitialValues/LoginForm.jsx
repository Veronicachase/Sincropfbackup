import { useFormik } from "formik";
import { BasicFormSchema } from "./BasicFormSchema";

export function BasicForm() {
  const { values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting } = useFormik({
    initialValues: {
      
      email: "",
      password: "",
     
    },
    /* asegurarme de que estos values son iguales en la base de datos */
    validationSchema: BasicFormSchema,
  
  });
  return (
    <>
      <form onSubmit={handleSubmit}>
    
    

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

      
        <button disabled={isSubmitting}>Submit</button>
      </form>
      <pre>{JSON.stringify({ values, errors }, null, 1)}</pre>
    </>
  );
}

export default BasicForm;
