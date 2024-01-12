import Auth from "../../entities/auth-entity.js"
import { comparePasswords } from "../../validators/auth-validator.js"
import { createAccesToken, createRefreshToken } from "../../shared/create-tokens.js"

class Login_with_credentials {
    constructor(auth_repository) {
        this.auth_repository = auth_repository
    }

    async execute(credentials) {
        try {
            /*obtener data*/
            const { email, password } = credentials
            const clientAuth = new Auth(email, password)

            /*verificar si usuario existe en la base de datos*/
            const databaseAuth = await this.auth_repository.getUserByEmail({ email: clientAuth.getEmail() })
            if (!databaseAuth) { throw createError.NotFound("User not found") }

            /*validar contraseñas*/
            const passwordsMatch = comparePasswords(databaseAuth.password, clientAuth.getPassword())
            if (!passwordsMatch) { throw createError.Unauthorized("Passwords do not match") }

            /*crear AccesToken para el usuario*/
            const accessToken = createAccesToken({ id: authUser.id })
            /*crear RefreshToken para el usuario*/
            const refreshToken = createRefreshToken({ id: authUser.id })

            /*parseo la entidad auth*/
            clientAuth.setRefreshToken(refreshToken)
            clientAuth.setId(databaseAuth._id)

            /*actualiza la base de datos con el nuevo refresToken*/
            await this.auth_repository.updateRefreshToken(clientAuth.getId(), clientAuth.getRefreshToken())

            /*retornar el token*/
            return { accessToken, refreshToken }
        } catch (err) {
            throw err
        }
    }

}

export default Login_with_credentials
