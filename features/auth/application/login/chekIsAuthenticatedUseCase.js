class ChekIsAuthenticatedUseCase {
    constructor({ authService }) {
        this.authService = authService
    }

    async execute(email) {
        console.log({ email })
        const auth = await this.authService.getAuthByfield({ email })
        console.log(auth)
        if (auth) {
            return { autheticate: true }
        } else {
            return { autheticate: false }
        }
    }

}
export default ChekIsAuthenticatedUseCase