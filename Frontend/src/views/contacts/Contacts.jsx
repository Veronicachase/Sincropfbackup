import { Box, Typography, IconButton, Collapse, List, ListItem, ListItemText } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getAllContacts } from '../../api/getAllContacts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contacts() {
  const [open, setOpen] = useState({});
  const { data } = getAllContacts();
  const navigate = useNavigate();

  const toggleCollapse = (categoryName) => {
    setOpen(prev => ({ ...prev, [categoryName]: !prev[categoryName] }));
  };

  return (
    <Box>
      {data.map((category) => (
        <Box key={category.category} sx={{ marginBottom: 2 }}>
          <IconButton onClick={() => toggleCollapse(category.category)} sx={{ width: '100%', justifyContent: 'space-between' }}>
            <Typography variant="h6">{category.category}</Typography>
            {open[category.category] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconButton>
          <Collapse in={open[category.category]} timeout="auto" unmountOnExit>
            <List>
              {category.items.map((contact) => (
                <ListItem key={contact.contactId} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary={contact.contactName} />
                  <IconButton onClick={() => navigate(`/contact-details/${contact.contactId}`)}>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
}
