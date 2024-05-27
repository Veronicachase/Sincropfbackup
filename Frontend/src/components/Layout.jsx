
import { Box, Typography } from "@mui/material";
import UsePageTitle from "../components/UseLocation";
import { Outlet, useNavigate, useLocation, matchPath } from "react-router-dom"; 
import { HamburgerMenu } from "../components/HamburguerMenu";

export default function Layout() {
  const title = UsePageTitle();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const pagesWithoutHamburgerMenu = [
    "/my-projects",
    "/project-info/:projectId",
    "/project-create-task/:projectId/:sectionKey",
    "/edit-task/:taskId",
    "/pendings",
    "/allContacts",
    "/order-list",
    "/staff-list",
    "/reports"
  ];

  const showHamburgerMenu = !pagesWithoutHamburgerMenu.some(path => matchPath({ path, end: false }, location.pathname));

  return (
    <Box>
      <Box
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
          <Typography
            sx={{ typography: { xs: "h6", sm: "h5" } }}
            variant="h6"
            color="#98A1B4"
            paddingLeft="1em"
          >
            {title}
          </Typography>
          
          <Box>
            {showHamburgerMenu ? <HamburgerMenu /> : null}
          </Box>


        </Box>
      <Box sx={{ borderBottom: "1px solid #ccc", marginBottom: "2em" }}></Box>
      <Outlet />
    </Box>
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
