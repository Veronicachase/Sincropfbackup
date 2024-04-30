import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function InicioPersonal() {
  return (
    <> 
    <Box
      sx={{
        textAlign: "center",
        mt: 10,
        width: "100%",
        display: "flex",
        alignContent: "baseline",
        justifyContent:'center',
        alignItems:'baseline',
        boxShadow: '1px 2px 3px #ccc' ,
        maxWidth:'350PX'
      }}
    >
      <h4>CREAR NUEVO TRABAJADOR </h4>
      <Link to="/crear-trabajador">
        <AddCircleIcon sx={{fontSize:'50px', color:'#021F59', marginLeft:'10px'}}/>
      </Link>
    </Box>


    <Box
      sx={{
        textAlign: "center",
        mt: 10,
        width: "100%",
        display: "flex",
        alignContent: "baseline",
        justifyContent:'center',
        alignItems:'baseline',
        boxShadow: '1px 2px 3px #ccc', 
        maxWidth:'350PX'
      }}
    >
      
      <Link  to="/lista-trabajadores ">
      <h4 >LISTA DE TRABAJADORES </h4>
      </Link>
    </Box>    
    </>
  );
}
