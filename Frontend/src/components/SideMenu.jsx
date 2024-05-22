import { useState } from "react";
import { MenuOptionsList } from "./MenuOptionsList";
import { Box, ListItem, ListItemIcon, ListItemText, List, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box display="flex">
      <Box
        sx={{
          width: collapsed ? 80 : 240,
          transition: "width 0.3s",
          overflow: "hidden",
          whiteSpace: "nowrap",
          backgroundColor: "#ffffff4d",
          height: "100vh",
        }}
      >
        <IconButton onClick={toggleCollapse}>
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
        <List>
          {MenuOptionsList.map((option, index) => (
            <ListItem component={Link} to={option.path} key={index}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={option.name} />}
            </ListItem>
          ))}
        </List>
      </Box>
      <Box  p={2}>
       
      </Box>
    </Box>
  );
}
