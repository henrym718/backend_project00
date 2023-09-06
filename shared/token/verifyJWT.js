import jwt from "jsonwebtoken";
import createError from "http-errors"



const verifyJWT = (req, res, next) => {

  const authHeader = req.headers.autorization || req.headers.autorization
  try {
    if (!authHeader?.startswith('Bearer ')) throw createError.Unauthorized("Not authorized")
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWTSECRET, (err, payload) => {
      if (err) throw createError.Unauthorized("Not authorized")
      req.userId = payload.id
      next()
    })
  } catch (err) {
    next(err)
  }
}



export default verifyJWT