import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field} from "formik";
import {OrderFormSchema} from "../../forms/Orders/OrdersFormSchema"
import { Grid, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {getProjectById} from "../../api/getProjectById"
import { updateOrder } from "../../api/updateOrder"
 
//  value={values.selectedSection} mirar esto,  si section.sectionKey y ponerlo en initial values también



export default function CreateOrder() {
  const navigate = useNavigate();
  const [project, setProject] = useState({ typeOfWork: [], sections: {} });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await getProjectById(); 
        setProject(projectData);
      } catch (error) {
        console.error("Error de conexión:", error);
        setError("No se puede conectar al servidor");
      }
    };
    fetchProjects();
  }, []);

  const initialValues = {
    productName: "",
    provider: "",
    brand: "",
    amount: "",
    details: "",
    typeOfWork: "",
    status: "",
    date: "",
    selectedSection: ""
  };

  

  const handleSubmit = async (values, actions) => {
    try {
      await updateOrder(values); 
      navigate(`/orderDetails`);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setError("Error al enviar el formulario");
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OrderFormSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Typography>{new Date().toDateString()}</Typography>
          <Typography>{project.projectName}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="typeOfWork-label">Tipo de Trabajo</InputLabel>
                <Select
                  labelId="typeOfWork-label"
                  id="typeOfWork-select"
                  name="typeOfWork"
                  value={values.typeOfWork}
                  label="Tipo de Trabajo"
                  onChange={handleChange}
                >
                  {project.typeOfWork.map((type, index) => (
                    <MenuItem key={index} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="section-label">Sección</InputLabel>
                <Select
                  labelId="section-label"
                  id="section-select"
                  name="selectedSection"
                  value={values.selectedSection}
                  label="Sección"
                  onChange={handleChange}
                >
                  {Object.entries(project.sections).filter(([key, value]) => value).map(([key, _]) => (
                    <MenuItem key={key} value={key}>{key}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Field as={TextField} label="Producto" name="productName" placeholder="Nombre del material a pedir" fullWidth />
              <Field as={TextField} label="Cantidad" name="amount" placeholder="Cantidad de material a pedir" fullWidth />
              <Field as={TextField} label="Detalles" name="details" placeholder="Escriba aquí los detalles del pedido" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" disabled={isSubmitting}>
                Crear Pedido
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
