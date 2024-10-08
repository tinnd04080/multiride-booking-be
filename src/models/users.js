import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    cccd: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = model("users", userSchema);
export default User;
