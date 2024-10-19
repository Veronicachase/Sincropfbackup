
 require('./utils/config');
const express = require("express");
const logger = require("morgan");
const userRouter = require("./routes/userRouter");
const projectRouter = require("./routes/projectRouter");
const employeeRouter = require("./routes/employeeRouter");
const taskRouter = require("./routes/taskRouter");
const contactRouter = require("./routes/contactRouter");
const orderRouter = require("./routes/orderRouter");
const hoursRouter = require("./routes/hoursRouter");
const pendingRouter = require("./routes/pendingRouter");
const cors = require("cors");
const authenticateToken =require("./middleWares/authenticateToken")

 
const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: '*',
  credentials: true,
};
// Middlewares de express
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.text());
app.use(express.urlencoded({ extended: true }));



// Aplicar el middleware de autenticación a las rutas que requieran autenticación
app.use("/projects", authenticateToken, projectRouter);
app.use("/employees", authenticateToken, employeeRouter);
app.use("/tasks", authenticateToken, taskRouter);
app.use("/contacts", authenticateToken, contactRouter);
app.use("/orders", authenticateToken, orderRouter);
app.use("/hours", authenticateToken, hoursRouter);
app.use("/pendings", authenticateToken, pendingRouter);

// Rutas públicas
app.use("/users", userRouter);
// Redirigir a la ruta de inicio de sesión
app.get("/", (req, res) => {
  res.redirect("/users/login");
});

// Servidor
app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server on port ${port}:`, err);
    process.exit(1);
  }
  console.log(`Example app listening on port ${port}`);
});
