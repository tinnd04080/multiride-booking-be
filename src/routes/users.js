import express from "express";
import { checkLogin } from "../middlewares/auth.js";
import UserController from "../controllers/users.js";

const userRouter = express.Router();

userRouter.get("/profile", checkLogin, UserController.getProfile);
userRouter.put("/profile", checkLogin, UserController.updateProfile);
userRouter.post(
  "/profile/change-password",
  checkLogin,
  UserController.changeProfilePassword
);

export default userRouter;
