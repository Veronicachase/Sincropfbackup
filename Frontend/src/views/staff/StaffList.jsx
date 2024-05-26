// Lista de todos los trabajadores por categoría.

import { useState, useEffect } from "react";
import { getEmployees } from "../../api/getEmployees";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
    <>
     
      <Box marginBottom={5}>
        <Button
          variant="outlined"
          sx={{ border: "1px solid #fff" }}
          onClick={() =>
            navigate("/create-employee")
          }
        >
          <Typography variant="body" color={"#000"} paddingRight={1}>
            Agregar trabajador
          </Typography>
          <AddCircleIcon sx={{ color: "#fff" }} />
        </Button>
      </Box>

      <Box display={"flex"} backgroundColor={"#EDF5F4"} >
        <Box>
          {" "}
          <SideMenu />
        </Box>

        <Box width={"60%"} >
          <FormControl fullWidth>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                marginTop: "3em",
                marginBottom: "2em",
              
              }}
            >
              <FilterAltIcon />
              <Select 
                paddingTop={"2em"}
                labelId="filter-select-label"
                id="filter-select"
                value={selectedFilter}
                displayEmpty
                onChange={handleChange}
                sx={{ minWidth: 100 }}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography color="textSecondary">
                        Filtrar por:
                      </Typography>
                    );
                  }
                  return selectedFilter === "name"
                    ? "Nombre"
                    : selectedFilter === "position"
                    ? "Posición"
                    : selectedFilter === "project"
                    ? "Obra"
                    : "Filtrar por:";
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
          <Typography variant="h6" sx={{ marginTop: "1em" }}>
            Resultados:
          </Typography>
          <ul style={{ padding: 0, backgroundColor:"#fff", borderRadius:"5px" }}>
            {filteredEmployees.map((employee) => (
              <li
                key={employee.employeeId}
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  marginBottom: "2em",
                  borderBottom: "1px solid #E9E5E5",
                }}
                onClick={() => handleEmployeeClick(employee.employeeId)}
              >
                {selectedFilter === "name" && (
                  <Typography>{employee.name}</Typography>
                )}
                {selectedFilter === "position" && (
                  <Box >
                    <Typography>
                      <strong>{employee.position}</strong> - {employee.name}
                    </Typography>
                  </Box>
                )}
                {selectedFilter === "project" && (
                  <Box>
                    <Typography>
                      <strong>{employee.project}</strong> - {employee.name} (
                      {employee.position})
                    </Typography>
                  </Box>
                )}
                {!selectedFilter && (
                  <Typography>
                    {employee.name} - {employee.position} (
                    {employee.projectName})
                  </Typography>
                )}
              </li>
            ))}
          </ul>
        </Box>
      </Box>
      
    </>
  );
}
