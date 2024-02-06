import User from "./userMoogoseModel.js"
class UserMoogoseRepository {
    constructor() {
        this.userModel = User
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