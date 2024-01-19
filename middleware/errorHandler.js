import createError from "http-errors";
import CustomError from './customError.js';

function errorLog(err, req, res, next) {
  console.error("An error occurred:");
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  if (err instanceof createError.HttpError) {
    res.status(err.statusCode).json({ message: err.message });
  }
  else if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message });
  }
  else {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { errorLog, errorHandler };
