import jwt from "jsonwebtoken";
export const createAccesToken = (data) => jwt.sign(data, process.env.ACCESTOKEN, { expiresIn: "5s" });
export const createRefreshToken = (data) => jwt.sign(data, process.env.REFRESHTOKEN, { expiresIn: "1d" })
