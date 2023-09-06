import express from "express"
import *as refreshTokenController from "../controllers/refreshTokenController.js"

const router = express.Router()

router.get("/refresh", refreshTokenController.refreshToken)


export default router


