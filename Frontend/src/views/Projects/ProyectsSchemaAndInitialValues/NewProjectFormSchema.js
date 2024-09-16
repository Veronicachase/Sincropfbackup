import * as yup from 'yup';

export const NewProjectFormSchema = yup.object().shape({
  projectName: yup.string().nullable(true),
  hiringCompany: yup.string().nullable(true),
  block: yup.string().max(20).nullable(true),
  unit: yup.string().max(10).nullable(true),
  addressDescription: yup.string().nullable(true),
  zipCode: yup.number().nullable(true).typeError('Debe ser un número'),
  province: yup.string().nullable(true),
  typeOfWork: yup.string().oneOf(["construction", "finishings", "installations", "solarPanels", "other"]).nullable(true),
  constructionType: yup.string().oneOf(["chalet", "apartment", "rural", "other"]).nullable(true),
  startDate: yup.date().nullable(true).typeError('Debe ser una fecha válida'),
  endDate: yup.date().nullable(true).typeError('Debe ser una fecha válida'),
  projectDescription: yup.string().nullable(true),
  sections: yup.array().of(yup.string()).nullable(true),
  status: yup.string().oneOf(["noIniciado", "iniciado", "terminado"]).nullable(true),
  image: yup.mixed().nullable(true)
});




 


 
 
  
 


 

 
  
 

 









