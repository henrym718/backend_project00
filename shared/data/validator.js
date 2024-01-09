import joi from "joi";
import createError from "http-errors";

export const validator = (schema, property) => {
  return (req, res, next) => {
    try {

      const data = req[property];
      const params = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
      };
      joi.attempt(data, schema, params);
      next();
    } catch (err) {
      const errMessages = err.details.map((e) => e.message); // Obtén todos los mensajes de error de Joi
      const joiMessages = errMessages.join("; "); // Concatena los mensajes en uno solo
      next(createError.BadRequest(joiMessages));
    }
  };
};
