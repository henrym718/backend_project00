import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).send("You are not Authorized");
  jwt.verify(token, process.env.JWTSECRET, (err, payload) => {
    if (err) return res.status(403).send("Token not valid");
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
