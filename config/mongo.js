import mongoose from "mongoose";

const db = () => {
  mongoose.connect(process.env.MONGO);
  const mongo = mongoose.connection;
  mongo.on("error", (err) => console.log(err));
  mongo.on("open", () => console.log("connected to MongoDB Atlas"));
  mongo.on("close", () => console.log("closed to MongoDB Atlas"));
};

export default db;
