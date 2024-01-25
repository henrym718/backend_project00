class LogoutUseCase {
    constructor({ authService }) {
        this.authService = authService;
    }
    async execute(cookie) {
        /**verifico si hay un token en la cookie, sino mando error */
        const token = this.authService.checkRefreshTokenExists(cookie)
        /**libero el token del usuario */
        this.authService.updateRefreshToken({ refreshToken: token }, { refreshToken: null })
    }
}

export default LogoutUseCase