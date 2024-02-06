class UserController {
    constructor({ getCurrentUserByCookieUseCase }) {
        this.getCurrentUserByCookieUseCase = getCurrentUserByCookieUseCase
        this.getCurrentUserByCookie = this.getCurrentUserByCookie.bind(this)
    }
    async getCurrentUserByCookie(req, res, next) {
        try {
            const result = await this.getCurrentUserByCookieUseCase.execute(req.cookies)
            res.status(200).json(result)
        } catch (error) {
            res.clearCookie("refreshToken")
            res.status(200).json(error)
        }
    }
}

export default UserController