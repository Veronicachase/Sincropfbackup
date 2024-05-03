
import Button from '@mui/material/Button';


function MyButton({ onClick, children, buttonType = 'submit', disabled = false }) {
  return (
    <Button 
      onClick={onClick} 
      type={buttonType} 
      disabled={disabled} 
      sx={{
        display: "flex",
        width:"224px",
        height:"52px",
        margin: "1em auto",
        borderRadius: "49px",
        backgroundColor: "#84C7AE", 
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