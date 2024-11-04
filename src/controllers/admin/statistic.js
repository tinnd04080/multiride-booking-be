import { PAGINATION } from "../../constants/index.js";
import Bus from "../../models/bus.js";
import Trip from "../../models/trips.js";
import BusRoutes from "../../models/busRoutes.js";

const StatisticController = {
  index: async (req, res) => {
    try {
      res.render('statistics', {});
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

};

export default StatisticController;
