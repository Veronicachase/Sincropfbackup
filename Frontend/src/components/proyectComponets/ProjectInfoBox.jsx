
import { Typography, Box } from "@mui/material"

function ProjectInfoBox({name, property,property1, property2,property3,property4,property5, }) {
  return (
    <Box sx={{ borderBottom: '1px solid #ccc', marginBottom:"1em"}}>
    <Typography variant="body2" sx={{  marginLeft: 2 }}>
      <strong>{name}</strong> {property}
      
    </Typography>
    {property1 && <Typography variant="body2">{property1}</Typography> }
    {property2 && <Typography variant="body2">{property2}</Typography> }
    {property3 && <Typography variant="body2">{property3}</Typography> }
    {property4 && <Typography variant="body2">{property4}</Typography> }
    {property5 && <Typography variant="body2">{property5}</Typography> }
   
  </Box>

    
  )
}

export default ProjectInfoBox



