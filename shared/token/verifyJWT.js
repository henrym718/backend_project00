import jwt from "jsonwebtoken";
import createError from "http-errors"

const verifyJWT = (req, _, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  try {
    if (!authHeader?.startsWith('Bearer ')) throw createError.Unauthorized("Not authorized")
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) throw createError.Unauthorized("Not authorized")
      req.userId = payload.id
      next()
    })
  } catch (err) {
    next(err)
  }
}



export default verifyJWT