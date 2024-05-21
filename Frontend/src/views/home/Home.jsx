import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { MenuOptionsList } from "../../components/MenuOptionsList"




export default function HomeOptions() {


  return (
 
      <Box
        sx={{
          width: "80%",
          margin: "auto", 
        }}
      >
        <Grid container spacing={5} justifyContent={"space-between"} marginTop={"3em"} >
          {MenuOptionsList.map((option, index) => (
            <Grid item xs={6} md={6} key={index}>
              <Box
                sx={{
                
                  width: "100%",
                  height: "8em",
                  boxShadow: "1px 2px 3px #ccc",
                  display: "flex",
                  justifyContent:"center",
                  backgroundColor:"#ffffff4d",
                  borderRadius:"5px",
                  padding: "2em .2em",
                  color:"#021F59",
                  transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                 
                }}
              >
                <Link
                  to={option.path}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    flexDirection:"column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                <Typography variant="h5" >{option.name} </Typography>
                  {option.icon }{" "}
                  
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
   
  );
}
