const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const projectRouter = require("./routes/projectRouter");
const employeeRouter = require("./routes/employeeRouter");
const taskRouter =require("./routes/taskRouter");
const contactRouter =require("./routes/contactRouter");
const orderRouter = require("./routes/OrderRouter");
const hoursRouter = require ("./routes/hoursRouter");
const pendingRouter = require ("./routes/pendingRouter");
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT;

//middlewares de express
app.use(cors());
app.use(logger("dev"));
app.use(express.json({limit: '50mb'}));
app.use(express.text());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true  })); 



//Peticiones de Nuesta API
app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/employees", employeeRouter);
app.use("/tasks", taskRouter);
app.use ("/contacts",contactRouter)
app.use ("/orders",orderRouter)
app.use ("/hours",hoursRouter)
app.use ("/pendings",pendingRouter)



//servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
