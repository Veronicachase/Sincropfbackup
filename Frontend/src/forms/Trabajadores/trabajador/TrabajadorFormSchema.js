import * as yup from 'yup';

export const TrabajadorFormSchema = yup.object().shape({
  fecha: yup.date().required('La fecha es obligatoria'),
  horas: yup.number().min(0, 'Las horas no pueden ser negativas'),
  minutos: yup.number().min(0, 'Los minutos no pueden ser negativos').max(59, 'Los minutos no pueden exceder de 59'),
  horasExtras: yup.number().min(0, 'Las horas extras no pueden ser negativas'),
  minutosExtras: yup.number().min(0, 'Los minutos extras no pueden ser negativos').max(59, 'Los minutos extras no pueden exceder de 59'),
});