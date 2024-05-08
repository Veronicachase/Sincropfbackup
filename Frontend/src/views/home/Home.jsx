import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import BadgeIcon from "@mui/icons-material/Badge";
import SummarizeIcon from "@mui/icons-material/Summarize";


const Options = [
  {
    name: "Proyectos", path: "/my-projects",
    icon: <ArchitectureIcon sx={{color:"#fff", fontSize:"40px", paddingTop:"15px", paddingBottom:"15px"}}/>,
  },
  { name: "Pendientes", path: "/pendings", icon: <PendingActionsIcon sx={{color:"#fff", fontSize:"40px", paddingTop:"15px", paddingBottom:"15px"}} /> },
  { name: "Avances", path: "/progress", icon: <StackedLineChartIcon  sx={{color:"#fff", fontSize:"40px", paddingTop:"15px", paddingBottom:"15px"}}/> },
  { name: "Material y Pedidos", path: "/material", icon: <AllInboxIcon sx={{color:"#fff", fontSize:"40px", paddingTop:"15px", paddingBottom:"15px"}} /> },
  { name: "Contactos", path: "/contacts", icon: <ContactPhoneIcon sx={{color:"#fff", fontSize:"40px", paddingTop:"15px", paddingBottom:"15px"}} /> },
  { name: "Personal", path: "/staff-list", icon: <BadgeIcon sx={{color:"#fff", fontSize:"40px", paddingTop:"15px", paddingBottom:"15px"}}/> },
  { name: "Reportes", path: "/reports", icon: <SummarizeIcon sx={{color:"#fff", fontSize:"40px", paddingTop:"15px", paddingBottom:"15px"}} /> },
];

export default function HomeOptions() {


  return (
 
      <Box
        sx={{
          width: "80%",
          margin: "auto", 
        }}
      >
        <Grid container spacing={5} justifyContent={"space-between"} marginTop={"3em"} >
          {Options.map((option, index) => (
            <Grid item xs={6} md={6} key={index}>
              <Box
                sx={{
                
                  width: "100%",
                  height: "5em",
                  boxShadow: "1px 2px 3px #ccc",
                  display: "flex",
                  justifyContent:"center",
                  backgroundColor:"#84C7AE",
                  borderRadius:"5px",
                  padding: "1em .5em",
                  color:"#021F59",
                  fontWeight:"Bold"
                }}
              >
                <Link
                  to={option.path}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    flexDirection:"column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                <span style={{ marginLeft: "10px" }}>{option.name}</span>
                  {option.icon }{" "}
                  
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
   
  );
}
