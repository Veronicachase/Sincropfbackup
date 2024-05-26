import * as yup from "yup";

export const CrearTrabajadorFormSchema = yup.object().shape({
  date: yup.date(),
  name: yup.string().required(),
  position: yup.string().oneOf(["Encargado", "Ayudante", "Principal","Becario", "Otro" ]),
  project: yup.string(),

  mandatoryEquipment: yup.string().oneOf(["Si", "No", "Incompleto"]),
  comments: yup.string(),
});
