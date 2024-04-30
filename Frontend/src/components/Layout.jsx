import { Box, Grid, Typography } from "@mui/material";
import UsePageTitle from "./UseLocation";
import { Outlet } from "react-router-dom";


export default function Layout() {
  const title = UsePageTitle();

  return (
    <>
      
      <Box  className='bg-primario'
        sx={{
          textAlign: "center",
          p: 2,
          width: "100%",
          borderRadius: "10px",
          display: "flex",
          margin: "0 auto"
         
       
        }}
      >
        <Typography sx={{ xs: "h5", sm: "h3" }} variant="h6" color="white">
          {title}
        </Typography>
      </Box>
    
      <Outlet />
    </>
  );
}
