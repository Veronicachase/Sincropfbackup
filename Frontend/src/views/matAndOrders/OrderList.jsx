// cambiar order de fecha, incluir selec de estados,  agregar otros estados, tipo devuelto

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Button,
  Paper,
} from "@mui/material";
import { deleteOrder } from "../../api/deleteOrder";
import { getAllOrders } from "../../api/getAllOrders";
import { getAllProjects } from "../../api/getAllProjects";
import SimpleSnackbar from "../../components/SnackBar";
import AlertDialog from "../../components/AlertDialog";
import IconColorsOrder from "../../components/IconColorsOrder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";
import OrderDetailsModal from "../../components/orderDetailModal";


function OrderList() {
  const [orders, setOrders] = useState([]);
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el modal
  const [selectedOrder, setSelectedOrder] = useState(null); // Estado para el pedido seleccionado
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjectsAndOrders();
  }, []);

  const fetchProjectsAndOrders = async () => {
    setLoading(true);
    try {
      const projectResponse = await getAllProjects();
      setProjects(projectResponse);
      const orderResponse = await getAllOrders();
      setOrders(orderResponse);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setSnackbarMessage("Error al cargar los datos");
      setSnackbarOpen(true);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (currentOrderId) {
      try {
        await deleteOrder(currentOrderId);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.orderId !== currentOrderId)
        );
        setSnackbarMessage("Pedido eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el pedido:", error);
        setSnackbarMessage("Error al eliminar el pedido");
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleToggle = (projectId) => {
    setOpen((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId],
    }));
  };

  const handleModalOpen = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  const generateMailToLink = (projectId) => {
    const projectOrders = orders.filter((order) => order.projectId === projectId);
    const subject = `Detalles de Pedidos para el Proyecto ${projectId}`;
    const body = projectOrders.map(order => `
      ID del Pedido: ${order.orderId}
      Producto: ${order.productName}
      Fecha: ${formatDate(order.date)}
      Estado: ${order.status}
      Descripción: ${order.description}
    `).join('\n\n');

    return `mailto:destinatario@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) return <p>Cargando datos de contacto...</p>;

  return (
    <Box display={"flex"} flexDirection="column" alignItems="center">
      <Box sx={{ marginTop: "2em", width: "90%" }}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Paper
              key={project.projectId}
              elevation={3}
              sx={{
                marginBottom: "2em",
                padding: "1em",
                borderRadius: "10px",
                transition: "transform 0.3s, background-color 0.3s",
                ":hover": {
                  transform: "scale(1.02)",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">
                  <strong>Proyecto:</strong> {project.projectName}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleToggle(project.projectId)}
                >
                  {open[project.projectId] ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}{" "}
                  Pedidos
                </Button>
              </Box>
              <Collapse in={open[project.projectId]}>
                <Box sx={{ marginTop: "2em" }}>
                  {orders.filter((order) => order.projectId === project.projectId).length > 0 ? (
                    orders
                      .filter((order) => order.projectId === project.projectId)
                      .map((order) => (
                        <Paper
                          key={order.orderId}
                          elevation={2}
                          sx={{
                            marginBottom: "1em",
                            padding: "1em",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderRadius: "10px",
                            transition: "transform 0.3s, background-color 0.3s",
                            ":hover": {
                              transform: "scale(1.02)",
                              backgroundColor: "#e0f7fa",
                            },
                          }}
                        >
                          <Box>
                            <Typography variant="body2">
                              {formatDate(order.date)}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              justifyContent: "left",
                            }}
                          >
                            <IconColorsOrder status={order.status} />
                            <Typography variant="body1">
                              {order.productName}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton
                              onClick={() =>
                                navigate(`/order-details/${order.orderId}`)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleModalOpen(order)}>
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => openAlertDialog(order.orderId)}
                            >
                              <DeleteForeverIcon style={{ color: "red" }} />
                            </IconButton>
                          </Box>
                        </Paper>
                      ))
                  ) : (
                    <Typography>No se encontraron pedidos</Typography>
                  )}
                  <Box sx={{ display: "flex", gap: 2, justifyContent: "center", paddingBottom: "1em" }}>
                    <Button
                      onClick={() => navigate("/create-order")}
                      sx={{
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        ":hover": { backgroundColor: "#76b0a0" },
                      }}
                    >
                      Agregar pedido <AddCircleIcon />
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        ":hover": { backgroundColor: "#76b0a0" },
                      }}
                      href={generateMailToLink(project.projectId)}
                    >
                      Enviar por Email <SendIcon />
                    </Button>
                  </Box>
                </Box>
              </Collapse>
            </Paper>
          ))
        ) : (
          <Typography>No se encontraron proyectos</Typography>
        )}
        <SimpleSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          handleClose={closeSnackbar}
        />
        <AlertDialog
          open={alertDialogOpen}
          onClose={closeAlertDialog}
          onConfirm={handleDelete}
          title="Confirmar Eliminación"
          content="¿Estás seguro de que deseas eliminar este pedido? Esta acción es irreversible."
        />
        <OrderDetailsModal
          open={modalOpen}
          onClose={handleModalClose}
          order={selectedOrder}
        />
      </Box>
    </Box>
  );
}

export default OrderList;















// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Typography, IconButton, Collapse, Button } from "@mui/material";
// import { deleteOrder } from "../../api/deleteOrder";
// import { getAllOrders } from "../../api/getAllOrders";
// import { getAllProjects } from "../../api/getAllProjects";
// import SimpleSnackbar from "../../components/SnackBar";
// import AlertDialog from "../../components/AlertDialog";
// import IconColorsOrder from "../../components/IconColorsOrder";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import SendIcon from "@mui/icons-material/Send";
// import OrderDetailsModal from "../../components/orderDetailModal"

// function OrderList() {
//   const [orders, setOrders] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [open, setOpen] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [alertDialogOpen, setAlertDialogOpen] = useState(false);
//   const [currentOrderId, setCurrentOrderId] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el modal
//   const [selectedOrder, setSelectedOrder] = useState(null); // Estado para el pedido seleccionado
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProjectsAndOrders();
//   }, []);

//   const fetchProjectsAndOrders = async () => {
//     setLoading(true);
//     try {
//       const projectResponse = await getAllProjects();
//       setProjects(projectResponse);
//       const orderResponse = await getAllOrders();
//       setOrders(orderResponse);
//     } catch (error) {
//       console.error("Error al obtener los datos:", error);
//       setSnackbarMessage("Error al cargar los datos");
//       setSnackbarOpen(true);
//     }
//     setLoading(false);
//   };

//   const handleDelete = async () => {
//     if (currentOrderId) {
//       try {
//         await deleteOrder(currentOrderId);
//         setOrders((prevOrders) =>
//           prevOrders.filter((order) => order.orderId !== currentOrderId)
//         );
//         setSnackbarMessage("Pedido eliminado con éxito");
//       } catch (error) {
//         console.error("Error al eliminar el pedido:", error);
//         setSnackbarMessage("Error al eliminar el pedido");
//       }
//       setSnackbarOpen(true);
//       closeAlertDialog();
//     }
//   };

//   const openAlertDialog = (orderId) => {
//     setCurrentOrderId(orderId);
//     setAlertDialogOpen(true);
//   };

//   const closeAlertDialog = () => {
//     setAlertDialogOpen(false);
//   };

//   const closeSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const handleToggle = (projectId) => {
//     setOpen((prevState) => ({
//       ...prevState,
//       [projectId]: !prevState[projectId],
//     }));
//   };

//   const handleModalOpen = (order) => {
//     setSelectedOrder(order);
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//     setSelectedOrder(null);
//   };

//   if (loading) return <p>Cargando datos de contacto...</p>;

//   return (
//     <Box sx={{ marginTop: "2em" }}>
//       {projects.length > 0 ? (
//         projects.map((project) => (
//           <Box
//             key={project.projectId}
//             sx={{ margin: "2em", border: "1px solid #f0efef" }}
//           >
//             <Box sx={{ display: "flex", padding: "1em", gap: 2 }}>
//               <Typography variant="h6">
//                 {" "}
//                 <strong>Proyecto: </strong> {project.projectName}
//               </Typography>
//               <Button
//                 variant="outlined"
//                 onClick={() => handleToggle(project.projectId)}
//               >
//                 {open[project.projectId] ? (
//                   <KeyboardArrowUpIcon />
//                 ) : (
//                   <KeyboardArrowDownIcon />
//                 )}{" "}
//                 Pedidos
//               </Button>
//             </Box>
//             <Collapse in={open[project.projectId]}>
//               <Box sx={{ marginTop: "2em" }}>
//                 {orders.filter((order) => order.projectId === project.projectId)
//                   .length > 0 ? (
//                   orders
//                     .filter((order) => order.projectId === project.projectId)
//                     .map((order) => (
//                       <Box
//                         key={order.orderId}
//                         sx={{
//                           margin: 2,
//                           border: "1px solid gray",
//                           padding: 2,
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                           borderRadius: "10px",
//                         }}
//                       >
//                         <Box>
//                           <Typography variant="body2">
//                             {formatDate(order.date)}
//                           </Typography>
//                         </Box>
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 1,
//                             justifyContent: "left",
//                           }}
//                         >
//                           <IconColorsOrder status={order.status} />
//                           <Typography variant="body">
//                             {order.productName}
//                           </Typography>
//                         </Box>
//                         <Box sx={{ display: "flex", gap: 1 }}>
//                           <IconButton>
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton onClick={() => handleModalOpen(order)}>
//                             <VisibilityIcon />
//                           </IconButton>
//                           <IconButton
//                             onClick={() => openAlertDialog(order.orderId)}
//                           >
//                             <DeleteForeverIcon style={{ color: "red" }} />
//                           </IconButton>

//                           <IconButton
//                             onClick={() =>
//                               navigate(`/order-details/${order.orderId}`)
//                             }
//                           >
//                             <ArrowForwardIosIcon />
//                           </IconButton>
//                         </Box>
//                       </Box>
//                     ))
//                 ) : (
//                   <Typography>No se encontraron pedidos</Typography>
//                 )}
//               </Box>
//               <Box>
//                 <Button
//                   sx={{
//                     backgroundColor: "#84C7AE",
//                     color: "#fff",
//                     margin: "2em",
//                   }}
//                 >
//                   {" "}
//                   Agregar Tarea <AddCircleIcon />{" "}
//                 </Button>
//                 <Button
//                   sx={{
//                     backgroundColor: "#84C7AE",
//                     color: "#fff",
//                     margin: "2em",
//                   }}
//                 >
//                   {" "}
//                   Enviar <SendIcon />{" "}
//                 </Button>
//               </Box>
//             </Collapse>
//           </Box>
//         ))
//       ) : (
//         <Typography>No se encontraron proyectos</Typography>
//       )}
//       <SimpleSnackbar
//         open={snackbarOpen}
//         message={snackbarMessage}
//         handleClose={closeSnackbar}
//       />
//       <AlertDialog
//         open={alertDialogOpen}
//         onClose={closeAlertDialog}
//         onConfirm={handleDelete}
//         title="Confirmar Eliminación"
//         content="¿Estás seguro de que deseas eliminar este pedido? Esta acción es irreversible."
//       />
//       <OrderDetailsModal
//         open={modalOpen}
//         onClose={handleModalClose}
//         order={selectedOrder}
//       />
//     </Box>
//   );
// }

// export default OrderList;



















