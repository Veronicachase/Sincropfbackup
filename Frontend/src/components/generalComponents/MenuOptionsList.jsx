

import AllInboxIcon from "@mui/icons-material/AllInbox";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
//import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import BadgeIcon from "@mui/icons-material/Badge";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LogoutIcon from '@mui/icons-material/Logout';

export const MenuOptionsList = [
    {
      name: "Proyectos", path: "/my-projects",
      icon: <ArchitectureIcon sx={{color:"#F0ED38", fontSize:"65px", paddingTop:"15px", paddingBottom:"15px", cursor:"pointer"}}/>,},
    { name: "Pendientes", path: "/pendings", icon: <PendingActionsIcon sx={{color:"#D6556C", fontSize:"65px", paddingTop:"15px", paddingBottom:"15px", cursor:"pointer"}} /> },
    { name: "Pedidos", path: "/order-list", icon: <AllInboxIcon sx={{color:"#DA8F44", fontSize:"65px", paddingTop:"15px", paddingBottom:"15px" , cursor:"pointer"}} /> },
    { name: "Contactos", path: "/allContacts", icon: <ContactPhoneIcon sx={{color:"#29BADE", fontSize:"65px", paddingTop:"15px", paddingBottom:"15px" , cursor:"pointer"}} /> },
    { name: "Personal", path: "/staff-list", icon: <BadgeIcon sx={{color:"#84C7AE", fontSize:"65px", paddingTop:"15px", paddingBottom:"15px" , cursor:"pointer"}}/> },
    { name: "Reportes", path: "/reports", icon: <SummarizeIcon sx={{color:"#AD6DF1", fontSize:"65px", paddingTop:"15px", paddingBottom:"15px" , cursor:"pointer"}} /> },
    { name: "Salir", path: "/login", icon: <LogoutIcon sx={{color:"#AD6DF1", fontSize:"65px", paddingTop:"15px", paddingBottom:"15px" , cursor:"pointer"}} /> },
  ];

  
