import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";


export function AddIcon(){
  return ( 
  <Button
  sx={{
    display: "flex",
    width: "200px",
    alignSelf:"flex-end",
    color:"#021F59",
    backgroundColor: "#ffffff4d",
    padding: "1em 2em",
    marginBottom: "1em",
    borderRadius: "5px",
  }}
>
  <Typography>Agregar Proyecto</Typography>
  <AddCircleIcon
    sx={{ color: "#fff", fontSize: "40px", padding: ".2em" }}
  />
</Button>
)
}

