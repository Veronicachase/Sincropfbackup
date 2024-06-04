
import { Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PropTypes from "prop-types";

export function AddButton({ buttonText, onClick }) {
  return (
    <Button
      sx={{
        display: "flex",
        width: "200px",
        alignSelf: "flex-end",
        color: "#021F59",
        backgroundColor: "#ffffff4d",
        padding: "1em 2em",
        marginBottom: "1em",
        borderRadius: "5px",
      }}
      onClick={onClick}
    >
      <Typography>{buttonText}</Typography>
      <AddCircleIcon sx={{ color: "#fff", fontSize: "40px", padding: ".2em" }} />
    </Button>
  );
}

AddButton.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
};
