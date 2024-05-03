import { Box,  Typography } from "@mui/material";
import UsePageTitle from "./UseLocation";
import { Outlet } from "react-router-dom";


export default function Layout() {
  const title = UsePageTitle();

  return (
   <Box>
      <Box  className='bg-primario'
        sx={{
          textAlign: "center",
          width: "100%",
          display: "flex",
          margin: "0 auto",
          paddingTop:"1em",
          paddingBottom:"1em",
         
        
        }}
      >
        <Typography sx={{ xs: "h3", sm: "h5" }} variant="h6" color="white" paddingLeft="1em">
          {title}
        </Typography>
      </Box>
    
      <Outlet />
     
    </Box>
  );
}
