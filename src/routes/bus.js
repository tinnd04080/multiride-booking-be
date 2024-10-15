import express from "express";
import { checkLogin } from "../middlewares/auth.js";
import BusController from "../controllers/bus.js";

const busRouter = express.Router();

busRouter.post("/", checkLogin, BusController.createBus);
busRouter.get("/", checkLogin, BusController.getBuses);
busRouter.get("/:id", checkLogin, BusController.getBus);
busRouter.put("/:id", checkLogin, BusController.updateBus);
busRouter.delete("/:id", checkLogin, BusController.removeBus);

export default busRouter;
