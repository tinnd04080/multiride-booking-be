import { PAGINATION } from "../constants/index.js";
import BusRoutes from "../models/busRoutes.js";

const BusRouteController = {
  createBusRoutes: async (req, res) => {
    try {
      const {
        startProvince,
        startLocation,
        endLocation,
        endProvince,
        duration,
        status,
      } = req.body;

      const busRoute = await new BusRoutes({
        startProvince,
        startLocation,
        endLocation,
        endProvince,
        duration,
        status,
      }).save();

      res.json(busRoute);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getBusRoutes: async (req, res) => {
    try {
      const { page = PAGINATION.PAGE, limit = PAGINATION.LIMIT } = req.query;

      const busRoutes = await BusRoutes.find()
        .sort("-createdAt")
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();

      const count = await BusRoutes.countDocuments();

      const totalPage = Math.ceil(count / limit);
      const currentPage = Number(page);

      res.json({
        data: busRoutes,
        totalPage,
        currentPage,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getBusRoute: async (req, res) => {
    try {
      const { id } = req.params;

      const busRoute = await BusRoutes.findById(id);

      res.json(busRoute);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateBusRoute: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        startProvince,
        startLocation,
        endLocation,
        endProvince,
        duration,
        status,
      } = req.body;

      const busRoute = await BusRoutes.findByIdAndUpdate(
        id,
        {
          startProvince,
          startLocation,
          endLocation,
          endProvince,
          duration,
          status,
        },
        { new: true }
      );

      res.json(busRoute);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  removeBusRoute: async (req, res) => {
    try {
      const { id } = req.params;

      const busRoute = await BusRoutes.findByIdAndDelete(id);

      res.json(busRoute);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default BusRouteController;
