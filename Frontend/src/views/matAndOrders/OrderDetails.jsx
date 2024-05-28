

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  Grid,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CustomTextField from "../../ui/CustomTextField";
import { getOrderById } from "../../api/getOrderById";
import { updateOrder } from "../../api/updateOrder";
import { getAllProjects } from "../../api/getAllProjects";
import { OrderFormSchema } from "../../forms/Orders/OrdersFormSchema";
import toast from "react-hot-toast";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error("Error al obtener los datos en OrderDetails:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const projectData = await getAllProjects();
        setProjects(projectData);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchOrder();
    fetchProjects();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    orderName: order.orderName || "",
    projectName: order.projectName || "",
    projectId: order.projectId || "",
    productName: order.productName || "",
    provider: order.provider || "",
    brand: order.brand || "",
    amount: order.amount || "",
    details: order.details || "",
    typeOfWork: order.typeOfWork || "",
    status: order.status || "pendiente",
    date: order.date || new Date().toISOString().slice(0, 10),
    area: order.area || "",
    section: order.section || "",
    image: order.image || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OrderFormSchema}
      onSubmit={(values, actions) => {
        updateOrder(orderId, values)
          .then(() => {
            actions.setSubmitting(false);
            toast.success("Pedido actualizado correctamente!");
            navigate("/order-list");
          })
          .catch((error) => {
            console.error("Error al actualizar el pedido: ", error);
            actions.setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: "800px",
              margin: "2em auto",
              padding: "2em",
              boxShadow: 3,
              borderRadius: "10px",
              backgroundColor: "#fff",
              transition: "transform 0.3s, box-shadow 0.3s",
              ":hover": {
                transform: "scale(1.01)",
                boxShadow: 6,
              },
            }}
          >
            <Box sx={{ marginBottom: "2em", borderRadius: "10px" }}>
              <Typography variant="h5" gutterBottom>
                Editar Pedido
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  name="productName"
                  as={CustomTextField}
                  label="Nombre del Pedido"
                  fullWidth
                  InputProps={{
                    style: {
                      borderRadius: "10px",
                      backgroundColor: "#fff",
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="projectName"
                  as={Select}
                  variant="outlined"
                  value={values.projectName}
                  fullWidth
                  onChange={(event) => {
                    const selectedProject = projects.find(
                      (project) => project.name === event.target.value
                    );
                    setFieldValue("projectName", event.target.value);
                    setFieldValue(
                      "projectId",
                      selectedProject ? selectedProject.id : ""
                    );
                  }}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <em>Seleccionar Proyecto</em>;
                    }
                    return selected;
                  }}
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Seleccionar Proyecto</em>
                  </MenuItem>
                  {projects.map((project) => (
                    <MenuItem key={project.id} value={project.name}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="projectId"
                  as={CustomTextField}
                  label="ID del Proyecto"
                  fullWidth
                  value={values.projectId}
                  InputProps={{
                    style: {
                      borderRadius: "10px",
                      backgroundColor: "#fff",
                    },
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="amount"
                  as={CustomTextField}
                  label="Cantidad"
                  fullWidth
                  InputProps={{
                    style: {
                      borderRadius: "10px",
                      backgroundColor: "#fff",
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="brand"
                  as={CustomTextField}
                  label="Marca"
                  fullWidth
                  InputProps={{
                    style: {
                      borderRadius: "10px",
                      backgroundColor: "#fff",
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="details"
                  as={CustomTextField}
                  label="Detalles"
                  fullWidth
                  InputProps={{
                    style: {
                      borderRadius: "10px",
                      backgroundColor: "#fff",
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="area"
                  as={CustomTextField}
                  label="Área"
                  fullWidth
                  InputProps={{
                    style: {
                      borderRadius: "10px",
                      backgroundColor: "#fff",
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="section"
                  as={CustomTextField}
                  label="Sección"
                  fullWidth
                  InputProps={{
                    style: {
                      borderRadius: "10px",
                      backgroundColor: "#fff",
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="provider"
                  as={CustomTextField}
                  label="Proveedor"
                  fullWidth
                  InputProps={{
                    style: {
                      borderRadius: "10px",
                      backgroundColor: "#fff",
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="statusPendiente"
                      checked={values.status === "pendiente"}
                      onChange={() => setFieldValue("status", "pendiente")}
                    />
                  }
                  label="Pendiente"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="statusRecibido"
                      checked={values.status === "recibido"}
                      onChange={() => setFieldValue("status", "recibido")}
                    />
                  }
                  label="Recibido"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    paddingLeft: "1em",
                    paddingRight: "1em",
                    borderRadius: "10px",
                    ":hover": {
                      backgroundColor: "#76b0a0",
                      transform: "scale(1.02)",
                    },
                  }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Actualizar Pedido
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
}





// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Formik, Form, Field } from "formik";
// import {
//   Grid,
//   Box,
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   FormControlLabel,
//   Checkbox,
// } from "@mui/material";
// import CustomTextField from "../../ui/CustomTextField";
// import { getOrderById } from "../../api/getOrderById";
// import { updateOrder } from "../../api/updateOrder";
// import { getAllProjects } from "../../api/getAllProjects";
// import { OrderFormSchema } from "../../forms/Orders/OrdersFormSchema";
// import toast, { Toaster } from "react-hot-toast";

// export default function OrderDetails() {
//   const navigate = useNavigate();
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const orderData = await getOrderById(orderId);
//         setOrder(orderData);
//       } catch (error) {
//         console.error("Error al obtener los datos en OrderDetails:", error);
//       }
//     };

//     const fetchProjects = async () => {
//       try {
//         const projectData = await getAllProjects();
//         setProjects(projectData);
//       } catch (error) {
//         console.error("Error al obtener los proyectos:", error);
//       }
//     };

//     fetchOrder();
//     fetchProjects();
//   }, [orderId]);

//   if (!order) {
//     return <div>Loading...</div>;
//   }

//   const initialValues = {
//     orderName: order.orderName || "",
//     projectName: order.projectName || "",
//     projectId: order.projectId || "",
//     productName: order.productName || "",
//     provider: order.provider || "",
//     brand: order.brand || "",
//     amount: order.amount || "",
//     details: order.details || "",
//     typeOfWork: order.typeOfWork || "",
//     status: order.status || "pendiente",
//     date: order.date || new Date().toISOString().slice(0, 10),
//     area: order.area || "",
//     section: order.section || "",
//     image: order.image || "",
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={OrderFormSchema}
//       onSubmit={(values, actions) => {
//         updateOrder(orderId, values)
//           .then(() => {
//             actions.setSubmitting(false);
//             toast.success("Pedido actualizado correctamente!");
//             navigate("/order-list");
//           })
//           .catch((error) => {
//             console.error("Error al actualizar el pedido: ", error);
//             actions.setSubmitting(false);
//           });
//       }}
//     >
//       {({ isSubmitting, setFieldValue, values }) => (
//         <Form>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               width: "100%",
//               maxWidth: "800px",
//               margin: "2em auto",
//               padding: "2em",
//               boxShadow: 3,
//               borderRadius: "10px",
//               backgroundColor: "#fff",
//               transition: "transform 0.3s, background-color 0.3s",
//               ":hover": {
//                 transform: "scale(1.02)",
//                 backgroundColor: "#fff",
//               },
//             }}
//           >
//             <Box sx={{ marginBottom: "2em", borderRadius: "10px" }}>
//               <Typography variant="h5" gutterBottom>
//                 Editar Pedido
//               </Typography>
//             </Box>

//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Field
//                   name="productName"
//                   as={CustomTextField}
//                   label="Nombre del Pedido"
//                   fullWidth
//                   InputProps={{
//                     style: {
//                       borderRadius: "10px",
//                       backgroundColor: "#fff",
//                     },
//                   }}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Field
//                   name="projectName"
//                   as={Select}
//                   variant="outlined"
//                   value={values.projectName}
//                   fullWidth
//                   onChange={(event) => {
//                     const selectedProject = projects.find(
//                       (project) => project.name === event.target.value
//                     );
//                     setFieldValue("projectName", event.target.value);
//                     setFieldValue(
//                       "projectId",
//                       selectedProject ? selectedProject.id : ""
//                     );
//                   }}
//                   renderValue={(selected) => {
//                     if (!selected) {
//                       return <em>Seleccionar Proyecto</em>;
//                     }
//                     return selected;
//                   }}
//                   sx={{
//                     borderRadius: "10px",
//                     backgroundColor: "#fff",
//                     "& .MuiOutlinedInput-root": {
//                       "& fieldset": {
//                         border: "none",
//                       },
//                     },
//                   }}
//                 >
//                   <MenuItem value="">
//                     <em>Seleccionar Proyecto</em>
//                   </MenuItem>
//                   {projects.map((project) => (
//                     <MenuItem key={project.id} value={project.name}>
//                       {project.name}
//                     </MenuItem>
//                   ))}
//                 </Field>
//               </Grid>

//               <Grid item xs={12}>
//                 <Field
//                   name="projectId"
//                   as={CustomTextField}
//                   label="ID del Proyecto"
//                   fullWidth
//                   value={values.projectId}
//                   InputProps={{
//                     style: {
//                       borderRadius: "10px",
//                       backgroundColor: "#fff",
//                     },
//                     readOnly: true,
//                   }}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                   disabled
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Field
//                   name="amount"
//                   as={CustomTextField}
//                   label="Cantidad"
//                   fullWidth
//                   InputProps={{
//                     style: {
//                       borderRadius: "10px",
//                       backgroundColor: "#fff",
//                     },
//                   }}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Field
//                   name="brand"
//                   as={CustomTextField}
//                   label="Marca"
//                   fullWidth
//                   InputProps={{
//                     style: {
//                       borderRadius: "10px",
//                       backgroundColor: "#fff",
//                     },
//                   }}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Field
//                   name="details"
//                   as={CustomTextField}
//                   label="Detalles"
//                   fullWidth
//                   InputProps={{
//                     style: {
//                       borderRadius: "10px",
//                       backgroundColor: "#fff",
//                     },
//                   }}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Field
//                   name="area"
//                   as={CustomTextField}
//                   label="Área"
//                   fullWidth
//                   InputProps={{
//                     style: {
//                       borderRadius: "10px",
//                       backgroundColor: "#fff",
//                     },
//                   }}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Field
//                   name="section"
//                   as={CustomTextField}
//                   label="Sección"
//                   fullWidth
//                   InputProps={{
//                     style: {
//                       borderRadius: "10px",
//                       backgroundColor: "#fff",
//                     },
//                   }}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Field
//                   name="provider"
//                   as={CustomTextField}
//                   label="Proveedor"
//                   fullWidth
//                   InputProps={{
//                     style: {
//                       borderRadius: "10px",
//                       backgroundColor: "#fff",
//                     },
//                   }}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="statusPendiente"
//                       checked={values.status === "pendiente"}
//                       onChange={() => setFieldValue("status", "pendiente")}
//                     />
//                   }
//                   label="Pendiente"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="statusRecibido"
//                       checked={values.status === "recibido"}
//                       onChange={() => setFieldValue("status", "recibido")}
//                     />
//                   }
//                   label="Recibido"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Button
//                   sx={{
//                     backgroundColor: "#1976d2",
//                     color: "#fff",
//                     paddingLeft: "1em",
//                     paddingRight: "1em",
//                     borderRadius: "10px",
//                     ":hover": {
//                       backgroundColor: "#76b0a0",
//                       transform: "scale(1.02)",
//                     },
//                   }}
//                   type="submit"
//                   disabled={isSubmitting}
//                 >
//                   Actualizar Pedido
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Form>
//       )}
//     </Formik>
//   );
// }

