import User from "../models/userModel.js";
import { cargarImageS3, obtenerImageS3 } from "../shared/images/aws_s3.js";
import { createToken } from "../shared/token/create.js";
import createError from "http-errors";
import path from "path";
import fs from "fs-extra";
import bcrypt from "bcrypt";

class Auth {
  async register(data) {
    try {
      //obtener la data
      const { email, password, avatar: pathAvatar, ...others } = data;

      //verificar si el usuario existe
      const userExists = await User.findOne({ email });
      if (userExists) throw createError.Conflict("User already exists");

      //subir imagen a S3 de AWS
      const fileNameAvatar = path.basename(pathAvatar);
      await cargarImageS3(pathAvatar, fileNameAvatar);
      await fs.unlink(pathAvatar);
      const urlAvatar = await obtenerImageS3(fileNameAvatar);

      //encryptar contraseña
      const hash = bcrypt.hashSync(password, 5);

      //Crear usuario en la base de datos
      const user = await User.create({
        password: hash, email, avatar: { uri: urlAvatar, tag: fileNameAvatar }, ...others
      });

      //crear Token para el usuario
      const token = createToken({ id: user._id, isSeller: user.isSeller });

      //retornar valores
      return { token, user };
    } catch (err) {
      throw err;
    }
  }

  async login(data) {
    try {
      //Obtener data
      const { email, password } = data;

      //Verificar si usuario existe en la base de datos
      const user = await User.findOne({ email: email });
      if (!user) { throw createError.NotFound("User not found") }

      //Validar contraseñas
      const validatePasswords = bcrypt.compareSync(password, user.password);
      if (!validatePasswords) { throw createError.Unauthorized("Passwords do not match") }

      //Crear Token
      const token = createToken({ id: user._id, isSeller: user.isSeller });

      //Responder al cliente
      return { token, user };
    } catch (err) {
      throw err;
    }
  }
}

export default Auth;
