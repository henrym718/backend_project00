import createError from "http-errors"
import bcrypt from 'bcrypt';

class AuthService {
    constructor({ authRepository }) {
        this.authRepository = authRepository;
    }

    async getUserByEmail(email) {
        return await this.authRepository.getUserByEmail(email)
    }

    async checkUserExistenceByEmail(email) {
        const user = await this.getUserByEmail(email)
        if (!user) { throw createError.NotFound("Usuario no registrado") }
        return user
    }

    async checkUserNoExistenceByEmail(email) {
        const user = await this.getUserByEmail(email)
        if (user) { throw createError.NotFound("Usuario registrado") }
    }

    async updateRefreshToken(id, newRefreshToken) {
        await this.authRepository.updateRefreshToken(id, newRefreshToken)
    }

    async createNewRegisterAuth(email, password, refreshToken) {
        await this.authRepository.createNewRegisterAuth(email, password, refreshToken)
    }

    encryptPasswords(password) {
        return bcrypt.hashSync(password, 10)
    }

    validatePasswords(password, passwordEncrypted) {
        const passwordsMatch = bcrypt.compareSync(password, passwordEncrypted)
        if (!passwordsMatch) { throw createError.BadRequest("Contraseña incorrecta") }
    }
}

export default AuthService

