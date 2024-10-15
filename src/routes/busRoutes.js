import express from "express";
import { checkLogin } from "../middlewares/auth.js";
import BusRouteController from "../controllers/busRoutes.js";

const busTypeRouter = express.Router();

busTypeRouter.post("/", checkLogin, BusRouteController.createBusRoutes);
busTypeRouter.get("/", checkLogin, BusRouteController.getBusRoutes);
busTypeRouter.get("/:id", checkLogin, BusRouteController.getBusRoute);
busTypeRouter.put("/:id", checkLogin, BusRouteController.updateBusRoute);
busTypeRouter.delete("/:id", checkLogin, BusRouteController.removeBusRoute);

export default busTypeRouter;
