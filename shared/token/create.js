import jwt from "jsonwebtoken";
export const createAccesToken = (data) => jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
export const createRefreshToken = (data) => jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })
