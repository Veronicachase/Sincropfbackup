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
  section: yup.object().shape({}).test(
    'is-valid-sections',
    'sections must be an object with boolean values',
    value => {
      if (typeof value !== 'object' || value === null) {
        return false;
      }
      return Object.values(value).every(val => val === true);
    }
  ),
});









