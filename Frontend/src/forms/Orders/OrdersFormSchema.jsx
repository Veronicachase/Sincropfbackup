import * as yup from 'yup';

 export const OrderFormSchema = yup.object().shape({
  productName: yup.string(),
  providor: yup.string(),
  brand: yup.string(),
  amount: yup.string(),
  details: yup.string(),
  TypeOfWork: yup.string().oneOf(["construction", "finishings", "installations", "pool", "SolarPanels", "other"]),
  status: yup.string(),
  date: yup.date(),
  sections: yup.object().shape({
    livingRoom: yup.boolean(),
    kitchen: yup.boolean(),
    hall: yup.boolean(),
    room: yup.boolean(),
    bathRoom: yup.boolean(),
    terrace: yup.boolean(),
    laundry: yup.boolean(),
    pool: yup.boolean(),
    roof: yup.boolean()
  }),

})








