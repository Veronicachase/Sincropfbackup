const express = require("express");
const {
  addUser,
  loginUser,
  deleteUser,
  updateUser,
  getUser,
  logoutUser
} = require("../controllers/userController");

const userRouter = express.Router();
userRouter.get("/:userId", getUser);
userRouter.post("/", addUser);
userRouter.post("/logout",logoutUser);
userRouter.post("/login", loginUser);
userRouter.delete("/:userId", deleteUser);
userRouter.patch("/:userId", updateUser);


module.exports = userRouter;
