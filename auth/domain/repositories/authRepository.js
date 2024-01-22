class AuthRepository {
    constructor({ dbRepository }) {
        this.dbRepository = dbRepository;
    }

    async getUserByField(field) {
        return await this.dbRepository.getUserByField(field);
    }

    async updateData(identifier, dataToUpdate) {
        return await this.dbRepository.updateData(identifier, dataToUpdate);
    }

    async createNewRegisterAuth(data) {
        return await this.dbRepository.createNewRegisterAuth(data)
    }


    // Otros métodos que puedan ser utilizados por AuthService
}

export default AuthRepository
