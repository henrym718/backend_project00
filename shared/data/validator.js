import joi from "joi";
export const validator = (schema) => {
  return (req, res, next) => {
    try {
      req.body = joi.attempt(req.body, schema, { abortEarly: true, stripUnknown: true })
      next();
    } catch (error) {
      next(error)
    }
  };
};
