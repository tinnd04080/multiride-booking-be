import { model, Schema } from "mongoose";

const busTypesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    seatNumber: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BusTypes = model("busTypes", busTypesSchema);
export default BusTypes;
