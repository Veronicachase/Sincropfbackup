/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';


export default function IconColors({status}){

    let color;
    if (status==="iniciado") {
     color="#F2CB05";
    } else if (status==="terminado") {
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