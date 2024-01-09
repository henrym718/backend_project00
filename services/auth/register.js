import AuthModel from "../../models/authModel.js";
import bcrypt from "bcrypt";
import { createAccesToken, createRefreshToken } from "../../shared/token/create.js";
import createError from "http-errors";

class Register {
    async execute(credentials) {
        try {
            /*obtener la data*/
            const { email, password } = credentials

            /*verificar si el usuario existe*/
            const userExists = await AuthModel.findOne({ email })
            if (userExists) { throw createError.Conflict("User already exists") }

            /*encryptar contraseña*/
            const hash = bcrypt.hashSync(password, 5)

            /*crea el registro del nuevo usuario*/
            const auth = new AuthModel({ email, password: hash })

            /*crear AccesToken para el usuario*/
            const accessToken = createAccesToken({ id: auth.id })
            /*crear RefreshToken para el usuario*/
            const refreshToken = createRefreshToken({ id: auth.id })
            /* agrego al registro su respectivo accestoken */
            auth.refreshToken = refreshToken

            /* guardo la en la bd el nuevo registo */
            await auth.save()

            /*retornar el token*/
            return { accessToken, refreshToken }
        } catch (err) {
            throw err
        }
    }
}
export default Register;
