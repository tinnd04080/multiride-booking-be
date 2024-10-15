import express from "express";
import authRouter from "./auth.js";
import userRouter from "./users.js";
import busTypeRouter from "./busTypes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/bus-types", busTypeRouter);

export default router;
