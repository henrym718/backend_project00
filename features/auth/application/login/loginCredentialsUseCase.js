import AuthEntity from "../../domain/entities/authEntity.js"
import createError from "http-errors"


class LoginCredentialsUseCase {
    constructor({ authService, tokenService, userService }) {
        this.authService = authService
        this.tokenService = tokenService
        this.userService = userService
    }
    async execute(credentials) {
        const { email, password } = credentials
        const userEntity = new AuthEntity(email, password)

        /*verifico si ya existe un usuario*/
        const auth = await this.authService.getAuthByfield({ email: userEntity.getEmail() })
        if (!auth) { throw createError.NotFound("Usuario no encontrado") }

        /*valido la password*/
        const passwordsMatch = await this.authService.validatePasswords(userEntity.getPassword(), auth.password)
        if (!passwordsMatch) { throw createError.BadRequest("Contraseña incorrecta") }

        /*crear RefreshToken para el usuario*/
        const payloadRefreshToken = { email: auth.email }
        userEntity.setRefreshToken(this.tokenService.createRfereshToken(payloadRefreshToken))

        /*actualizo el refreshtoken en la db*/
        const response = this.authService.updateRefreshToken({ email: userEntity.getEmail() }, { refreshToken: userEntity.getRefreshToken() })
        if (!response) { throw createError(404, "Error de base de datos al actualizar el refreshToken") }

        return { refreshToken: userEntity.getRefreshToken() }
    }
}
export default LoginCredentialsUseCase

