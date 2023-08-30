import CategoriesService from "../services/categoryService.js";

const categoriesService = new CategoriesService();

export const createNewCategory = async (req, res, next) => {
  try {
    const category = await categoriesService.createNewCategory(req.body);
    res.status(200).send({ error: false, category });
  } catch (err) {
    next(err);
  }
};



/* faltan de revisar */
export const updateCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { name } = req.body;
    const response = await categoriesService.updateCategory(category, name);
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoriesService.getAllCategories();
    res.status(200).send(categories);
  } catch (err) {
    next(err);
  }
};

export const getCategoryWithSubcategories = async (req, res, next) => {
  try {
    const { category } = req.params;
    const categories = await categoriesService.getCategoryWithSubcategories(
      category
    );
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};
