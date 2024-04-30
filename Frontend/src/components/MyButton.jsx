
import Button from '@mui/material/Button';


function MyButton({ onClick, children, buttonType = 'submit', disabled = false }) {
  return (
    <Button 
      onClick={onClick} 
      type={buttonType} 
      disabled={disabled} 
      sx={{
        display: "flex",
        margin: "1em auto",
        borderRadius: "10px",
        backgroundColor: "#021f59", 
        color:"#ffffff",
        padding:".5em 1em",
        "&:hover": {
        backgroundColor: "#B3E0FD",
       
        }
      }}
    >
      {children}
    </Button>
  );
}

export default MyButton;