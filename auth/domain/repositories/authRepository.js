class AuthRepository {
    constructor({ dbRepository }) {
        this.dbRepository = dbRepository;
    }

    async getUserByEmail(email) {
        return await this.dbRepository.getUserByEmail(email);
    }

    async updateRefreshToken(id, refreshToken) {
        return await this.dbRepository.updateRefreshToken(id, refreshToken);
    }



    // Otros métodos que puedan ser utilizados por AuthService
}

export default AuthRepository
