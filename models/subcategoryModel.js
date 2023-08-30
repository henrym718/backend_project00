import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
  {
    name: String,
    category: mongoose.Schema.Types.ObjectId
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

export default Subcategory;
