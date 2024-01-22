
class AuthMoogoseRepository {
    constructor({ model }) {
        this.authModel = model;
    }

    async getUserByField(field) {
        return await this.authModel.findOne(field)
    }

    async updateData(identifier, dataToUpdate) {
        return await this.authModel.updateOne(identifier, { $set: dataToUpdate })
    }

    async createNewRegisterAuth(data) {
        return await this.authModel.create(data)
    }

}

export default AuthMoogoseRepository