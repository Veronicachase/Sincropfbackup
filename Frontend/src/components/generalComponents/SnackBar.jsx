
import Snackbar from '@mui/material/Snackbar';

function SimpleSnackbar({ open, message, handleClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
    />
  );
}

export default SimpleSnackbar;
