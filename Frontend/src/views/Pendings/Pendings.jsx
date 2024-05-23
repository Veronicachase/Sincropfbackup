/// aqui no funciona el crear pending nuevo


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { getAllTasks } from "../../api/getAllTasks";
import { addPending } from "../../api/addPending";
import { deleteTask } from "../../api/deleteTask";
import { deletePending } from "../../api/deletePending";
import { getAllOrders } from "../../api/getAllOrders";
import { getEmployees } from "../../api/getEmployees";
import { getAllPendings } from "../../api/getAllPendings";
import  SideMenu  from "../../components/SideMenu"
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Pendings() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [reports, setReports] = useState([]);
  const [pendings, setPendings] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks
  useEffect(() => {
    async function fetchTasks() {
      try {
        const myTasks = await getAllTasks();
        setTasks(myTasks.filter(task => task.status !== "terminado"));
      } catch (error) {
        console.error("Error al obtener la tarea:", error);
      }
    }
    fetchTasks();
  }, []);

  // Fetch employees
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const employeesData = await getEmployees();
        setEmployees(employeesData.filter(employee => employee.mandatoryEquipment !== "entregado"));
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    }
    fetchEmployees();
  }, []);

  // Fetch orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const orders = await getAllOrders();
        setPendingOrders(orders.filter(order => order.status === "pendiente"));
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    }
    fetchOrders();
  }, []);

  // Fetch pendings
  useEffect(() => {
    async function fetchPendings() {
      try {
        const pendingData = await getAllPendings();
        setPendings(pendingData.filter(pending => pending.status !== "terminado"));
      } catch (error) {
        console.error("Error al obtener la tarea pendiente:", error);
      }
    }
    fetchPendings();
  }, []);

  const validationSchema = yup.object().shape({
    date: yup.date().required('La fecha es requerida'),
    details: yup.string().required('Los detalles son requeridos')
  });

  const handleAddPending = async (values, actions) => {
    try {
      const addedPending = await addPending({
        details: values.details.trim(),
        status: "pendiente",
        date: values.date
      });
      setPendings([...pendings, addedPending]);
      actions.resetForm();
    } catch (error) {
      console.error("Failed to add pending:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.taskId !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleDeletePending = async (pendingId) => {
    try {
      await deletePending(pendingId);
      setPendings(pendings.filter(pending => pending.pendingId !== pendingId));
    } catch (error) {
      console.error("Failed to delete pending:", error);
    }
  };

  return (
    <>
   <Box display={"flex"} >  
   <Box> <SideMenu/>  </Box>
   
      <Box> 
      <Box>
        <Formik
          initialValues={{ date: new Date().toISOString().slice(0, 10), details: '' }}
          validationSchema={validationSchema}
          onSubmit={handleAddPending}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form>
              <Field
                as={TextField}
                label="Nuevo pendiente"
                name="details"
                value={values.details}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <Button
                type="submit"
                sx={{ backgroundColor: "#84C7AE", color: "#fff" }}
                style={{ marginTop: 20 }}
                disabled={isSubmitting}
              >
                Agregar Pendiente
              </Button>
            </Form>
          )}
        </Formik>
        <Box sx={{ marginBottom: "2em", marginTop: "2em" }}>
          <Typography sx={{ marginBottom: "2em" }} variant="h6">Mis Pendientes creados</Typography>
          {pendings.map((pending) => (
            pending.status !== "terminado" &&
            <Box key={pending.pendingId} sx={{ display: "flex", justifyContent: "center", gap: 1, alignItems: "center", border: "1px solid #f0efef", marginBottom: "1em" , backgroundColor:"#ffffff4d", borderRadius:"5px", padding:".5em 1.5em" }}>
              <Typography>{pending.date} - {pending.details}</Typography>
              <IconButton sx={{ color: "red" }} edge="end" aria-label="delete" onClick={() => handleDeletePending(pending.pendingId)}>
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Typography variant="h6" sx={{ marginTop: 2 }}>Tareas Pendientes</Typography>
        <List>
          {tasks.map((task) => (
            <Box key={task.taskId} sx={{ display: "flex", justifyContent: "left", gap: 1, alignItems: "center", border: "1px solid #f0efef", marginBottom: "1em" , backgroundColor:"#ffffff4d", borderRadius:"5px", padding:".5em 1.5em" }}>
              <ListItem onClick={() => navigate(`/tasks/${task.taskId}`)}>
                <ListItemText primary={task.taskName} />
                <ListItemSecondaryAction>
                  <IconButton sx={{ color: "red" }} edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.taskId)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Box>
          ))}
        </List>
      </Box>

      <Box>
        <Box sx={{ marginBottom: "2em", marginTop: "2em" }}>
          <Typography sx={{ marginBottom: "2em" }} variant="h6">Reportes no enviados</Typography>
          {reports.map((report) => (
            report.status === false &&
            <Box key={report.reportId} sx={{ display: "flex", justifyContent:"left", gap: 1, alignItems: "center", border: "1px solid #f0efef", marginBottom: "1em" , backgroundColor:"#ffffff4d", borderRadius:"5px", padding:".5em 1.5em" }}>
              <Typography>{report.date} - {report.reportName}</Typography>
              <IconButton sx={{ color: "red" }} edge="end" aria-label="delete" onClick={() => handleDeleteTask(report.reportId)}>
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Box sx={{ marginBottom: "2em", marginTop: "2em"}}>
          <Typography variant="h6">Trabajadores con equipo incompleto</Typography>
          {employees.map((employee) => (
            <Box key={employee.id} sx={{ display: "flex", justifyContent: "left", gap: 1,  border: "1px solid #f0efef", marginBottom: "1em",  backgroundColor:"#ffffff4d", borderRadius:"5px", padding:".5em 1.5em" }}>
              <Typography>{employee.name} - {employee.position}</Typography>
              <IconButton sx={{ color: "red" }} edge="end" aria-label="delete" onClick={() => handleDeleteTask(employee.id)} >
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Box sx={{ marginBottom: "2em", marginTop: "2em" }}>
          <Typography variant="h6">Pedidos Pendientes</Typography>
          {pendingOrders.map((order) => (
            <Box key={order.orderId} sx={{ display: "flex", justifyContent: "left", gap: 1, alignItems: "center", border: "1px solid #f0efef", marginBottom: "1em",  backgroundColor:"#ffffff4d", borderRadius:"5px", padding:".5em 1.5em" }}>
              <Typography>{order.productName}</Typography>
              <IconButton sx={{ color: "red" }} edge="end" aria-label="delete" onClick={() => handleDeleteTask(order.orderId)}>
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        </Box>
        </Box>
      </Box>
    </>
  );
}
