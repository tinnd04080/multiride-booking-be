import { model, Schema } from "mongoose";

const busSchema = new Schema(
  {
    busType: {
      type: Schema.Types.ObjectId,
      ref: "busTypes",
      required: true,
    },
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
      unique: true,
    },
  },
  { timestamps: true }
);

const Bus = model("buses", busSchema);
export default Bus;
