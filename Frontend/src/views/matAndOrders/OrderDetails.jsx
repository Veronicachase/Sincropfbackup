import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button, Typography, TextField, Snackbar, Alert } from '@mui/material';
import { getAllOrdersByProjectId } from "../../api/getAllOrdersByIdProjectId";
import { updateOrder } from "../../api/updateOrder"
import  { deleteOrder } from "../../api/deleteOrder"

import { jsPDF } from "jspdf";

export default function OrderDetail({ projectId }) {
    const [project, setProject] = useState({ projectName: '', address: '', orderNumber: '' });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const { data } = await getAllOrdersByProjectId(projectId);
                setProject(prev => ({ ...prev, orderNumber: `P-${Date.now()}` }));
                setOrders(data);
                setLoading(false);
            } catch (error) {
                setError(error.toString());
                setLoading(false);
            }
        };

        if (projectId) {
            fetchOrders();
        }
    }, [projectId]);

    const handleButtonStatusChange = async (order, newStatus) => {
        await updateOrder(order.orderId, { status: newStatus });
        setOrders(currentOrders =>
            currentOrders.map(o => o.orderId === order.orderId ? { ...o, status: newStatus } : o)
        );
    };

    const handleDelete = async (orderId) => {
        try {
            await deleteOrder(orderId);
            setOrders(prevOrders => prevOrders.filter(order => order.orderId !== orderId));
            setSnackbarMessage('Pedido eliminado con éxito');
        } catch (error) {
            console.error('Error al eliminar el pedido:', error);
            setSnackbarMessage('Error al eliminar el pedido');
        }
        setSnackbarOpen(true);
    };

    const handleCreatePDF = () => {
        const doc = new jsPDF();

        doc.text(`Empresa: Marvel Construcciones`, 10, 10);
        doc.text(`Número de pedido: ${project.orderNumber}`, 10, 20);
        orders.forEach((order, index) => {
            let position = 30 + (index * 10);
            doc.text(`Producto: ${order.productName}, Cantidad: ${order.amount}, Detalle: ${order.details}`, 10, position);
        });

        doc.save('pedido.pdf');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Formik initialValues={{}}>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Box>
                    <TextField label="Project Name" value={project.projectName} variant="outlined" fullWidth margin="normal" />
                    <TextField label="Address" value={project.address} variant="outlined" fullWidth margin="normal" />
                    <TextField label="Order Number" value={project.orderNumber} variant="outlined" fullWidth margin="normal" />
                    {orders.map(order => (
                        <Box key={order.orderId} sx={{ my: 2 }}>
                            <Typography>Order ID: {order.orderId}, Project ID: {order.projectId}</Typography>
                            <TextField label="Date" value={order.date} variant="outlined" fullWidth margin="normal" />
                            <TextField label="Product Name" value={order.productName} variant="outlined" fullWidth margin="normal" />
                            <TextField label="Amount" value={order.amount} variant="outlined" fullWidth margin="normal" />
                            <TextField label="Details" value={order.details} variant="outlined" fullWidth margin="normal" />
                            <Box sx={{ mt: 1 }}>
                                <Button onClick={() => handleButtonStatusChange(order, 'pendiente')}>Pendiente</Button>
                                <Button onClick={() => handleButtonStatusChange(order, 'recibido')}>Recibido</Button>
                                <Button onClick={() => handleDelete(order.orderId)}>Eliminar</Button>
                                <Button onClick={() => console.log('Showing image')}>Ver Imagen</Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Button type="submit" onClick={() => handleCreatePDF()}>Crear PDF</Button>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                    <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Form>
        </Formik>
    );
}
