import express from "express";
import * as categoryController from "../controllers/categoriesController.js";
const router = express.Router();

router.post("/create", categoryController.createNewCategory);
router.patch("/update/:category", categoryController.updateCategory);
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:category", categoryController.getCategoryWithSubcategories);

export default router;



