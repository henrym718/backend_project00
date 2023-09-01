import express from "express";
import * as gigController from "../controllers/gig.controller.js";
import { verifyToken } from "../shared/token/verify.js";
import { upload } from "../shared/images/multer.js"
import { validator } from "../shared/data/validator.js";
import { gigSchema } from "../shared/data/schemas.js";

const router = express.Router();

router.post("/creategig", verifyToken, upload.array("images", 3), validator(gigSchema, "body"), gigController.createNewGig);



router.get("/:subcategory?", gigController.getGigsBySubCategoryOrFilters);
router.get("/v1/:email/:service?", gigController.getGigByUserOrNameService);

//router.get("/:category/:subcategory", gigController.);


export default router;
