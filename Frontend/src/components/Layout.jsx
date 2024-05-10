import { Box, Typography } from "@mui/material";
import UsePageTitle from "./UseLocation";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";

export default function Layout() {
  const title = UsePageTitle();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box>
      <Box
        className="bg-primario"
        sx={{
          textAlign: "center",
          width: "100%",
          display: "flex",
          margin: "0 auto",
          paddingTop: "1em",
          paddingBottom: "1em",
        }}
      >
        <Typography
          sx={{ typography: { xs: "h6", sm: "h5" } }}
          variant="h6"
          color="white"
          paddingLeft="1em"
        >
          {title}
        </Typography>
      </Box>
  
      <Outlet />
  
      <Box
        className="bg-primario"
        sx={{
          textAlign: "center",
          width: "100%",
          display: "flex",
          margin: "0 auto",
          paddingTop: "1em",
          paddingBottom: "1em",
        }}
      >
        
        {(() => {
          switch (location.pathname) {
            case "/my-projects":
              return (
                <Box sx={{display:"flex", justifyContent:"space-around", position:"absolute", bottom:0}}>
                  <IconButton onClick={() => handleNavigate(-1)}>
                    <ArrowBackIosIcon />
                  </IconButton>
                  <IconButton onClick={() => handleNavigate("/project-info")}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleNavigate("/create-new-project")}>
                    <AddCircleIcon />
                  </IconButton>
                </Box>
              );
            case "/project-info":
              return (
                <Box sx={{display:"flex", justifyContent:"space-around", position:"absolute", bottom:0}}>
                  <IconButton onClick={() => handleNavigate(-1)}>
                    <ArrowBackIosIcon />
                  </IconButton>
                  <EditIcon /> {/* aqui tengo que crear una función para editar proyecto */}
                  <AddCircleIcon /> {/* y aqui otra para función para agregar sección */}
                </Box>
              );
            case "/project-section-tasks":
              return (
                <Box sx={{display:"flex", justifyContent:"space-around", position:"absolute", bottom:0}}>
                  <IconButton onClick={() => handleNavigate(-1)}>
                    <ArrowBackIosIcon />
                  </IconButton>
                  <IconButton onClick={() => handleNavigate("/project-create-task")}>
                    <AddCircleIcon />
                  </IconButton>
                </Box>
              );
            case "/project-create-task":
              return (
                <Box sx={{display:"flex", justifyContent:"space-around", position:"absolute", bottom:0}}>
                  <IconButton onClick={() => handleNavigate(-1)}>
                    <ArrowBackIosIcon />
                  </IconButton>
                </Box>
              );
            case "/project-info-task":
              return (
                <Box sx={{display:"flex", justifyContent:"space-around", position:"absolute", bottom:0}} >
                  <IconButton onClick={() => handleNavigate(-1)}>
                    <ArrowBackIosIcon />
                  </IconButton>
                  <EditIcon /> {/* lo mismo aquí ----Función para editar */}
                  <IconButton onClick={() => handleNavigate("/project-create-task")}>
                    <AddCircleIcon />
                  </IconButton>
                </Box>
              );
            default:
              console.log("Dirección no definida en el switch");
          }
        })()}
      </Box>
    </Box>
  );
}  