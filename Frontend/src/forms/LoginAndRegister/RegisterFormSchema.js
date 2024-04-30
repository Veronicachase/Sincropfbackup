import * as yup from 'yup';

const passwordRules= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
//min 5 characters, 1 uppercase, 1 lowercase, 1 numeric digit

export const RegisterFormSchema = yup.object().shape({

    name: yup.string().required("El nombre es obligatorio"),
    surname:yup.string(),
    company:yup.string(),
    email: yup.string().email('Invalid email').required("El Email es obligatorio "  ),
    password: yup.string().matches(passwordRules, {message: "La contraseña debe contener //min 5 caracteres, 1 mayúscula, 1 minúscula, 1 número"}).required("Contraseña requerida"),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirmar contraseña es obligatorio'),
    // acceptedTC: yup.boolean().oneOf([true], "Por favor acepte los tèrminos y condiciones").required("requerido")
    
})


   