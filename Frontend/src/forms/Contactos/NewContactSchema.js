import * as yup from 'yup';

export const NewContactFormSchema = yup.object().shape({
    contactName:yup.string(),
    category: yup.string().oneOf(["client", "company", "vendor", "contactor", "employee",  "other"]),
    company:yup.string(),
    address:yup.string(),
    email:yup.string(),
    phone: yup.number().typeError("El número de móvil debe ser un número"),
    
    mobile: yup.number().typeError("El número de móvil debe ser un número"),
  
    comments:yup.string()
});








