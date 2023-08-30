import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: mongoose.Types.ObjectId,
    firstName: String,
    lastName: String,
    displayName: String,
    aboutMe: String,
    city: String,
    phone: String,
    memberSince: { type: Date, default: new Date() },
    isSeller: { type: Boolean, default: false },
    avatar: {
      uri: String,
      filename: String,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const user = mongoose.model("User", userSchema);
export default user;
