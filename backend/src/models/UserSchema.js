import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Provide a valid email address - MONGODB VALIDATION",
      ],
    },
  },
  {
    versionKey: false,
  }
);

export default model("User", UserSchema);
