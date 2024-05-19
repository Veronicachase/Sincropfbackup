import * as yup from 'yup';

export const orderFormSchema=yup.object().shape({
    date:yup.date(),
    productName:yup.string(),
    providor:yup.string(),
    brand:yup.string(),
    amount:yup.string(),
    details:yup.string(),
    projectId:yup.string(),
    projectName:yup.string(),
    status:yup.string().oneOf(["pendiente", "recibido"])

})
