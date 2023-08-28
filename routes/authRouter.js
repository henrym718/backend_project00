import express from "express";
import * as authController from "../controllers/authController.js";
import { validator } from "../shared/data/validator.js";
import { userSchema, loginSchema } from "../shared/data/schemas.js";

const router = express.Router();

router.post(
  "/register",
  validator(userSchema, "body"),
  authController.register
);
router.post("/login", validator(loginSchema, "body"), authController.login);

export default router;
