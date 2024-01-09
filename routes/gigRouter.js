import express from "express";
import * as gigController from "../controllers/gig.controller.js";
import verifyJWT from "../shared/token/verifyJWT.js";
import { upload } from "../shared/images/multer.js"
import { validator } from "../shared/data/validator.js";
import { gigSchema } from "../shared/data/schemas.js";

const router = express.Router();

router.post("/creategig", verifyJWT, upload.array("images", 3), gigController.createNewGig);


router.get("/:subcategory?", gigController.getGigsBySubCategoryOrFilters);
router.get("/v1/:email/:service?", gigController.getGigByUserOrNameService);

//router.get("/:category/:subcategory", gigController.);


export default router;
