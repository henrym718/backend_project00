import AuthModel from "../models/authModel.js";
import bcrypt from "bcrypt";
import { createAccesToken, createRefreshToken } from "../shared/token/create.js";
import createError from "http-errors";


class Auth {

  async register(credentials) {
    try {
      /*obtener la data*/
      const { email, password } = credentials

      /*verificar si el usuario existe*/
      const userExists = await AuthModel.findOne({ email })
      console.log(userExists)
      if (userExists) { throw createError.Conflict("User already exists") }

      /*encryptar contraseña*/
      const hash = bcrypt.hashSync(password, 5)


      /*crear AccesToken para el usuario*/
      const accessToken = createAccesToken({ id: auth.id })
      /*crear RefreshToken para el usuario*/
      const refreshToken = createRefreshToken({ id: auth.id })

      /*crea el registro en la base de datos*/
      const auth = await AuthModel.create({ email, password: hash, refreshToken })

      /*retornar el token*/
      return { accessToken, refreshToken }
    } catch (err) {
      throw err
    }
  }

  async login(credentials) {
    try {
      /*obtener data*/
      const { email, password } = credentials;

      /*verificar si usuario existe en la base de datos*/
      const user = await AuthModel.findOne({ email: email });
      if (!user) { throw createError.NotFound("User not found") }

      /*validar contraseñas*/
      const validatePasswords = bcrypt.compareSync(password, user.password);
      if (!validatePasswords) { throw createError.Unauthorized("Passwords do not match") }


      /*crear AccesToken para el usuario*/
      const accessToken = createAccesToken({ id: user.id })
      /*crear RefreshToken para el usuario*/
      const refreshToken = createRefreshToken({ id: user.id })

      //actualiza la base de datos con el nuevo refresToken
      user.refreshToken = refreshToken
      await user.save()

      /*retornar el token*/
      return { accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  }

  async logout(res) {
    const cookie = res.cookie
    if (!cookie?.jwt) throw createError(204, "token not found")
    const refreshToken = cookie.jwt
    const user = await AuthModel.findOne({ refreshToken }).exec()
    if (!user) {
      res.clearCookie("accessToken", { sameSite: "none", sameSite: "none", secure: true }).status(200).send("User has been logged out")
      throw createError(204, "token not found")
    }
    user.refreshToken = ""
    await user.save()
    res.clearCookie("accessToken", { sameSite: "none", sameSite: "none", secure: true })
    res.status(204).send("User has been logged out")
  }
}

export default Auth;
