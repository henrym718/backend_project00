class UserMoogoseRepository {
    constructor({ model }) {
        this.userModel = model
    }

    async createNewUser(user) {
        return await this.userModel.create(user)
    }

    async getUserByField(field) {
        return await this.userModel.findOne(field);
    }

    async updateUser(identifier, dataToUpdate) {
        return await this.userModel.updateOne(identifier, { $set: { dataToUpdate } })
    }

}

export default UserMoogoseRepository