import * as yup from 'yup';

 export const OrderFormSchema = yup.object().shape({
  date: yup.date(),
  productName: yup.string(),
  providor: yup.string(),
  brand: yup.string(),
  amount: yup.string(),
  details: yup.string(),
  typeOfWork: yup.string().oneOf(["construction", "finishings", "instalations", "solarPanels", "other"]),
  section: yup.string(),
  status:yup.string().oneOf(["pendiente", "recibido"]),
  image:yup.string(),
  projectName:yup.string()

});









