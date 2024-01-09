import express from 'express';
import * as tagControler from "../controllers/tagController.js"


const router = express.Router();

router.get('/gettags', tagControler.allTags)


export default router