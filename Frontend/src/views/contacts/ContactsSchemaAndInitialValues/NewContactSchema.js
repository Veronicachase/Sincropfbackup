import * as yup from 'yup';

export const NewContactFormSchema = yup.object().shape({
    contactName:yup.string(),
    category: yup.string().oneOf(["client", "company", "vendor", "contractor", "employee",  "other"]),
    company:yup.string(),
    address:yup.string(),
    email:yup.string().email("Debe ser un email válido"),
    phone: yup.number().typeError("Solo debe contener números, no usar letras o símbolos"),
    
    mobile: yup.number().typeError("Solo debe contener números, no usar letras o símbolos"),
  
    comments:yup.string()
});





