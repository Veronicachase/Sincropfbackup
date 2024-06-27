import * as yup from 'yup';

 export const OrderFormSchema = yup.object().shape({
  date: yup.date(),
  productName: yup.string(),
  provider: yup.string(),
  brand: yup.string(),
  amount: yup.string(),
  details: yup.string(),
  status:yup.string().oneOf(["pendiente", "recibido"]),
  image:yup.string(),
  projectName:yup.string(),
  projectId:yup.number()

});









