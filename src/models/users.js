import { model, Schema } from "mongoose";
import { ROLE, GENDER } from "../constants/index.js";

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
    isVerified: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: Object.values(ROLE),
      required: true,
      default: ROLE.CUSTOMER,
    },
    address: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: Object.values(GENDER),
      required: true,
      default: GENDER.MAN,
    },
    dob: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["password"];
    return ret;
  },
});

const User = model("users", userSchema);
export default User;
