 export function getLabel(key) {
  switch (key) {
    case "hiringCompany":
      return "Empresa Contratante";
      case 'projectName':
        return 'Nombre del proyecto'
    case "identifier":
      return "Identificador";
    case "address":
      return " Detalle de Dirección";
    case "block":
      return "Bloque";
    case "unit":
      return "Unidad";
    case "addressDescription":
      return "Detalle de dirección";
    case "zipCode":
      return "Código Postal";

    case "province":
      return "Provincia";
    case "typeOfWork":
      return "Tipo de trabajo";
    case "constructionType":
      return "Tipo de construcción";
    case "map":
      return "Mapa";

    case "startDate":
      return "Fecha de Inicio";
    case "endDate":
      return "Fecha de entrega";

    case "area":
      return "Área";
    case "projectDetails":
      return " Detalles del Proyecto";

    case "taskDescription":
      return "Detalles de la tarea";
    case "createTask":
      return "Tarea";
    case "sections":
      return "Secciones a trabajar";

      case "status":
      return "Estado";
  }
}
 function TranslateSectionName(sectionKey) {
  switch (sectionKey) {
    case "livingRoom":
      return "Salón ";
    case "kitchen":
      return "Cocina";
    case "hall":
      return "Pasillo";
    case "room":
      return "Habitación";
    case "bathRoom":
      return "Baño";
    case " terrace":
      return "Terraza";
    case "laundry":
      return "Lavandería ";
    case "pool":
      return "Piscina";
    case "roof":
      return "Techo";
  }
}

