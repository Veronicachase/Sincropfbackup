

import { useState, useEffect } from 'react';
import { getEmployees } from "../../api/getEmployees";
import { Box, Typography, Select, MenuItem, FormControl } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const fetchedEmployees = await getEmployees();
        setEmployees(fetchedEmployees);
        setFilteredEmployees(fetchedEmployees);
      } catch (error) {
        console.log("Failed to fetch employees", error);
        setEmployees([]);
        setFilteredEmployees([]);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  
  };


  const handleEmployeeClick = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: "3em", marginBottom: "2em" }}>
          <FilterAltIcon />
          <Select
            labelId="filter-select-label"
            id="filter-select"
            value={selectedFilter}
            displayEmpty
            onChange={handleChange}
            sx={{ minWidth: 100 }}
            renderValue={(selected) => {
              if (!selected) {
                return <Typography color="textSecondary">Filtrar por:</Typography>;
              }
              return selectedFilter === "name" ? "Nombre" :
                selectedFilter === "position" ? "Posición" :
                  selectedFilter === "project" ? "Obra" : "Filtrar por:";
            }}
          >
            <MenuItem value="" disabled>
              Filtrar por:
            </MenuItem>
            <MenuItem value="name">Nombre</MenuItem>
            <MenuItem value="position">Posición</MenuItem>
            <MenuItem value="project">Obra</MenuItem>
          </Select>
        </Box>
      </FormControl>
      <Typography variant="h6" sx={{ marginTop: '1em' }}>Resultados:</Typography>
      <ul style={{ padding: 0 }}>
        {filteredEmployees.map((employee) => (
          <li
            key={employee.employeeId}
            style={{ listStyle: "none", cursor: 'pointer', marginBottom: '2em', borderBottom: "1px solid #E9E5E5" }}
            onClick={() => handleEmployeeClick(employee.employeeId)} 
          >
            {selectedFilter === "name" && <Typography>{employee.name}</Typography>}
            {selectedFilter === "position" && (
              <Box>
                <Typography><strong>{employee.position}</strong> - {employee.name}</Typography>
              </Box>
            )}
            {selectedFilter === "project" && (
              <Box>
                <Typography><strong>{employee.project}</strong> - {employee.name} ({employee.position})</Typography>
              </Box>
            )}
            {!selectedFilter && <Typography>{employee.name} - {employee.position} ({employee.projectName})</Typography>}
          </li>
        ))}
      </ul>
    </Box>
  );
}

















// import { useState, useEffect } from 'react';
// import { getEmployees } from "../../api/getEmployees";
// import { Box, Typography, Select, MenuItem, FormControl } from "@mui/material";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import { useNavigate } from "react-router-dom";

// export default function EmployeeList() {
//   const [employees, setEmployees] = useState([]);
//   const [selectedFilter, setSelectedFilter] = useState("");
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const fetchedEmployees = await getEmployees();
//         setEmployees(fetchedEmployees);
//         setFilteredEmployees(fetchedEmployees); 
//       } catch (error) {
//         console.log("Failed to fetch employees", error);
//         setEmployees([]);
//         setFilteredEmployees([]);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   const handleChange = (event) => {
//     setSelectedFilter(event.target.value);
//     applyFilter(event.target.value);
//   };

//   const applyFilter = (filter) => {
//     switch (filter) {
//       case "name":
//         setFilteredEmployees([...employees].sort((a, b) => a.name.localeCompare(b.name)));
//         break;
//       case "position":
//         setFilteredEmployees([...employees].sort((a, b) => a.position.localeCompare(b.position)));
//         break;
//       case "project":
        
//         setFilteredEmployees([...employees].sort((a, b) => a.project.localeCompare(b.project)));
//         break;
//       default:
//         setFilteredEmployees(employees);
//         break;
//     }
//   };

//   const handleEmployeeClick = (employeeId) => {
//     navigate(`/employee/${employeeId}`);
//   };

//   return (
//     <Box>
//     <FormControl fullWidth>
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: "3em", marginBottom:"2em" }}>
//       <FilterAltIcon />
//       <Select
//         labelId="filter-select-label"
//         id="filter-select"
//         value={selectedFilter}
//         displayEmpty
//         onChange={handleChange}
//         sx={{ minWidth: 100 }}
//         renderValue={(selected) => {
//           if (!selected) {
//             return <Typography color="textSecondary">Filtrar por:</Typography>;
//           }
//           return selectedFilter === "name" ? "Nombre" :
//                  selectedFilter === "position" ? "Posición" :
//                  selectedFilter === "project" ? "Obra" : "Filtrar por:";
//         }}
//       >
//         <MenuItem value="" disabled>
//           Filtrar por:
//         </MenuItem>
//         <MenuItem value="name">Nombre</MenuItem>
//         <MenuItem value="position">Posición</MenuItem>
//         <MenuItem value="project">Obra</MenuItem>
//       </Select>
//     </Box>
//       </FormControl>
//       <Typography variant="h6" sx={{ marginTop: '1em' }}>Resultados:</Typography>
//       <ul style={{ padding: 0 }}>
//         {filteredEmployees.map((employee) => (
//           <li
//             key={employee.employeeId}
//             style={{ listStyle: "none", cursor: 'pointer', marginBottom: '2em', borderBottom:"1px solid #E9E5E5" }}
//             onClick={() => handleEmployeeClick(employee.employeedId)}
//           >
//             {selectedFilter === "name" && <Typography>{employee.name}</Typography>}
//             {selectedFilter === "position" && (
//               <Box>
            
//                 <Typography><strong>{employee.position}</strong> - {employee.name}</Typography>
//               </Box>
//             )}
//             {selectedFilter === "project" && (
//               <Box>
//                 <Typography><strong>{employee.project}</strong> - {employee.name} ({employee.position})</Typography>
//               </Box>
//             )}
//             {!selectedFilter && <Typography>{employee.name} - {employee.position} ({employee.project})</Typography>}
//           </li>
//         ))}
//       </ul>
//     </Box>
//   );
// }






























// import { useState, useEffect } from 'react';
// import  { getEmployees }  from "../../api/getEmployees";
// import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import { useNavigate} from "react-router-dom"

// /* Aquí va la lista de todos los trabajadores con un filtro para escoger por nombre, posición o por tarea */
// // aquí falta arreglar el filtro que quedó muy arriba
// // crear un navigate para que cuando clique en un nombre me lleve a la página del trabajador


// export default function EmployeeList() {
//   const [employees, setEmployees] = useState([]);
//   const [selectedFilter, setSelectedFilter] = useState("");
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const navigate = useNavigate()
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const fetchedEmployees = await getEmployees();
//         setEmployees(fetchedEmployees);
//       } catch (error) {
//         console.log("Failed to fetch employees", error);
//         setEmployees([]);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   const handleChange = (event) => {
//     setSelectedFilter(event.target.value);
//     applyFilter(event.target.value);
//   };

//   const applyFilter = (filter) => {
//     switch (filter) {
//       case "name":
//         setFilteredEmployees([...employees].sort((a, b) => a.name.localeCompare(b.name)));
//         break;
//       case "position":
//         setFilteredEmployees([...employees].sort((a, b) => a.position.localeCompare(b.position)));
//         break;
//       case "project":
//         setFilteredEmployees([...employees].sort((a, b) => a.projectName.localeCompare(b.projectName)));
//         break;
//       default:
//         setFilteredEmployees(employees);
//         break;
//     }
//   };

//   return (
//     <FormControl fullWidth>
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         <FilterAltIcon />
//       </Box>
//       <InputLabel id="filter-select-label">Filtrar por</InputLabel>
//       <Select
//         labelId="filter-select-label"
//         id="filter-select"
//         value={selectedFilter}
//         label="Criterio"
//         onChange={handleChange}
//       >
//         <MenuItem value="name">Nombre</MenuItem>
//         <MenuItem value="position">Posición</MenuItem>
//         <MenuItem value="project">Obra</MenuItem>
//       </Select>
//       <Typography variant="h6">Resultados:</Typography>
//       if(selectedFilter===name){
//         <Typography> Posición</Typography>
//         <ul>
//         {filteredEmployees.map((employee) => (
//           <li key={employee.id} style={{listStyle:"none"}}>
//             {employee.name} 
//           </li>
        
//         ))}
//       </ul>
//       }

//       if(selectedFilter===position){
//         <Typography> Posición</Typography>
//         <ul>
//         {filteredEmployees.map((employee) => (
//           <Typography><strong>{employee.position} </Typography>
//           <li key={employee.id} style={{listStyle:"none"}}>
//          <strong>{employee.position}  </strong>  {employee.name} 
//           </li>
        
//         ))}
//       </ul>
//       }

//       if(selectedFilter===project){
//         <Box> 
//         <Typography> Proyecto </Typography>
//         <ul>
//         {filteredEmployees.map((employee) => (
//           <Box> 
//           <Typography><strong>{employee.projectName} </Typography>
//           <li key={employee.id} style={{listStyle:"none"}}>
//           <strong>{employee.projectName} {employee.name}   {employee.position}  
//           </li>
          
//         ))}
//         </Box>
//       </ul>
//       </Box>
//       }
    
     
//     </FormControl>
//   );
// }
