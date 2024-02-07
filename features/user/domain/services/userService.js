class UserService {
    constructor({ userRepository }) {
        this.userRepository = userRepository
    }

    async createNewUser(user) {
        return await this.userRepository.createNewUser(user)
    }

    async getUserByField(field) {
        return await this.userRepository.getUserByField(field)
    }
}

export default UserService