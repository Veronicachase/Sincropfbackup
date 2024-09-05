import { useField } from "formik";

export default function Checkbox({ ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="checkbox">
      <input {...props} {...field} />
      <span>I accept the terms and conditions</span>
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
}
