import express from "express";
import * as uploadControler from "../controllers/upload.controller.js";
import { upload } from "../shared/images/multer.js";

const router = express.Router();

router.post("/cargaravatar", upload.single("avatar"), uploadControler.cargarAvatar);
router.post("/cargarimagenes", upload.array("images", 3), uploadControler.cargarImages);

export default router;
