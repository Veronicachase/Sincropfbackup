import * as yup from 'yup';

export const orderFormSchema=yup.object().shape({
    productName:yup.string(),
    providor:yup.string(),
    brand:yup.string(),
    amount:yup.string(),
    details:yup.string(),
    orderDate: yup.date(),
    status:yup.string().oneOf(["pendiente", "recibido"])

})
