import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";
import createError from "http-errors";

class Categories {
  async createNewCategory(category) {
    try {
      const categoryExists = await Category.find({ name: { $regex: category.name, $options: "i" } })
      if (categoryExists.length > 0) throw createError.Conflict("Category already exists")
      const newCategory = await Category.create(category);
      return newCategory
    } catch (err) {
      throw err;
    }
  }



  /** faltan de revisar  */
  async updateCategory(category, update) {
    try {
      // Buscar la categoría por nombre (ignorando mayúsculas/minúsculas)
      const response = await Category.findOne({ name: { $regex: `^${category}$`, $options: "i" } });

      //verificar si existen datos para actualizar
      if (!response) {
        throw createError.NotFound("Not Found");
      }

      //actualizar cambio
      response.name = update;
      await response.save();

      return { message: "success" };
    } catch (err) {
      throw err;
    }
  }

  async getAllCategories() {
    try {
      return await Category.find();
    } catch (err) {
      throw err;
    }
  }

  async getCategoryWithSubcategories(category) {
    try {
      // Transformar el parámetro de la URL (ej: marketing-online a marketing online)
      const transformedParam = category.replace(/-/g, " ");

      // Buscar la categoría por el nombre transformado (ignorando mayúsculas/minúsculas)
      const response = await Category.findOne({
        name: { $regex: `^${transformedParam}$`, $options: "i" },
      });
      // Si no se encontró la categoría, lanzar un error
      if (!response) {
        throw createError.NotFound("Categoría no encontrada");
      }

      // Buscar las subcategorías asociadas a la categoría encontrada
      const subCategories = await Subcategory.find({
        category: response._id,
      }).select("id name");

      // Si no se encontraron subcategorías, lanzar un error
      if (subCategories.length === 0) {
        throw createError.NotFound("Subcategorías no encontradas");
      }

      // Devolver las subcategorías encontradas
      return subCategories;
    } catch (err) {
      // Capturar y propagar errores
      throw err;
    }
  }
}

export default Categories;
