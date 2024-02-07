class UserRepository {
    constructor({ dbRepository }) {
        this.userMoongoseRepository = dbRepository
        //this.userMoongoseRepository = dbRepository
    }
    async createNewUser(user) {
        return await this.userMoongoseRepository.createNewUser(user)
    }

    async updateUser(identifier, dataToUpdate) { }


    async getUserByField(field) {
        return await this.userMoongoseRepository.getUserByField(field)
    }

}


export default UserRepository