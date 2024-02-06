import express from 'express';
import UserController from "./userController.js"

const userController = new UserController()


const router = express.Router();

router.get("/api/user/getuserbycookie", (req, res, next) => userController.getCurrentUserByCookie(req, res, next))

export default router