import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";

export const createNewSubcategory = async (req, res) => {
  try {
    const foundCategory = await Category.findOne({
      name: { $regex: req.body.category, $options: "i" },
    });

    if (!foundCategory) { return res.status(404).send("Category not found") }

    const subcategory = await Subcategory.create({
      name: req.body.name, category: foundCategory.id,
    });
    res.status(200).json({
      id: subcategory._id,
      subcategory: subcategory.name,
      category: foundCategory.name,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAll = async (req, res, next) => {
  res.send("Welcome");
};
