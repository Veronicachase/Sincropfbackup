
import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PropTypes from "prop-types";
import { useState } from "react";

export function AddButton({ buttonText, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        sx={{
          display: "flex",
          alignSelf: "flex-end",
          color: "#021F59",
          border: "1px solid #1975D2",
          marginBottom: "1em",
          borderRadius: "5px",
          alignItems: "center",
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        <Typography sx={{ paddingLeft: ".6em" }}>
          {isHovered && buttonText === "" ? "Agregar Sección" : buttonText}
        </Typography>
        <AddCircleIcon sx={{ color: "#1976D2", fontSize: "35px", paddingLeft: ".6em" }} />
      </Button>
    </Box>
  );
}

AddButton.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

