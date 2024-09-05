import * as yup from "yup";
import moment from 'moment'

export const CrearTrabajadorFormSchema = yup.object().shape({
  date: yup.date().transform((value, originalValue) => {
    return originalValue ? moment(originalValue, 'YYYY-MM-DD').toDate() : value;
  }),
  name: yup.string().required(),
  position: yup.string().oneOf(["Encargado", "Ayudante", "Principal","Becario", "Otro" ]),
  project: yup.string(),

  mandatoryEquipment: yup.string().oneOf(["Si", "No", "Incompleto"]),
  comments: yup.string(),
});
