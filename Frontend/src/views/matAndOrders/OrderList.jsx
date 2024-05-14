import  { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { deleteOrder } from "../../api/deleteOrder";
import { getAllOrders } from "../../api/getAllOrders";
import SimpleSnackbar from '../../components/SnackBar';  
import AlertDialog from '../../components/AlertDialog';
import IconColorsOrder from '../../components/IconColorsOrder'; 


function OrderList() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
      setSnackbarMessage('Error al cargar los pedidos');
      setSnackbarOpen(true);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (currentOrderId) {
      try {
        await deleteOrder(currentOrderId);
        setOrders(prevOrders => prevOrders.filter(order => order.orderId !== currentOrderId));
        setSnackbarMessage('Pedido eliminado con éxito');
      } catch (error) {
        console.error('Error al eliminar el pedido:', error);
        setSnackbarMessage('Error al eliminar el pedido');
      }
      setSnackbarOpen(true);
      closeAlertDialog();
    }
  };

  const openAlertDialog = (orderId) => {
    setCurrentOrderId(orderId);
    setAlertDialogOpen(true);
  };

  const closeAlertDialog = () => {
    setAlertDialogOpen(false);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <p>Cargando datos de contacto...</p>;

  return (
    <div>
      {orders.map((order) => (
        <> 
        <Typography variant="h6">{order.date}</Typography>
        <Box key={order.orderId} sx={{ margin: 2, border: '1px solid gray', padding: 2 }}>
        <IconColorsOrder status={orders.status}/>
          <Typography variant="body">{order.productName}</Typography>
          <Button variant="contained" color="error" onClick={() => openAlertDialog(order.orderId)}>
            Eliminar
          </Button>
        </Box>
        </>
      ))}
      <SimpleSnackbar open={snackbarOpen} message={snackbarMessage} handleClose={closeSnackbar} />
      <AlertDialog
        open={alertDialogOpen}
        onClose={closeAlertDialog}
        onConfirm={handleDelete}
        title="Confirmar Eliminación"
        content="¿Estás seguro de que deseas eliminar este pedido? Esta acción es irreversible."
      />
    </div>
  );
}

export default OrderList;
