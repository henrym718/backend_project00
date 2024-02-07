class AuthRepository {
    constructor({ dbRepository }) {
        this.dbRepository = dbRepository;
    }

    async getAuthByfield(field) {
        return await this.dbRepository.getAuthByfield(field);
    }

    async updateData(identifier, dataToUpdate) {
        return await this.dbRepository.updateData(identifier, dataToUpdate);
    }

    async createNewRegisterAuth(data) {
        return await this.dbRepository.createNewRegisterAuth(data)
    }
}

export default AuthRepository
