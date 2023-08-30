import jwt from "jsonwebtoken";
import createError from "http-errors"

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) { throw createError.Unauthorized("Not authorized") }
    jwt.verify(token, process.env.JWTSECRET, (err, payload) => {
      if (err) throw createError.NotAcceptable("Token not available");
      req.userId = payload.id;
      next();
    });
  } catch (err) {
    next(err)
  }
};
