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
          backgroundColor: "#FFF",
          height: "100vh",
          borderRight: "2px solid #fff",
          borderRadius: "5px",
        }}
      >
        <IconButton onClick={toggleCollapse}>
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
        <List>
          {MenuOptionsList.map((option, index) => (
            <ListItem
              component={Link}
              to={option.path}
              key={index}
              sx={{
                borderRadius: '5px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              {!collapsed && <ListItemText sx={{ color: "#98A1B4" }} primary={option.name} />}
            </ListItem>
          ))}
        </List>
      </Box>
      <Box p={2}>
        {/* Additional content can be placed here */}
      </Box>
    </Box>
  );
}
