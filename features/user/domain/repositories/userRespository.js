class UserRepository {
    constructor({ dbRepository }) {
        this.userMoongoseRepository = dbRepository
    }
    async createNewUser(user) {
        return await this.userMoongoseRepository.createNewUser(user)
    }

    async getUserByField(field) {
        return await this.userMoongoseRepository.getUserByField(field)
    }

}


export default UserRepository