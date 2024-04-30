
import * as yup from 'yup';

export const AdvancedFormSchema = yup.object().shape({
 empresaContratante:yup.string(),
 identificador:yup.string().required("Debes agregar un identificador"),
 bea:yup.string().max(20),
 portal:yup.string().max(10),
 unidad:yup.string().max(10),
 detalleDireccion:yup.string(),
 codigoPostal:yup.number().max(5),
 provincia:yup.string(),
 tipodeTrabajo:yup.string().oneOf(["construccion", "reparasos", "instalaciónEquipo", "piscinas","instPaneleSolares",  "otra"]),
 tipodeConstucción:yup.string().oneOf(["chalet", "piso", "rural", "otra"]),
 ubicacionMap: yup.string()
        .required('Este campo es obligatorio')
        .matches(
            /^-?\d+(\.\d+)?, \s*-?\d+(\.\d+)?$/,
            'El formato de la ubicación debe ser "latitud, longitud"'
        ) ,
 
 fechadeInicio:yup.date(),
 fechaEntrega:yup.date(),
 detalledeProyecto:yup.string()
 
});












// export const AdvancedFormSchema = yup.object().shape({
//     username: yup.string().min(5).required("Username is required"),
//     jobType: yup.string().oneOf(["developer", "designer", "manager", "other"], "Invalid Job Type").required("Job type is required"),
//     acceptedTC: yup.boolean().oneOf([true], "Please accept the terms and conditions")
// })