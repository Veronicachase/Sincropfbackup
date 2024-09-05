import * as yup from 'yup';

export const ValidationSchemaHours = yup.object().shape({
  date: yup.date().required('La fecha es obligatoria'),
  regularHours: yup.number().min(0, 'Las horas no pueden ser negativas').max(10, 'Las horas regulares no pueden ser mayor a 10 por día'),
  regularMinutes: yup.number().min(0, 'Los minutos no pueden ser negativos').max(59, 'Los minutos no pueden exceder de 59'),
  extraHours: yup.number().min(0, 'Las horas extras no pueden ser negativas'),
  extraMinutes: yup.number().min(0, 'Los minutos extras no pueden ser negativos').max(59, 'Los minutos extras no pueden exceder de 59'),
});

