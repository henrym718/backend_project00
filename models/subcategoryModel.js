import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

export default Subcategory;
