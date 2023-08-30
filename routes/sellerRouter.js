import express from "express";
import * as sellerController from "../controllers/sellerController.js"
import { upload } from "../shared/images/multer.js"
import { verifyToken } from "../shared/token/verify.js"
import { validator } from "../shared/data/validator.js"
import { sellerProfileSchema } from "../shared/data/schemas.js"

const router = express.Router()


router.get("/getsellerbytoken", verifyToken, sellerController.getSellerByToken)
router.post("/createsellerprofile", verifyToken, upload.single("avatar"), validator(sellerProfileSchema, "body"), sellerController.createSellerProfile)



export default router