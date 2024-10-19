import { PAGINATION } from "../constants/index.js";
import BusTypes from "../models/busTypes.js";
import Seats from "../models/seats.js";

const SeatController = {
  createSeat: async (req, res) => {
    try {
      const { bus, seatNumber, status } = req.body;

      const seat = await new Seats({ bus, seatNumber, status }).save();

      res.json(seat);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getAllSeats: async (req, res) => {
    try {
      const {
        page = PAGINATION.PAGE,
        limit = PAGINATION.LIMIT,
        sortBy = "createdAt",
        orderBy = "DESC",
        bus,
      } = req.query;

      const queryObj = {};
      if (bus) {
        queryObj.bus = bus;
      }

      const seats = await Seats.find(queryObj)
        .sort({
          [sortBy]: orderBy === "DESC" ? -1 : 1,
        })
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .populate("bus")
        .exec();

      const count = await Seats.countDocuments();

      const totalPage = Math.ceil(count / limit);
      const currentPage = Number(page);

      res.json({
        data: seats,
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

  getSeat: async (req, res) => {
    try {
      const { id } = req.params;

      const seat = await Seats.findById(id).populate("bus").exec();

      res.json(seat);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateSeat: async (req, res) => {
    try {
      const { id } = req.params;
      const { bus, seatNumber, status } = req.body;

      const seat = await Seats.findByIdAndUpdate(
        id,
        {
          bus,
          seatNumber,
          status,
        },
        { new: true }
      ).exec();

      res.json(seat);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  removeSeat: async (req, res) => {
    try {
      const { id } = req.params;

      const seat = await Seats.findByIdAndDelete(id).exec();

      res.json(seat);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default SeatController;
