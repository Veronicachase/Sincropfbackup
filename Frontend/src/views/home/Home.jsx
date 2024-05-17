import { Box, Grid } from "@mui/material";
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
                  height: "5em",
                  boxShadow: "1px 2px 3px #ccc",
                  display: "flex",
                  justifyContent:"center",
                  backgroundColor:"#84C7AE",
                  borderRadius:"5px",
                  padding: "1em .5em",
                  color:"#021F59",
                  fontWeight:"Bold"
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
                <span style={{ marginLeft: "10px" }}>{option.name}</span>
                  {option.icon }{" "}
                  
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
   
  );
}
