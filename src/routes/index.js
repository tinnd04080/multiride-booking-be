import express from "express";
import authRouter from "./auth.js";
import userRouter from "./users.js";
import busTypeRouter from "./busTypes.js";
import busRouteRouter from "./busRoutes.js";
import busRouter from "./bus.js";
import tripRouter from "./trips.js";
import seatRouter from "./seats.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/bus-types", busTypeRouter);
router.use("/bus-routes", busRouteRouter);
router.use("/buses", busRouter);
router.use("/trips", tripRouter);
router.use("/seats", seatRouter);

export default router;
