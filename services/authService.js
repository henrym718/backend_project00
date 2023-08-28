import AuthModel from "../models/authModel.js";
import bcrypt from "bcrypt";
import { createToken } from "../shared/token/create.js";
import createError from "http-errors";


class Auth {

  async register(credentials) {
    try {
      //obtener la data
      const { email, password } = credentials

      //verificar si el usuario existe
      const userExists = await AuthModel.findOne({ email })
      console.log(userExists)
      if (userExists) { throw createError.Conflict("User already exists") }

      //encryptar contraseña
      const hash = bcrypt.hashSync(password, 5)

      //crea el registro en la base de datos
      const auth = await AuthModel.create({ email, password: hash })

      //crear Token para el usuario
      const token = createToken({ id: auth.id })

      //crear Token para el usuario
      return token
    } catch (err) {
      throw err
    }
  }

  async login(credentials) {
    try {
      //Obtener data
      const { email, password } = credentials;

      //Verificar si usuario existe en la base de datos
      const user = await AuthModel.findOne({ email: email });
      if (!user) { throw createError.NotFound("User not found") }

      //Validar contraseñas
      const validatePasswords = bcrypt.compareSync(password, user.password);
      if (!validatePasswords) { throw createError.Unauthorized("Passwords do not match") }

      //Crear Token
      const token = createToken({ id: user.id });

      //Responder al cliente
      return token;
    } catch (err) {
      throw err;
    }
  }

  async logout(res) {
    res.clearCookie("accessToken", { sameSite: "none", secure: true }).status(200).send("User has been logged out")
  }
}

export default Auth;
