//Lista de todos los trabajadores por categoría.

import { useState, useEffect } from "react";
import { getEmployees } from "../../api/employeeApis/getEmployees";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  List,
  ListItem,
  ListItemText,
  InputLabel,
  IconButton,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
      <Box
        marginBottom={5}
        display="flex"
        justifyContent="center"
        marginTop="3em"
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            borderRadius: "10px",
            ":hover": {
              backgroundColor: "#1565c0",
              transform: "scale(1.02)",
            },
          }}
          onClick={() => navigate("/create-employee")}
        >
          <Typography variant="body" color="#fff" paddingRight={1}>
            Agregar trabajador
          </Typography>
          <AddCircleIcon />
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" width="100%">
        <Box
          width="80%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <FormControl fullWidth sx={{ marginBottom: "2em" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                marginTop: "2em",
                marginBottom: "2em",
                backgroundColor: "#fff",
                padding: "0.5em 1em",
                borderRadius: "10px",
                boxShadow: 1,
              }}
            >
              <FilterAltIcon sx={{ color: "#1976d2" }} />
              <InputLabel sx={{ marginRight: "1em" }}>Filtrar por:</InputLabel>
              <Select
                labelId="filter-select-label"
                id="filter-select"
                value={selectedFilter}
                displayEmpty
                onChange={handleChange}
                sx={{
                  minWidth: 150,
                  borderRadius: "10px",
                  backgroundColor: "#f9f9f9",
                }}
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

          <Typography variant="h6" sx={{ marginBottom: "1em" }}>
            Resultados:
          </Typography>
          <List
            sx={{
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: 1,
            }}
          >
            {filteredEmployees
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((employee) => (
                <ListItem
                  key={employee.employeeId}
                  sx={{
                    cursor: "pointer",
                    marginBottom: "1em",
                    borderBottom: "1px solid #E9E5E5",
                    transition: "background-color 0.3s, transform 0.3s",
                    ":hover": {
                      backgroundColor: "#f0f0f0",
                      transform: "scale(1.01)",
                    },
                  }}
                  onClick={() => handleEmployeeClick(employee.employeeId)}
                >
                  <ListItemText
                    primary={
                      selectedFilter === "name"
                        ? employee.name
                        : selectedFilter === "position"
                        ? `${employee.position} - ${employee.name}`
                        : selectedFilter === "project"
                        ? `${employee.project} - ${employee.name} (${employee.position})`
                        : `${employee.name} - ${employee.position} (${employee.projectName})`
                    }
                  />
                  <IconButton
                    edge="end"
                    aria-label="details"
                    onClick={() => handleEmployeeClick(employee.employeeId)}
                  >
                    <VisibilityIcon sx={{ color: "#1976d2" }} />
                  </IconButton>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </>
  );
}
