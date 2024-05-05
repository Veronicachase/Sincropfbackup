import * as yup from 'yup';

export const SectionTaskFormSchema=yup.object().shape({
    task:yup.string(),
    employeeName:yup.string(),
    taskDescription:yup.string(),
    startDate: yup.date(),
    endDate: yup.date(),
})
   