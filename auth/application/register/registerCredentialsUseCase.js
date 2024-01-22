import AuthEntity from "../../domain/entities/authEntity.js"

class RegisterCredentialsUseCase {
    constructor({ authService, tokenService }) {
        this.authService = authService
        this.tokenService = tokenService
    }

    async execute(credentials) {
        try {
            /*obtener la data*/
            const { email, password } = credentials
            const userEntity = new AuthEntity(email, password)

            /*comprobar que el usuario no exista para poder continuar*/
            await this.authService.checkUserNoExistenceByEmail(userEntity.getEmail())

            /*encryptar contraseña*/
            const passwordEncrypted = this.authService.encryptPasswords(userEntity.getPassword())

            /*actualizo la entidad*/
            userEntity.setPassword(passwordEncrypted)

            /*crear AccesToken para el usuario*/
            const payloadToken = { email: userEntity.getEmail() }
            userEntity.setAccessToken(this.tokenService.createAccesToken(payloadToken))

            /*crear RefreshToken para el usuario*/
            userEntity.setRefreshToken(this.tokenService.createRfereshToken(payloadToken))

            /* agrego al registro su respectivo accestoken */
            await this.authService.createNewRegisterAuth(userEntity.getEmail(), userEntity.getPassword(), userEntity.getRefreshToken())

            /*retornar el token*/
            return { accessToken: userEntity.getAccessToken(), refreshToken: userEntity.getRefreshToken() }
        } catch (err) {
            throw err
        }
    }
}
export default RegisterCredentialsUseCase;
