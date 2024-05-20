import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = model("user", userSchema);

export default User;
