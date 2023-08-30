import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorLog, errorHandler } from "./middleware/errorHandler.js";

//Inicialization
dotenv.config();
const app = express();

//Other imports
import dbConnect from "./config/mongo.js";
import { indexRoutes } from "./routes/index.routes.js";

//Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

//Index routes
app.use("/api", indexRoutes());

//ErrorHandler
app.use(errorLog);
app.use(errorHandler);

//Running server
var server = app.listen(process.env.PORT || 3000, async () => {
  dbConnect();
  console.log("express server listening on port " + server.address().port);
});
