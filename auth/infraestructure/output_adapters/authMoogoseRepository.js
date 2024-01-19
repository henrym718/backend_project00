
class AuthMoogoseRepository {
    constructor({ model }) {
        this.authModel = model;
    }

    async getUserByEmail(email) {
        return await this.authModel.findOne({ email })
    }

    async updateRefreshToken(idAuth, newRefreshToken) {
        return await this.authModel.updateOne({ _id: idAuth }, { $set: { refreshToken: newRefreshToken } })
    }
}

export default AuthMoogoseRepository