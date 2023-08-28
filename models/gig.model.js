import mongoose, { Schema, model } from "mongoose";

const gigSchema = new Schema(
  {
    userId: mongoose.Types.ObjectId,
    service: String,
    counter: { type: Number, default: 0 },
    images: [String],
    aboutService: String,
    aboutMe: String,
    features: String,
    price: Number,
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    phone: String,
    address: String,
    active: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const gig = model("Gig", gigSchema);

export default gig;
