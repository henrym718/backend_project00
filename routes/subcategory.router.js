import express from "express";
import * as subcategoryController from "../controllers/subcategory.controller.js";

const router = express.Router();

router.post("/create", subcategoryController.createNewSubcategory);
router.get("/categories/:category/:subcategory", subcategoryController.getAll);

export default router;
