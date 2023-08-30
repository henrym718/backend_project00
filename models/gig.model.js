import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
  {
    userId: mongoose.Types.ObjectId,
    title: String,
    category: mongoose.Types.ObjectId,
    subcategory: mongoose.Types.ObjectId,
    tags: [String],
    city: String,
    price: Number,
    aboutGig: String,
    phone: String,
    faq: [{ question: String, answer: String }],
    images: [{ url: String, filename: String, }],
    counter: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const gig = mongoose.model("Gig", gigSchema);

export default gig;
