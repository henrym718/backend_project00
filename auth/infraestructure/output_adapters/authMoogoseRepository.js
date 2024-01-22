
class AuthMoogoseRepository {
    constructor({ model }) {
        this.authModel = model;
    }

    async getUserByEmail(email) {
        return await this.authModel.findOne({ email })
    }

    async updateRefreshToken(idAuth, newRefreshToken) {
        await this.authModel.updateOne({ _id: idAuth }, { $set: { refreshToken: newRefreshToken } })
    }

    async createNewRegisterAuth(email, password, refreshToken) {
        await this.authModel.create({ email: email, password: password, refreshToken: refreshToken })
    }

}

export default AuthMoogoseRepository