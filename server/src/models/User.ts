import { Schema, model } from "mongoose";

const userShema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
export const User = model("User", userShema);
