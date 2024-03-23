class RefreshTokenUseCase {
    constructor({ authService, tokenService, userService }) {
        this.authService = authService
        this.tokenService = tokenService
        this.userService = userService
    }

    async execute(cookie) {
        /*verifico si no existe una cookie */
        const token = cookie?.refreshToken
        if (!token) return { accessToken: null, refreshToken: null }

        /*Obtengo la data del usuario segun su refreshToken */
        const auth = await this.authService.getAuthByfield({ refreshToken: token })

        //podria decodificar el token {email} y comparlo con el auth.email

        /*crear RefreshToken para el usuario*/
        const payloadRefreshToken = { email: auth.email }
        const refreshToken = await this.tokenService.createRfereshToken(payloadRefreshToken)

        /* agrego al registro su respectivo accestoken */
        const user = await this.userService.getUserByField({ email: auth.email })
        const payloadAccessToken = { email: user.email, rol: user.rol, user: user._id }
        const accessToken = await this.tokenService.createAccesToken(payloadAccessToken)

        /*actualizo el nuevo refreshToken en la bd */
        const responseUpdate = await this.authService.updateRefreshToken({ email: auth.email }, { refreshToken })
        if (!responseUpdate) { throw createError.NotFound("Error de base de datos al actualizar el refreshToken") }

        return { accessToken, refreshToken }

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