
import { Box, Typography, IconButton, Collapse, List, ListItem, ListItemText } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllContacts } from '../../api/getAllContacts';

export default function Contacts() {
  const [open, setOpen] = useState({});
  const [data, setData] = useState([]);  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const fetchedContacts = await getAllContacts();
        const allContacts = await fetchedContacts.json();  
        setData(allContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();  
  }, []);

  const toggleCollapse = (categoryName) => {
    setOpen(prev => ({ ...prev, [categoryName]: !prev[categoryName] }));
  };

  return (
    <Box>
      {data.map((contactCategory) => (
        <Box key={contactCategory.category} sx={{ marginBottom: 2 }}>
          <IconButton onClick={() => toggleCollapse(contactCategory.category)} sx={{ width: '100%', justifyContent: 'space-between' }}>
            <Typography variant="h6">{contactCategory.category}</Typography>
            {open[contactCategory.category] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconButton>
          <Collapse in={open[contactCategory.category]} timeout="auto" unmountOnExit>
            <List>
              {contactCategory.items.map((contactItem) => (  
                <ListItem key={contactItem.contactId} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary={contactItem.contactName} />
                  <IconButton onClick={() => navigate(`/contact-details/${contactItem.contactId}`)}>
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
