import * as yup from 'yup';

export const NewProjectFormSchema = yup.object().shape({
  projectName: yup.string(),
  hiringCompany: yup.string(),
  identifier: yup.string().required("Debes agregar un identificador"),
  block: yup.string().max(20),
  unit: yup.string().max(10),
  addressDescription: yup.string(),
  zipCode: yup.number(),
  province: yup.string(),
  TypeOfWork: yup.string().oneOf(["construction", "finishings", "installations",  "solarPanels", "other"]),
  ConstructionType: yup.string().oneOf(["Chalet", "Apartment", "Rural", "Other"]),
  map: yup.string().matches(
    /^-?\d+(\.\d+)?, \s*-?\d+(\.\d+)?$/,         
    'El formato de la ubicación debe ser "latitud, longitud"'
  ),
  startDate: yup.date(),
  endDate: yup.date(),
  projectDescription: yup.string(),
  taskDescription: yup.string(),
  createTask: yup.string(),
  addedSection: yup.string(),
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
  status: yup.string(),
  image:yup.string()
});











