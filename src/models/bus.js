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
    },
  },
  { timestamps: true }
);

const Bus = model("buses", busSchema);
export default Bus;
