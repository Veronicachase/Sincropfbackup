

import { Box, Typography, IconButton, Collapse, List, ListItem, ListItemText } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllContacts } from '../../api/getAllContacts';

export default function Contacts() {
  const [open, setOpen] = useState({});
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        console.log("Llamando a getAllContacts desde el frontend");
        const allContacts = await getAllContacts();
        console.log("Contactos obtenidos:", allContacts);

        // Agrupar contactos por categoría
        const groupedContacts = allContacts.reduce((acc, contact) => {
          const category = contact.category.trim();
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(contact);
          return acc;
        }, {});

        setData(groupedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const toggleCollapse = (categoryName) => {
    setOpen(prev => ({ ...prev, [categoryName]: !prev[categoryName] }));
  };

  if (!data || Object.keys(data).length === 0) {
    return <Typography>No hay contactos disponibles</Typography>;
  }

  return (
    <Box>
      {Object.keys(data).map((category) => (
        <Box key={category} sx={{ marginBottom: 2 }}>
          <IconButton onClick={() => toggleCollapse(category)} sx={{ width: '100%', justifyContent: 'space-between' }}>
            <Typography variant="h6">{category}</Typography>
            {open[category] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconButton>
          <Collapse in={open[category]} timeout="auto" unmountOnExit>
            <List>
              {data[category].map((contactItem) => (
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





















// import { Box, Typography, IconButton, Collapse, List, ListItem, ListItemText } from '@mui/material';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAllContacts } from '../../api/getAllContacts';

// export default function Contacts() {
//   const [open, setOpen] = useState({});
//   const [data, setData] = useState([]);  
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const allContacts = await getAllContacts(); 
//         setData(allContacts);
//       } catch (error) {
//         console.error("Error fetching contacts:", error);
//       }
//     };

//     fetchContacts();
//   }, []);

//   const toggleCollapse = (categoryName) => {
//     setOpen(prev => ({ ...prev, [categoryName]: !prev[categoryName] }));
//   };

//   return (
//     <Box>
//       {data.map((contactCategory) => (
//         <Box key={contactCategory.category} sx={{ marginBottom: 2 }}>
//           <IconButton onClick={() => toggleCollapse(contactCategory.category)} sx={{ width: '100%', justifyContent: 'space-between' }}>
//             <Typography variant="h6">{contactCategory.category}</Typography>
//             {open[contactCategory.category] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
//           </IconButton>
//           <Collapse in={open[contactCategory.category]} timeout="auto" unmountOnExit>
//             <List>
//               {contactCategory.items.map((contactItem) => (  
//                 <ListItem key={contactItem.contactId} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <ListItemText primary={contactItem.contactName} />
//                   <IconButton onClick={() => navigate(`/contact-details/${contactItem.contactId}`)}>
//                     <ArrowForwardIosIcon />
//                   </IconButton>
//                 </ListItem>
//               ))}
//             </List>
//           </Collapse>
//         </Box>
//       ))}
//     </Box>
//   );
// }
