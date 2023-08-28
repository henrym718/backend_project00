import jwt from "jsonwebtoken";
export const createToken = (data) => jwt.sign(data, process.env.JWTSECRET);
