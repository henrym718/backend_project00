import Auth from "./auth-moogose-model.js"

class Auth_moongose_repository {
    constructor() {
        this.model = Auth;
    }

    async getUserByEmail(email) {
        return await this.model.findOne({ email })
    }

    async updateRefreshToken(idAuth, newRefreshToken) {
        return await this.model.updateOne({ _id: idAuth }, { $set: { refreshToken: newRefreshToken } })
    }


}

export default Auth_moongose_repository