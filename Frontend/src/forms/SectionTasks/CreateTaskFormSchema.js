import * as yup from 'yup';

export const CreateTaskFormSchema=yup.object().shape({
    task:yup.string(),
    employeeName:yup.string(),
    taskDescription:yup.string(),
    startDate: yup.date(),
    endDate: yup.date(),
    files:yup.string(),
    prevImages:yup.string(),
    finalImages:yup.string()
})
   