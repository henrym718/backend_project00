import bcrypt from 'bcrypt';

class AuthService {
    constructor({ authRepository }) {
        this.authRepository = authRepository;
    }

    async getAuthByfield(field) {
        return await this.authRepository.getAuthByfield(field)
    }

    async updateRefreshToken(identifier, refreshToken) {
        return await this.authRepository.updateData(identifier, refreshToken)
    }

    async createNewRegisterAuth(data) {
        return await this.authRepository.createNewRegisterAuth(data)
    }

    encryptPasswords(password) {
        return bcrypt.hashSync(password, 10)
    }

    validatePasswords(password, passwordEncrypted) {
        return bcrypt.compareSync(password, passwordEncrypted)
    }
}

export default AuthService

