// adminRouter.js
import express from "express";
import AuthController from "../controllers/admin/auth.js";
import UserController from "../controllers/admin/users.js";
import RouteController from "../controllers/admin/busRoutes.js";
import TripController from "../controllers/admin/trip.js";
import BusController from "../controllers/admin/bus.js";
import StatisticController from "../controllers/admin/statistic.js";
import { isAuthenticated } from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.get("/", isAuthenticated,  AuthController.index);
adminRouter.get("/users",  UserController.getUsers);
adminRouter.get("/users/add",  UserController.createUser);
adminRouter.post("/users/add",  UserController.createUser);
adminRouter.delete("/users/:id",  UserController.removeUser);
adminRouter.get("/users/:id/edit",  UserController.updateUser);
adminRouter.post("/users/:id/edit",  UserController.updateUser);

adminRouter.get("/login", isAuthenticated, AuthController.signIn);
adminRouter.post("/login", isAuthenticated, AuthController.signIn);
adminRouter.get("/logout", isAuthenticated, AuthController.logout);

adminRouter.get("/bus-routes", isAuthenticated, RouteController.getBusRoutes);
adminRouter.get("/add-bus-route", isAuthenticated, RouteController.createBusRoutes);


adminRouter.get("/trips", isAuthenticated, TripController.getTrips);
adminRouter.get("/add-trip", isAuthenticated, TripController.createTrip);

adminRouter.get("/buses", isAuthenticated, BusController.getBuses);
adminRouter.get("/add-bus", isAuthenticated, BusController.createBus);

adminRouter.get("/statistics", isAuthenticated, StatisticController.index);


export default adminRouter;