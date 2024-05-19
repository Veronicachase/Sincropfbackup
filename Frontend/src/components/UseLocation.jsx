import { useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";

export default function UsePageTitle() {
  const location = useLocation();

  const pathDir = [
    { path: "/login", title: "" },
    { path: "/create-new-project", title: "Nuevo Proyecto" },
    { path: "/my-projects", title: "Mis Proyectos" },
    { path: "/project-info/:projectId", title: "Información del Proyecto" },
    { path: "/project-section-tasks", title: "Tareas" },
    { path: "/project-info-task/:projectId/:sectionKey", title: "Crear tarea" },
    { path: "/project-info-task/:sectionKey", title: "Tarea" },
    { path: "/pendings", title: "Mis pendientes" },
    { path: "/progress", title: "Avances de Proyecto" },
    { path: "/material", title: "Material y pedidos" },
    { path: "/allContacts", title: "Contactos" },
    { path: "/staff-list", title: "Lista de trabajadores" },
    { path: "/create-employee", title: "Crear Trabajador" },
    { path: "/employee", title: "Trabajador" },
    { path: "/reports", title: "Report" },
  ];

  const title = pathDir.find(item =>
    matchPath({ path: item.path, end: false }, location.pathname)
  );

  return title ? title.title : "PÁGINA NO ENCONTRADA";
}
