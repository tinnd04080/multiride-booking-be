import { PAGINATION } from "../constants/index.js";
import Trip from "../models/trips.js";

const TripController = {
  createTrip: async (req, res) => {
    try {
      const { route, bus, departureTime, arrivalTime } = req.body;

      const trip = await new Trip({
        route,
        bus,
        departureTime,
        arrivalTime,
      }).save();

      res.json(trip);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getTrips: async (req, res) => {
    try {
      const { page = PAGINATION.PAGE, limit = PAGINATION.LIMIT } = req.query;

      const trips = await Trip.find()
        .populate(["route", "bus"])
        .sort("-createdAt")
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();

      const count = await Trip.countDocuments();

      const totalPage = Math.ceil(count / limit);
      const currentPage = Number(page);

      res.json({
        data: trips,
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

  getTrip: async (req, res) => {
    try {
      const { id } = req.params;

      const trip = await Trip.findById(id).populate(["route", "bus"]).exec();

      res.json(trip);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateTrip: async (req, res) => {
    try {
      const { id } = req.params;
      const { route, bus, departureTime, arrivalTime } = req.body;

      const newTrip = await Trip.findByIdAndUpdate(
        id,
        {
          route,
          bus,
          departureTime,
          arrivalTime,
        },
        { new: true }
      ).exec();

      res.json(newTrip);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  removeTrip: async (req, res) => {
    try {
      const { id } = req.params;

      const trip = await Trip.findByIdAndDelete(id).exec();

      res.json(trip);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default TripController;
