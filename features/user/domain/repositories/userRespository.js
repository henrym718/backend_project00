import UserMoongoseRepository from "../../infraestructure/output_adapters/userMoogoseRepository.js"

class UserRepository {
    constructor() {
        this.userMoongoseRepository = new UserMoongoseRepository()
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