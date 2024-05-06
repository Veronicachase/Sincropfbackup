import { useState, useEffect } from 'react';
import  getEmployees  from "../../api/getEmployees";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useNavigate} from "react-router-dom"

// aquí falta arreglar el filtro que quedó muy arriba
// crear un navigate para que cuando clique en un nombre me lleve a la página del trabajador


export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const fetchedEmployees = await getEmployees();
        setEmployees(fetchedEmployees);
      } catch (error) {
        console.log("Failed to fetch employees", error);
        setEmployees([]);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
    applyFilter(event.target.value);
  };

  const applyFilter = (filter) => {
    switch (filter) {
      case "name":
        setFilteredEmployees([...employees].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "position":
        setFilteredEmployees([...employees].sort((a, b) => a.position.localeCompare(b.position)));
        break;
      case "project":
        setFilteredEmployees([...employees].sort((a, b) => a.projectName.localeCompare(b.projectName)));
        break;
      default:
        setFilteredEmployees(employees);
        break;
    }
  };

  return (
    <FormControl fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FilterAltIcon />
      </Box>
      <InputLabel id="filter-select-label">Filtrar por</InputLabel>
      <Select
        labelId="filter-select-label"
        id="filter-select"
        value={selectedFilter}
        label="Criterio"
        onChange={handleChange}
      >
        <MenuItem value="name">Nombre</MenuItem>
        <MenuItem value="position">Posición</MenuItem>
        <MenuItem value="project">Obra</MenuItem>
      </Select>
      <Typography variant="h6">Resultados:</Typography>
      <ul>
        {filteredEmployees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.position} - {employee.projectName}
          </li>
        
        ))}
      </ul>
    </FormControl>
  );
}
