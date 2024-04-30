import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import BadgeIcon from "@mui/icons-material/Badge";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { useTheme, ThemeProvider } from "@mui/material/styles";

const Options = [
  {
    name: "Proyectos",
    path: "/inicio-proyecto",
    icon: <ArchitectureIcon color="theme.palette.primary.main" />,
  },

  { name: "Pendientes", path: "/pendientes", icon: <PendingActionsIcon /> },
  { name: "Avances", path: "/avances", icon: <StackedLineChartIcon /> },
  { name: "Material y Pedidos", path: "/material", icon: <AllInboxIcon /> },
  { name: "Contactos", path: "/contactos", icon: <ContactPhoneIcon /> },
  { name: "Personal", path: "/personal", icon: <BadgeIcon /> },
  { name: "Reportes", path: "/reportes", icon: <SummarizeIcon /> },
];

export default function HomeOptions() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "80%",
          margin: "auto",
          color: theme.palette.primary.main,
          
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
                  backgroundColor:"#f2faff",
                  borderRadius:"5px",
                  padding: "1em .5em",
                  color:"#021F59"
                }}
              >
                <Link
                  to={option.path}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {option.icon}{" "}
                  <span style={{ marginLeft: "10px" }}>{option.name}</span>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
