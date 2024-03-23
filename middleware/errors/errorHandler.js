import joi from "joi"
import createError from "http-errors";
import jwt from "jsonwebtoken"
import multer from "multer";


function errorLog(err, req, res, next) {
  console.error("An error occurred:")
  console.error(err?.details ?? err)
  next(err)
}

function errorHandler(err, req, res, next) {
  if (err instanceof joi.ValidationError) {
    const erroMessages = err.details.map((e) => e.message)
    const parseErrorMessage = erroMessages[0].replace(/"/g, "")
    return res.status(403).json({ error: true, message: parseErrorMessage })
  }
  if (err instanceof jwt.JsonWebTokenError) {
    res.clearCookie("refreshToken")
    return res.status(401).json({ "accessToken": null })
  }
  if (err instanceof createError.HttpError) {
    return res.status(err.status).json({ error: true, message: err.message })
  }
  else {
    return res.status(500).json({ message: "Internal Server Error" })
  }
}
export { errorLog, errorHandler };
