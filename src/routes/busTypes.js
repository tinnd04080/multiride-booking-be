import express from "express";
import { checkLogin, isAdmin } from "../middlewares/auth.js";
import BusTypesController from "../controllers/busTypes.js";

const busTypeRouter = express.Router();

busTypeRouter.post("/", checkLogin, isAdmin, BusTypesController.createBusTypes);
busTypeRouter.get("/", checkLogin, BusTypesController.getBusTypes);
busTypeRouter.get("/:id", checkLogin, BusTypesController.getBusType);
busTypeRouter.put(
  "/:id",
  checkLogin,
  isAdmin,
  BusTypesController.updateBusType
);
busTypeRouter.delete(
  "/:id",
  checkLogin,
  isAdmin,
  BusTypesController.removeBusType
);

export default busTypeRouter;
