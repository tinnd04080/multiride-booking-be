import { model, Schema } from "mongoose";
import { DISCOUNT_TYPE } from "../constants/index.js";

const promotionSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    discountAmount: {
      type: Number,
      required: true,
    },
    discountType: {
      type: String,
      enum: Object.values(DISCOUNT_TYPE),
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Promotion = model("promotions", promotionSchema);
export default Promotion;
