class UserController {
    constructor({ getCurrentUserByCookieUseCase, createUserUseCase }) {
        this.getCurrentUserByCookieUseCase = getCurrentUserByCookieUseCase
        this.createUserUseCase = createUserUseCase
        this.getCurrentUserByCookie = this.getCurrentUserByCookie.bind(this)
    }
    async getCurrentUserByCookie(req, res, next) {
        try {
            const result = await this.getCurrentUserByCookieUseCase.execute(req?.cookies)
            res.status(200).json(result)
        } catch (error) {
            res.status(404).json(error)
        }
    }

    async createUser(req, res, next) {
        try {
            const result = await this.createUserUseCase.execute(req.body, req.email)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

export default UserController