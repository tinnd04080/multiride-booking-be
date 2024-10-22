import { PAGINATION } from "../constants/index.js";
import Bus from "../models/bus.js";
import BusType from "../models/busTypes.js";
import User from "../models/users.js";

const BusController = {
  createBus: async (req, res) => {
    try {
      const { busType, licensePlate, driver } = req.body;

      const busTypeInfo = await BusType.findById(busType).exec();
      const userInfo = await User.findById(driver).exec();

      if (!busTypeInfo || !userInfo) {
        return res.status(404).json({
          message: "An error occurred, please try again",
        });
      }

      const bus = await new Bus({ busType, licensePlate, driver }).save();

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
      const { busType, licensePlate, driver } = req.body;

      const busTypeInfo = await BusType.findById(busType).exec();
      const userInfo = await User.findById(driver).exec();

      if (!busTypeInfo || !userInfo) {
        return res.status(404).json({
          message: "An error occurred, please try again",
        });
      }

      const bus = await Bus.findByIdAndUpdate(
        id,
        {
          busType,
          licensePlate,
          driver,
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

      const findBus = await Bus.findById(id).exec();
      const user = await User.findById(findBus.driver).exec();
      const type = await BusType.findById(findBus.busType).exec();

      if (user || type) {
        return res.status(400).json({
          message: "An error occurred, please try again",
        });
      }

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
