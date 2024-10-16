import express from "express";
import authRouter from "./auth.js";
import userRouter from "./users.js";
import busTypeRouter from "./busTypes.js";
import busRouteRouter from "./busRoutes.js";
import busRouter from "./bus.js";
import tripRouter from "./trips.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/bus-types", busTypeRouter);
router.use("/bus-routes", busRouteRouter);
router.use("/buses", busRouter);
router.use("/trips", tripRouter);

export default router;
