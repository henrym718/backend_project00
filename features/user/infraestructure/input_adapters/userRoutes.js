import express from 'express';
const router = express.Router();
import { userContainer } from "../../../../config/dependencies/userContainer.js"
import { checkRole } from '../../../../middleware/routes/checkRole.js';
const userController = userContainer.resolve('userController');



router.get("/api/user/getuserbycookie", (req, res, next) => userController.getCurrentUserByCookie(req, res, next))
router.post("/api/user/createuser", checkRole(["BASICUSER", "COMPLETEUSER"]), (req, res, next) => userController.createUser(req, res, next))

export default router