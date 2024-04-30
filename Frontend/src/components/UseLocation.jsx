import { useLocation } from "react-router-dom";

export default function UsePageTitle() {
  const location = useLocation();
  const pathDir = {
    "/login": "",
    "/inicio-proyecto": "INICIO PROYECTO",
    "/proyecto-nuevo": "NUEVO PROYECTO",
    "/mis-proyectos": "MIS PROYECTOS",
    "/proyecto": "PROYECTO",
    "/pendientes": "MIS PENDIENTES",
    "/avances": "AVANCES DE PROYECTO",
    "/material": "MATERIAL Y PEDIDOS",
    "/contactos": "CONTACTOS",
    "/inicio-personal": "INICIO PERSONAL",
    "/crear-trabajador": "CREAR TRABAJADOR",
    "/lista-trabajadores": "LISTA DE TRABAJADORES",
    "/trabajador": "TRABAJADOR",
    "/reportes": "REPORTE",
  };

  return pathDir[location.pathname] || "PÁGINA NO ENCONTRADA";
}
