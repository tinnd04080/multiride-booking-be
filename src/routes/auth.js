import express from "express";
import AuthController from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/register", AuthController.signUp);

export default authRouter;
