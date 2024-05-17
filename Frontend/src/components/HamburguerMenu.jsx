import { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuOptionsList  } from "../components/MenuOptionsList"
import { Link } from 'react-router-dom';


 export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
      <Box sx={{backgroundColor:"#84C7AE"}}>  
        {MenuOptionsList.map((option, index) => (
          <ListItem  key={index} component={Link} to={option.path}>
            <ListItemIcon >{option.icon}</ListItemIcon>
            <ListItemText primary={option.name}  />
          </ListItem>
        ))}
        </Box>
      </List>
    </div>
  );

  return (
   <> 
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor='left'
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
      </>
  );
}


