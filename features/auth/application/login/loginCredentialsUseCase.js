import AuthEntity from "../../domain/entities/authEntity.js"
import UserService from '../../../user/domain/services/userService.js'

class LoginCredentialsUseCase {
    constructor({ authService, tokenService }) {
        this.authService = authService
        this.tokenService = tokenService
        this.userService = new UserService()
    }
    async execute(credentials) {
        const { email, password } = credentials
        const userEntity = new AuthEntity(email, password)
        const auth = await this.authService.checkUserExistenceByfield({ email: userEntity.getEmail() })
        await this.authService.validatePasswords(userEntity.getPassword(), auth.password)

        /*crear RefreshToken para el usuario*/
        const payloadRefreshToken = { email: auth.email }
        userEntity.setRefreshToken(this.tokenService.createRfereshToken(payloadRefreshToken))

        /* agrego al registro su respectivo accestoken */
        const user = await this.userService.getUserByField({ email: userEntity.getEmail() })
        const payloadAccesToken = { email: auth.email, rol: user.rol }

        /*actualizo la entidad*/
        userEntity.setAccessToken(this.tokenService.createAccesToken(payloadAccesToken))
        /*actualizo el refreshtoken en la db*/
        this.authService.updateRefreshToken({ email: userEntity.getEmail() }, { refreshToken: userEntity.getRefreshToken() })

        return { accessToken: userEntity.getAccessToken(), refreshToken: userEntity.getRefreshToken() }
    }
}
export default LoginCredentialsUseCase

