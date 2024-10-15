import { PAGINATION } from "../constants/index.js";
import BusTypes from "../models/busTypes.js";
import User from "../models/users.js";

const BusTypesController = {
  createBusTypes: async (req, res) => {
    try {
      const { name, seatNumber, price } = req.body;

      const busType = await new BusTypes({ name, seatNumber, price }).save();

      res.json(busType);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getBusTypes: async (req, res) => {
    try {
      const { page = PAGINATION.PAGE, limit = PAGINATION.LIMIT } = req.query;

      const busTypes = await BusTypes.find()
        .sort("-createdAt")
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();

      const count = await User.countDocuments();

      const totalPage = Math.ceil(count / limit);
      const currentPage = Number(page);

      res.json({
        data: busTypes,
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

  getBusType: async (req, res) => {
    try {
      const { id } = req.params;

      const busType = await BusTypes.findById(id);

      res.json(busType);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateBusType: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, seatNumber, price } = req.body;

      const user = await BusTypes.findByIdAndUpdate(
        id,
        {
          name,
          seatNumber,
          price,
        },
        { new: true }
      );

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  removeBusType: async (req, res) => {
    try {
      const { id } = req.params;

      const busType = await BusTypes.findByIdAndDelete(id);

      res.json(busType);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default BusTypesController;
