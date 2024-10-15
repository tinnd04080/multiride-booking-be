import express from "express";
import { checkLogin } from "../middlewares/auth.js";
import BusTypesController from "../controllers/busTypes.js";

const busTypeRouter = express.Router();

busTypeRouter.post("/", checkLogin, BusTypesController.createBusTypes);
busTypeRouter.get("/", checkLogin, BusTypesController.getBusTypes);
busTypeRouter.get("/:id", checkLogin, BusTypesController.getBusType);
busTypeRouter.put("/:id", checkLogin, BusTypesController.updateBusType);
busTypeRouter.delete("/:id", checkLogin, BusTypesController.removeBusType);

export default busTypeRouter;
