import * as yup from 'yup';

export const NewTaskFormSchema=yup.object().shape({
    task:yup.string(),
    employeeName:yup.string(),
    taskDescription:yup.string(),
    startDate: yup.date(),
    endDate: yup.date(),
    status:yup.string().oneOf(["noIniciado", "Iniciado", "Terminado"]),
    prevImages:yup.string(),
    finalImages:yup.string()
})
   