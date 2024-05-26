import { useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";

export default function UsePageTitle() {
  const location = useLocation();

  const pathDir = [
    { path: "/login", title: "" },
    { path: "/create-new-project", title: "Nuevo Proyecto" },
    { path: "/my-projects", title: "Mis Proyectos" },
    { path: "/project-info/:projectId", title: "Información del Proyecto" },
    { path: "/project-edit-info/:projectId", title: "Editar Proyecto" },
    { path: "/project-section-tasks", title: "Tareas por sección" },
    { path: "/project-create-task/:projectId/:sectionKey", title: "Crear tarea" },
    { path: "/project-info-task/:sectionKey", title: "Tarea" },
    { path: "/edit-task/:taskId", title:"Mi Tarea"},
    { path: "/pendings", title: "Mis pendientes" },
    { path: "/progress", title: "Avances de Proyecto" },
    { path: "/order-list", title: "Pedidos de Material" },
    { path: "/order-details/:orderId", title: "Detalles del pedido" },
    { path: "/create-order", title: "Crear Pedido" },
    { path: "/allContacts", title: "Contactos" },
    { path: "/create-contact", title: "Crear contacto nuevo" },
    { path: "/staff-list", title: "Lista de trabajadores" },
    { path: "/create-employee", title: "Crear Trabajador" },
    { path: "/employee", title: "Detalles del trabajador" },
    { path: "/reports", title: "Reporte" },
  ];
  
  const title = pathDir.find(item =>
    matchPath({ path: item.path, end: false }, location.pathname)
  );

  return title ? title.title : "PÁGINA NO ENCONTRADA";
}

