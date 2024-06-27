export function getLabelOrder(key) {
  switch (key) {
    case "orderId":
      return "Numero de Producto";
    case "productName":
      return "Nombre del producto";
    case "projectId":
      return "Id del proyecto";
    case "provider":
      return "Proveedor";
    case "brand":
      return "Marca del producto";
    case "details":
      return "Detalles";
    case "date":
      return "Fecha de creación";
    case "status":
      return "Estado del pedido";

    case "area":
      return "Uso";
    case "section":
      return "Zona a trabajar";
    case "TypeOfWork":
      return "Tipo de trabajo a realizar";
    case "image":
      return "Foto del producto";
    default:
      console.log("Este detalle no esta en la lista de labels o de bd");
  }
}
