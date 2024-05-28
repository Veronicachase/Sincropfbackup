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
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <HamburgerMenu />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </>
  );
}








// import { Box, Typography } from "@mui/material";
// import UsePageTitle from "./UseLocation";
// import { Outlet } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { HamburgerMenu } from "./HamburguerMenu"
// import { useNavigate, useLocation, matchPath } from "react-router-dom";

// export default function Layout() {
//   const title = UsePageTitle();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleNavigate = (path) => {
//     navigate(path);
//   };
//   const showHamburgerMenu = !pagesWithoutHamburgerMenu.some(path => matchPath({ path, end: false }, location.pathname));
//   const pagesWithoutHamburgerMenu = [
//     "/my-projects",
//     "/project-info/:projectId",
//     "/project-create-task/:projectId/:sectionKey",
//     "/edit-task/:taskId",
//     "/pendings",
//     "/allContacts",
//     "/order-list",
//     "/staff-list",
//     "/reports"
//   ];

//   return (
//     <Box>
//       <Box
        
//         sx={{
//           textAlign: "center",
//           width: "100%",
//           display: "flex",
//           justifyContent: "space-between",
//           margin: "0 auto",
//           paddingTop: "1em",
//           paddingBottom: "1em",
        
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
//           <Typography
//             sx={{ typography: { xs: "h6", sm: "h5" } }}
//             variant="h6"
//             color="#98A1B4"
//             paddingLeft="1em"
//           >
//             {title}
//           </Typography>
//           <Box>
          
//           {showHamburgerMenu ? <HamburgerMenu /> : null}
          
          
//           </Box>
         
//         </Box>

        
//       </Box>
//       <Box sx={{borderBottom:"1px solid #ccc", marginBottom:"2em"}}  > </Box>
//       <Outlet />
//     </Box>
//   );
// }
