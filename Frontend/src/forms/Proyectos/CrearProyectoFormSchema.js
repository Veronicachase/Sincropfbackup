
import * as yup from 'yup';

export const crearProyectoFormSchema = yup.object().shape({
 projectName:yup.string(),
 hiringCompany:yup.string(),
 identifier:yup.string().required("Debes agregar un identificador"),
 address:yup.string(),
 block:yup.string().max(20),
 unit:yup.string().max(10),
 addressDescription:yup.string(),
 zipCode:yup.number(),
 province:yup.string(),
 TypeOfWork:yup.string().oneOf(["construction", "finishings", "installations", "pool","SolarPanels",  "other"]),
 ConstructionType:yup.string().oneOf(["chalet", "apartment", "rural", "other"]),
 map: yup.string()
        .matches(
            /^-?\d+(\.\d+)?, \s*-?\d+(\.\d+)?$/,         
            'El formato de la ubicación debe ser "latitud, longitud"'
        ) ,
 
 startDate:yup.date(),
 endDate:yup.date(),
 area:yup.string(),
 projectDetails:yup.string(),
 projectDescription:yup.string(),
 taskDescription:yup.string(),
 createTask:yup.string(),
 addedSection:yup.string(),
 livingRoom: yup.boolean(),
 kitchen: yup.boolean(),
 hall: yup.boolean(),
 room: yup.boolean(),
 bathRoom: yup.boolean(),
 terrace: yup.boolean(),
 laundry: yup.boolean(),
 pool: yup.boolean(),
 roof: yup.boolean(),



});











