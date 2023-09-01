import express from "express";
import * as subcategoryController from "../controllers/subcategory.controller.js";
import { validator } from "../shared/data/validator.js"
import { createSubcategorySchema } from "../shared/data/schemas.js"

const router = express.Router();

router.post("/createnewsubcategory", validator(createSubcategorySchema, "body"), subcategoryController.createNewSubcategory);


export default router;
