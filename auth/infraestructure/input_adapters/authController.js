
class AuthController {
    constructor({ loginCredentialsUseCase }) {
        this.loginCredentialsUseCase = loginCredentialsUseCase;
        this.loginCredential = this.loginCredentials.bind(this)
    }

    async loginCredentials(req, res, next) {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = await this.loginCredentialsUseCase.execute({ email, password })
            res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000 })
            res.status(200).json({ token: accessToken })
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController