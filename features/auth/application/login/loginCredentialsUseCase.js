import AuthEntity from "../../domain/entities/authEntity.js"

class LoginCredentialsUseCase {
    constructor({ authService, tokenService }) {
        this.authService = authService
        this.tokenService = tokenService
    }
    async execute(credentials) {
        const { email, password } = credentials
        const userEntity = new AuthEntity(email, password)
        const user = await this.authService.checkUserExistenceByfield({ email: userEntity.getEmail() })
        await this.authService.validatePasswords(userEntity.getPassword(), user.password)
        const payloadToken = { email: user.email }
        userEntity.setRefreshToken(this.tokenService.createRfereshToken(payloadToken))
        userEntity.setAccessToken(this.tokenService.createAccesToken(payloadToken))
        this.authService.updateRefreshToken({ email: userEntity.getEmail() }, { refreshToken: userEntity.getRefreshToken() })
        return { accessToken: userEntity.getAccessToken(), refreshToken: userEntity.getRefreshToken() }
    }
}
export default LoginCredentialsUseCase
