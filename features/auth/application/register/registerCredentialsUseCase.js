import AuthEntity from "../../domain/entities/authEntity.js"


class RegisterCredentialsUseCase {
    constructor({ authService, tokenService, userService }) {
        this.authService = authService
        this.tokenService = tokenService
        this.userService = userService
    }

    async execute(credentials) {
        try {
            /*obtener la data*/
            const { email, password } = credentials
            const userEntity = new AuthEntity(email, password)

            /*comprobar que el usuario no exista para poder continuar*/
            await this.authService.checkUserNoExistenceByField({ email: userEntity.getEmail() })

            /*encryptar contraseña*/
            const passwordEncrypted = this.authService.encryptPasswords(userEntity.getPassword())

            /*actualizo la entidad*/
            userEntity.setPassword(passwordEncrypted)

            /*crear AccesToken para el usuario*/
            const payloadAccessToken = { email: userEntity.getEmail(), rol: "REGISTERED" }
            userEntity.setAccessToken(this.tokenService.createAccesToken(payloadAccessToken))

            /*crear RefreshToken para el usuario*/
            const payloadRefreshToken = { email: userEntity.getEmail() }
            userEntity.setRefreshToken(this.tokenService.createRfereshToken(payloadRefreshToken))

            /* agrego al registro su respectivo accestoken */
            await this.authService.createNewRegisterAuth({ email: userEntity.getEmail(), password: userEntity.getPassword(), refreshToken: userEntity.getRefreshToken() })

            /*creo el nuevo usuario con su email y su rol en la db user*/
            await this.userService.createNewUser({ email: userEntity.getEmail(), rol: "REGISTERED" })

            /*retornar el token*/
            return { accessToken: userEntity.getAccessToken(), refreshToken: userEntity.getRefreshToken() }
        } catch (err) {
            throw err
        }
    }
}
export default RegisterCredentialsUseCase;
