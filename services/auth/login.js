import AuthModel from "../../models/authModel.js";
import bcrypt from "bcrypt";
import { createAccesToken, createRefreshToken } from "../../shared/token/create.js";
import createError from "http-errors";


class Login {
    async execute(credentials) {
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
}

export default Login;
