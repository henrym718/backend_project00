class AuthController {
    constructor({ loginCredentialsUseCase, registerCredentialsUseCase }) {
        this.loginCredentialsUseCase = loginCredentialsUseCase;
        this.registerCredentialsUseCase = registerCredentialsUseCase;

    }

    async loginCredentials(req, res, next) {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = await this.loginCredentialsUseCase.execute({ email, password })
            res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000 })
            res.status(200).json({ token: accessToken })
        } catch (error) {
            next(error)
        }
    }

    async registerCredentials(req, res, next) {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = await this.registerCredentialsUseCase.execute({ email, password })
            res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000 })
            res.status(200).json({ token: accessToken })
        } catch (error) {
            next(error)
        }
    }
}

export default AuthController