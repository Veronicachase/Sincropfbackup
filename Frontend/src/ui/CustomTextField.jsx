
import {useField} from "formik";
import { TextField  } from '@mui/material'; 


// eslint-disable-next-line react/prop-types
function CustomTextField({label, ...props}) {
    const [field, meta] = useField(props);
 
  return (
    <>
    <label>{label}</label>
    <TextField {...props} {...field} 
    className={meta.touched && meta.error ? "input-error" : ""}
    variant="outlined"
    fullWidth
    
    />
     {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  )
}

export default CustomTextField