import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { MenuOptionsList } from "../../components/MenuOptionsList";

export default function HomeOptions() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f6fbf9",
        padding: "2em",
      }}
    >
      <Box
        sx={{
          width: "70%",
          margin: "auto",
          marginBottom: "5em",
        }}
      >
        <Grid container spacing={5} justifyContent={"space-between"} marginTop={"3em"}>
          {MenuOptionsList.map((option, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  width: "100%",
                  height: "8em",
                  boxShadow: "1px 2px 3px #ccc",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#ffffff4d",
                  borderRadius: "10px",
                  padding: "2em .2em",
                  color: "#021F59",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "3px 6px 10px #ccc",
                  },
                }}
              >
                <Link
                  to={option.path}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h5">{option.name}</Typography>
                  {option.icon}
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
