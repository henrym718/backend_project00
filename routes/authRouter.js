import express from "express";
import * as authController from "../controllers/authController.js";
import { validator } from "../shared/data/validator.js";
import { authSchema, loginSchema } from "../shared/data/schemas.js";

const router = express.Router();

router.post("/register", validator(authSchema, "body"), authController.register);
router.post("/login", validator(loginSchema, "body"), authController.login);
router.get("/logout", authController.logout);

export default router;
