import UserService from '../../../user/domain/services/userService.js'


class RefreshTokenUseCase {
    constructor({ authService, tokenService }) {
        this.authService = authService
        this.tokenService = tokenService
        this.userService = new UserService()
    }

    async execute(cookie) {
        try {
            /*verifico si no existe una cookie */
            const token = cookie?.refreshToken
            if (!token) { return { accessToken: null, refreshToken: null } }

            /*verifico si la cookie es valida */
            await this.tokenService.verifyToken(token)

            /*verifico si no existe el auth que corresponde a la cookie */
            const auth = await this.authService.getUserbyfield({ refreshToken: token })
            if (!auth) { return { accessToken: null, refreshToken: null } }

            /*crear RefreshToken para el usuario*/
            const payloadRefreshToken = { email: auth.email }
            const refreshToken = this.tokenService.createRfereshToken(payloadRefreshToken)

            /* agrego al registro su respectivo accestoken */
            const user = await this.userService.getUserByField({ email: auth.email })
            const payloadAccessToken = { email: user.email, rol: user.rol }
            const accessToken = this.tokenService.createAccesToken(payloadAccessToken)

            /*actualizo el nuevo refreshToken en la bd */
            await this.authService.updateRefreshToken({ email: auth.email }, { refreshToken })
            return { accessToken, refreshToken }
        } catch (err) {
            throw err
        }
    }
}
export default RefreshTokenUseCase


/*
*RefrehToken >> SE ENVIA LA COOKIE
 * AL iniciar la app, se hace una llamada al servido a la ruta
 * refreshToken recibe una cookie, se verifica si hay algun usuario en auth con esa cookie 
 * si existe usuario se crear un nuevo accessToken(email del usuario) y se crear un nuevo refreshToken
 * se actualiza la db con el nuevo refheshToken
 * respondo una nueva cookie con mas tiempo y nuevo refreshToken
 * repondo con un json con el nuevo accessToken 
 * 
 *  * si no exite la cookie
 * rrespondo con un objeto accessToken = null y ni envio ninguca cookie  
 * Resumen>>> refrehToken >> repsonde con una cookie(refresjToken) y con un json con el accessToken
 *                           si no existe envia un objeto con accessToken null   */