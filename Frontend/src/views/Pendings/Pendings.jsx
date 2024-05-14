import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getAllTasks } from "../../api/getAllTasks";
import { getAllOrders  } from "../../api/getAllOrders"
import { getEmployees } from "../../api/getEmployees"
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Pendings() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [pendingTasks, setPendingTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks
  useEffect(() => {
    async function fetchTasks() {
      try {
        const myTasks = await getAllTasks();
        setTasks(myTasks.filter(task => task.status !== "completed"));
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    }
    fetchTasks();
  }, []);

  // Fetch employees
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const employees = await getEmployees();
        setEmployees(employees.filter(employee => employee.mandatoryEquipment === "yes"));
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
        setPendingOrders(orders.filter(order => order.status === "pending"));
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    }
    fetchOrders();
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { task: newTask.trim(), status: "pending" }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = index => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <>
      <Box>
        <TextField
          label="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button onClick={handleAddTask} style={{ marginTop: 20 }}>Add Task</Button>
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index} button onClick={() => navigate(`/tasks/${task.id}`)}>
              <ListItemText primary={task.task} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Typography>Unsent Reports</Typography>
        {reports.map((report, index) => (
          report.status === false &&
          <Box key={report.id}>
            <Typography>{report.date} - {report.reportName}</Typography>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Typography>Unsent Equipment to Employees</Typography>
        {employees.map((employee, index) => (
          <Box key={employee.id}>
            <Typography>{employee.name} - {employee.position}</Typography>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Typography>Pending Orders</Typography>
        {pendingOrders.map((order, index) => (
          <Box key={order.id}>
            <Typography>{order.orderName}</Typography>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default Pendings;
``
