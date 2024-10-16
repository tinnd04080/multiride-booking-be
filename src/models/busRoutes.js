import { model, Schema } from "mongoose";
import { BUS_ROUTES_STATUS } from "../constants/index.js";

const busRoutesSchema = new Schema(
  {
    startLocation: {
      type: String,
      required: true,
    },
    endLocation: {
      type: String,
      required: true,
    },
    duration: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(BUS_ROUTES_STATUS),
      default: BUS_ROUTES_STATUS.OPEN,
    },
  },
  { timestamps: true }
);

const BusRoutes = model("busRoutes", busRoutesSchema);
export default BusRoutes;
