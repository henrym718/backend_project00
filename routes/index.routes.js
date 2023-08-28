import express from "express";
import authRouter from "./authRouter.js";
import uploadRouter from "./upload.router.js";
import categoryRouter from "./categoryRouter.js";
import subcategoryRouter from "./subcategory.router.js";
import gigRouter from "./gigRouter.js";

export const indexRoutes = () => {
  const router = express.Router();

  router.use("/api/auth", authRouter);
  router.use("/api/image", uploadRouter);
  router.use("/api", categoryRouter);
  router.use("/api/subcategory", subcategoryRouter);
  //router.use("/api/categories", gigRouter);

  router.use("/api/gigs", gigRouter);

  return router;
};
