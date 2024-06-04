import * as yup from 'yup';

export const NewProjectFormSchema = yup.object().shape({
  projectName: yup.string(),
  hiringCompany: yup.string(),
  identifier: yup.string().required("Debes agregar un identificador"),
  block: yup.string().max(20),
  unit: yup.string().max(10),
  addressDrescription: yup.string(),
  zipCode: yup.number(),
  province: yup.string(),
  TypeOfWork: yup.string().oneOf(["construction", "finishings", "installations",  "solarPanels", "other"]),
  ConstructionType: yup.string().oneOf(["chalet", "apartment", "rural", "other"]),
  map: yup.string().nullable().matches(
    /^-?\d+(\.\d+)?, \s*-?\d+(\.\d+)?$/,         
    'El formato de la ubicación debe ser "latitud, longitud"'
  ),
  startDate: yup.date(),
  endDate: yup.date(),
  projectDescription: yup.string(),
  //createTask: yup.string(),
  sections: yup.array().of(
    yup.string()
  ),
  status: yup.string().oneOf(["noIniciado", "iniciado", "terminado"]),
  image:yup.string()
});











