
import { useField } from "formik";

// eslint-disable-next-line react/prop-types
function Select({label,children, ...props}) {
    const [field, meta] = useField(props);
    return (
      <>
      <label>{label}</label>
      <select {...props} {...field}
      className={meta.touched && meta.error ? "input-error": ""}
      >
        {children}
      </select>
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
      </>
    )
  }
  
  export default Select;