import {
  Box,
  Typography,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllContacts } from "../../api/getAllContacts";
import SideMenu from "../../components/SideMenu";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Contacts() {
  const [open, setOpen] = useState({});
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        console.log("Llamando a getAllContacts desde el frontend");
        const allContacts = await getAllContacts();
        console.log("Contactos cargados correctamente:", allContacts);

        // aquí los agrupo por categoría para que pueda desplagarlos por cada una
        const groupedContacts = allContacts.reduce((acc, contact) => {
          const category = contact.category;
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
    setOpen((prev) => ({ ...prev, [categoryName]: !prev[categoryName] }));
  };

  if (!data || Object.keys(data).length === 0) {
    return <Typography>No hay contactos disponibles</Typography>;
  }

  return (
<>  
<Box marginBottom={5}  >
<Button variant="outlined" sx={{border:"1px solid #fff"}} onClick={() => navigate(`/create-contact`)} > 
<Typography variant="body" color={"#000"} paddingRight={1} >Agregar contacto</Typography>
<AddCircleIcon sx={{color:"#fff"}} />
</Button>
 </Box>  



    <Box display={"flex"} backgroundColor={"#EDF5F4"}>
      <Box>
        {" "}
        <SideMenu />{" "}
      </Box>

      <Box sx={{ width: "100%"}}>
        {Object.keys(data).map((category) => (
          <Box
            key={category}
            sx={{ marginBottom: 2, width: "80%", backgroundColor:"#fff", border: " 1px solid #fff", borderRadius:"10px", marginTop:"1em" }}
          >
            <IconButton
              onClick={() => toggleCollapse(category)}
              sx={{ width: "100%", justifyContent: "space-between" }}
            >
              <Typography variant="h6">{category}</Typography>
              {open[category] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
            <Collapse in={open[category]} timeout="auto" unmountOnExit>
              <List>
                {data[category].map((contactItem) => (
                  <ListItem
                    key={contactItem.contactId}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <ListItemText primary={contactItem.contactName}  />
                    <IconButton
                      onClick={() =>
                        navigate(`/contact-details/${contactItem.contactId}`)
                      }
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </Box>
    </Box>
    </>
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
