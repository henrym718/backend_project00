import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    displayName: String,
    aboutMe: String,
    memberSince: { type: Date, default: new Date() },
    isSeller: { type: Boolean, default: true },
    avatar: {
      uri: String,
      tag: String,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const user = model("User", userSchema);
export default user;
