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
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CustomTextField from "../../components/generalComponents/CustomTextField";
import { getOrderById } from "../../api/orderApis/getOrderById";
import { updateOrder } from "../../api/orderApis/updateOrder";
import { getAllProjects } from "../../api/projectsAndTaskApis/getAllProjects";
import { InitialValues } from "./ordersSchemaAndInitialValues/InitialValues"; 
import { OrderFormSchema } from "./ordersSchemaAndInitialValues/OrdersFormSchema";
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

  const initialValues = InitialValues (order); 

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
          <Box width={"90%"} margin={"auto"}> 
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
                <FormControl fullWidth>
                  <InputLabel>Seleccionar Proyecto</InputLabel>
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
                        selectedProject ? selectedProject.projectId : ""
                      );
                    }}
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "#fff",
                    }}
                  >
                    {projects.map((project) => (
                      <MenuItem key={project.projectId} value={project.projectName}>
                        {project.projectName}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
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
                      name="status"
                      checked={values.status === "pendiente"}
                      onChange={() => setFieldValue("status", "pendiente")}
                    />
                  }
                  label="Pendiente"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="status"
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
                    marginBottom:"2em",
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
          </Box>
        </Form>
      )}
    </Formik>
  );
}



