import { Box, Typography } from "@mui/material";
import UsePageTitle from "../components/UseLocation";
import { Outlet, useNavigate, useLocation, matchPath } from "react-router-dom";
import { HamburgerMenu } from "../components/HamburguerMenu";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

export default function Layout() {
  const title = UsePageTitle();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const showHamburgerMenu = (path) => matchPath({ path, end: false }, location.pathname);

  return (
    <>s
      
        <AppBar position="fixed" sx={{ backgroundColor: "#1976d2", cursor:"pointer"}}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <HamburgerMenu/>
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
    
      <Box>
        <Outlet />
      </Box>
    </>
  );
}
