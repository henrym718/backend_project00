class LogoutUseCase {
    constructor({ authService }) {
        this.authService = authService;
    }
    async execute(req) {
        /**verifico si hay un token en la cookie, sino mando error */
        const token = this.authService.checkRefreshTokenExists(req)
        /**obtengo el usuario correspondiente al refreshToken */
        //const user = this.authService.getUserbyToken({ refreshToken: token })
        /**libero el token del usuario */
        this.authService.updateRefreshToken({ refreshToken: token }, { refreshToken: null })
    }
}

export default LogoutUseCase