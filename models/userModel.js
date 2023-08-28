import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: String,
    password: String,
    isSeller: Boolean,
    avatar: {
      uri: String,
      tag: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const user = model("User", userSchema);
export default user;
