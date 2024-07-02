import * as yup from "yup";

export const CreateTaskFormSchema = yup.object().shape({
  taskName: yup.string().required("El nombre de la tarea es obligatorio"),
  employeeId: yup.number(),
  employeeName: yup.string(),
  projectId: yup.number(),
  sectionKey: yup.string(),
  taskDescription: yup.string(),
  startDate: yup
    .date()
    .max(
      yup.ref("endDate"),
      "La fecha de inicio debe ser antes de la fecha de entrega"
    ),
  endDate: yup
    .date()
    .min(
      yup.ref("startDate"),
      "La fecha de entrega debe ser después de la fecha de inicio"
    ),
  status: yup.string().oneOf(['noIniciado', 'iniciado', 'terminado']),
  prevImages: yup.array().of(yup.string().url()),
  finalImages: yup.array().of(yup.string().url()),
});
