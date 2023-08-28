import createError from "http-errors";

function errorLog(err, req, res, next) {
  console.error("An error occurred:");
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  if (err instanceof createError.HttpError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { errorLog, errorHandler };
