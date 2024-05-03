import { useLocation } from "react-router-dom";

export default function UsePageTitle() {
  const location = useLocation();
  const pathDir = {
    "/login": "",
    "/new-project": "Nuevo Proyecto",
    "/my-projects": "Mis Proyectos",
    "/project" : "Proyecto",
    "/pendings" : "Mis pendientes",
    "/progress": "Avances de Proyecto",
    "/material": "Material y pedidos",
    "/contacts": "Contactos",
    "/staff-list": "Lista de trabajadores",
    "/create-employee": "Crear Trabajador",
    "/employee" : "Trabajador",
    "/reports": "Report",
  };

  return pathDir[location.pathname] || "PÁGINA NO ENCONTRADA";
}

