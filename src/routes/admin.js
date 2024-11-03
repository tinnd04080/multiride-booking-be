// adminRouter.js
import express from "express";
import AuthController from "../controllers/admin/auth.js";

const adminRouter = express.Router();

adminRouter.get("/", AuthController.signIn);
adminRouter.get("/login", AuthController.signIn);
adminRouter.post("/login", AuthController.signIn);

export default adminRouter;