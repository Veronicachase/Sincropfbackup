import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box } from '@mui/material';
import "../assets/styles/estilosGenerales.css"
import { Link } from 'react-router-dom';

export default function FooterPlus(){

<Box
className='bg-primario'
        sx={{
          textAlign: "center",
          width: "100%",
          display: "flex",
          justifyContent:"space-around",
          margin: "0 auto",
          paddingTop:"1em",
          paddingBottom:"1em",
        }}
         
  > 

  <ArrowBackIosIcon sx={{color:"#fff", fontSize:"40px", paddingTop:"15px", paddingBottom:"15px"}}/>
  <Link to="/new-project"> 
  <AddCircleOutlineIcon sx={{color:"#fff", fontSize:"40px", paddingTop:"15px", paddingBottom:"15px"}}/>
  </Link>
  
  </Box>




}