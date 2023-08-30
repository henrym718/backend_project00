import express from "express";
import * as subcategoryController from "../controllers/subcategory.controller.js";

const router = express.Router();

router.post("/createnewsubcategory", subcategoryController.createNewSubcategory);


export default router;
