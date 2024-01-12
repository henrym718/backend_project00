// Dominio/puertos/repositorios/AuthRepositoryInterface.js
class Auth_repository {
    constructor(repository) {
        this.repository = repository;
    }
    async getUserByEmail(email) {
        return await this.repository.getUserByEmail(email);
    }

    async updateRefreshToken(id, refreshToken) {
        return await this.repository.updateRefreshToken(id, refreshToken);
    }



    // Otros métodos que puedan ser utilizados por AuthService
}

export default Auth_repository
