import UserRepository from '../repositories/userRespository.js'

class UserService {
    constructor() {
        this.userRepository = new UserRepository()
    }

    async createNewUser(user) {
        const result = await this.userRepository.createNewUser(user)
        if (!result) { throw createError.BadGateway("Error de base de datos al crear el registro") }
        return result
    }

    async getUserByField(field) {
        return await this.userRepository.getUserByField(field)
    }


}
export default UserService