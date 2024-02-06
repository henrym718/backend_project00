import express from 'express';
const router = express.Router();
import { userContainer } from "../../../../config/dependencies/userContainer.js"
const userController = userContainer.resolve('userController');



router.get("/api/user/getuserbycookie", (req, res, next) => userController.getCurrentUserByCookie(req, res, next))

export default router