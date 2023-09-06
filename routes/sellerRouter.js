import express from "express";
import * as sellerController from "../controllers/sellerController.js"
import { upload } from "../shared/images/multer.js"
import verifyJWT from "../shared/token/verifyJWT.js";
import { validator } from "../shared/data/validator.js"
import { sellerProfileSchema } from "../shared/data/schemas.js"

const router = express.Router()


router.get("/getsellerbytoken", verifyJWT, sellerController.getSellerByToken)
router.post("/createsellerprofile", verifyJWT, upload.single("avatar"), validator(sellerProfileSchema, "body"), sellerController.createSellerProfile)



export default router