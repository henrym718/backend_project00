import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
