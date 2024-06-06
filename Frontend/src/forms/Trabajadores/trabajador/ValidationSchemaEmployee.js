import * as yup from 'yup';

export const ValidationSchemaEmployee = yup.object({
    mandatoryEquipment: yup
      .string()
      .oneOf(["Si", "No", "Incompleto"], "Opción no válida")
      .required("El equipo entregado es obligatorio"),
    comments: yup.string().required("Los comentarios son obligatorios"),
  });
  