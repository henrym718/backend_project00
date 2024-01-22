import joi from "joi"
import createError from "http-errors";

function errorLog(err, req, res, next) {
  console.error("An error occurred:")
  console.error(err?.details ?? err)
  next(err)
}

function errorHandler(err, req, res, next) {
  if (err instanceof joi.ValidationError) {
    const erroMessages = err.details.map((e) => e.message)
    const parseErrorMessage = erroMessages[0].replace(/"/g, "")
    res.status(403).json({ error: true, message: parseErrorMessage })
  }

  if (err instanceof createError.HttpError) {
    res.status(err.statusCode).json({ error: true, message: err.message })
  }
  else {
    res.status(500).json({ message: "Internal Server Error" })
  }
}
export { errorLog, errorHandler };
