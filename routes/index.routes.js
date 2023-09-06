import express from "express";
import authRouter from "./authRouter.js";
import sellerRouter from "./sellerRouter.js"
import uploadRouter from "./upload.router.js";
import categoryRouter from "./categoryRouter.js";
import subcategoryRouter from "./subcategory.router.js";
import gigRouter from "./gigRouter.js";
import refresTokenRouter from "./refreshTokenRouter.js";

export const indexRoutes = () => {
  const router = express.Router();

  router.use("/auth", authRouter);
  router.use("/seller", sellerRouter)
  router.use("/category", categoryRouter);
  router.use("/subcategory", subcategoryRouter);
  router.use("/gig", gigRouter);
  router.use("/token", refresTokenRouter);

  //router.use("/api/image", uploadRouter);
  //router.use("/api/categories", gigRouter);


  return router;
};
