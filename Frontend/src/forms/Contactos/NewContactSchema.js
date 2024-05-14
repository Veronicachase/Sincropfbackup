import * as yup from 'yup';

export const NewContactFormSchema = yup.object().shape({
    category: yup.string().oneOf(["client", "company", "vendor", "contactor", "employee",  "other"]),
    company:yup.string(),
    address:yup.string(),
    email:yup.string(),
    phone: yup.string().matches(
        /^(\+?\d{1,3}[- ]?)?\d{10}$/, 
        "Invalid phone number"
    ),
    comments:yup.string()
});








