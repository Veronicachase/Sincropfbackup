/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';


export default function IconColorsOrder({status}){

    let color;
    if (status==="pendiente") {
     color="#F2CB05";
    } else if (status==="recibido") {
     color="#8BB443";
    } else {
     color="#F25244"
    }
   return(
<Box>
<CircleIcon sx={{color:color}}/>
</Box>

   )
}