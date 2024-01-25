class RefreshTokenUseCase {
    constructor({ authService, tokenService }) {
        this.authService = authService
        this.tokenService = tokenService
    }

    async execute(cookie) {
        try {
            const token = cookie?.refreshToken
            if (!token) { return { accessToken: null, refreshToken: null } }
            await this.tokenService.verifyToken(token)
            const user = await this.authService.checkUserExistenceByfield({ refreshToken: token })
            const payload = { email: user.email }
            const refreshToken = this.tokenService.createRfereshToken(payload)
            const accessToken = this.tokenService.createAccesToken(payload)
            await this.authService.updateRefreshToken({ email: user.email }, { refreshToken })
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