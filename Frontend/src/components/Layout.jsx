import { Box, Typography } from "@mui/material";
import UsePageTitle from "./UseLocation";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { HamburgerMenu } from "../components/HamburguerMenu";

export default function Layout() {
  const title = UsePageTitle();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box>
      <Box
        className="bg-primario"
        sx={{
          textAlign: "center",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          margin: "0 auto",
          paddingTop: "1em",
          paddingBottom: "1em",
        }}
      >
        <Box>
          <Typography
            sx={{ typography: { xs: "h6", sm: "h5" } }}
            variant="h6"
            color="white"
            paddingLeft="1em"
          >
            {title}
          </Typography>
        </Box>

        <Box>
          {" "}
          <HamburgerMenu />{" "}
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
}
