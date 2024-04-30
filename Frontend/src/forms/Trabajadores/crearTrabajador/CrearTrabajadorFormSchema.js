import * as yup from 'yup';

export const CrearTrabajadorFormSchema= yup.object().shape({

        date:yup.date,
        name: yup.string().required(),
        lastName:yup.string(),
        position:yup.string(),
        obra:yup.string(),

        comentarios:yup.string(),
    
    })
    

