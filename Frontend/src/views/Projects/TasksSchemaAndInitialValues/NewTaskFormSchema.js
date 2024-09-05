import * as yup from 'yup';

export const NewTaskFormSchema=yup.object().shape({
    taskName:yup.string(),
    employeeId:yup.number(),
    employeeName:yup.string(),
    projectId:yup.number(),
    sectionKey:yup.string(),
    taskDescription:yup.string(),
    startDate: yup.date(),
    endDate: yup.date(),
    status:yup.string().oneOf(["noIniciado", "Iniciado", "Terminado"]),
    prevImages:yup.mixed(),
    finalImages:yup.mixed()
})
   