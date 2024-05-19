

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

function OrderDetailsModal({ open, onClose, order }) {
  if (!order) return null; 

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detalles del Producto</DialogTitle>
      <DialogContent>
        <Box sx={{borderBottom:" 1px solid #f0efef", marginBottom:"1em"}} > 
        <Typography variant="body1"><strong>ID del Pedido:</strong> {order.orderId}</Typography>
        </Box>
        <Box sx={{borderBottom:" 1px solid #f0efef", marginBottom:"1em"}}> 
        <Typography variant="body1"><strong>Producto:</strong> {order.productName}</Typography>
        </Box>
        <Box sx={{borderBottom:" 1px solid #f0efef", marginBottom:"1em"}}> 
        <Typography variant="body1"><strong>Cantidad:</strong> {order.amount}</Typography>
        </Box>
        <Box sx={{borderBottom:" 1px solid #f0efef", marginBottom:"1em"}}> 
        <Typography variant="body1"><strong>Cantidad:</strong> {order.brand}</Typography>
        </Box>
        <Box sx={{borderBottom:" 1px solid #f0efef", marginBottom:"1em"}}> 
        <Typography variant="body1"><strong>Fecha:</strong> {order.date}</Typography>
        </Box>
        <Box sx={{borderBottom:" 1px solid #f0efef", marginBottom:"1em"}}> 
        <Typography variant="body1"><strong>Estado:</strong> {order.status}</Typography>
        </Box>
        <Box sx={{borderBottom:" 1px solid #f0efef", marginBottom:"1em"}}> 
        <Typography variant="body1"><strong>Descripción:</strong> {order.details}</Typography>
        </Box>
        
        <Box sx={{width:"100px", height:"100px"}}>
        <Typography variant="body1"><strong>Imagen:</strong> </Typography>
        <Box>{order.image} </Box>
        </Box>
        
        
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderDetailsModal;
