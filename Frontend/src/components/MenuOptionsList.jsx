

import AllInboxIcon from "@mui/icons-material/AllInbox";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
//import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import BadgeIcon from "@mui/icons-material/Badge";
import SummarizeIcon from "@mui/icons-material/Summarize";

export const MenuOptionsList = [
    {
      name: "Proyectos", path: "/my-projects",
      icon: <ArchitectureIcon sx={{color:"#fff", fontSize:"60px", paddingTop:"15px", paddingBottom:"15px"}}/>,},
    { name: "Pendientes", path: "/pendings", icon: <PendingActionsIcon sx={{color:"#fff", fontSize:"45px", paddingTop:"15px", paddingBottom:"15px"}} /> },
    { name: "Material y Pedidos", path: "/order-list", icon: <AllInboxIcon sx={{color:"#fff", fontSize:"45px", paddingTop:"15px", paddingBottom:"15px"}} /> },
    { name: "Contactos", path: "/allContacts", icon: <ContactPhoneIcon sx={{color:"#fff", fontSize:"45px", paddingTop:"15px", paddingBottom:"15px"}} /> },
    { name: "Personal", path: "/staff-list", icon: <BadgeIcon sx={{color:"#fff", fontSize:"45px", paddingTop:"15px", paddingBottom:"15px"}}/> },
    { name: "Reportes", path: "/reports", icon: <SummarizeIcon sx={{color:"#fff", fontSize:"45px", paddingTop:"15px", paddingBottom:"15px"}} /> },
  ];

  
