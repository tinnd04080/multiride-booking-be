import { PAGINATION } from "../constants/index.js";
import Bus from "../models/bus.js";

const BusController = {
  createBus: async (req, res) => {
    try {
      const { busType, licensePlate } = req.body;

      const bus = await new Bus({ busType, licensePlate }).save();

      res.json(bus);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getBuses: async (req, res) => {
    try {
      const { page = PAGINATION.PAGE, limit = PAGINATION.LIMIT } = req.query;

      const bus = await Bus.find()
        .sort("-createdAt")
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .populate("busType")
        .exec();

      const count = await Bus.countDocuments();

      const totalPage = Math.ceil(count / limit);
      const currentPage = Number(page);

      res.json({
        data: bus,
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

  getBus: async (req, res) => {
    try {
      const { id } = req.params;

      const bus = await Bus.findById(id).populate("busType").exec();

      res.json(bus);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateBus: async (req, res) => {
    try {
      const { id } = req.params;
      const { busType, licensePlate } = req.body;

      const bus = await Bus.findByIdAndUpdate(
        id,
        {
          busType,
          licensePlate,
        },
        { new: true }
      ).exec();

      res.json(bus);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  removeBus: async (req, res) => {
    try {
      const { id } = req.params;

      const bus = await Bus.findByIdAndDelete(id).exec();

      res.json(bus);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default BusController;
