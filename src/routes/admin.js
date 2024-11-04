// adminRouter.js
import express from "express";
import AuthController from "../controllers/admin/auth.js";
import UserController from "../controllers/admin/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.get("/", isAuthenticated,  AuthController.index);
adminRouter.get("/users",  UserController.getUsers);
adminRouter.get("/login", AuthController.signIn);
adminRouter.post("/login", AuthController.signIn);

export default adminRouter;