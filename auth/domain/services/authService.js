import createError from "http-errors"
import bcrypt from 'bcrypt';

class AuthService {
    constructor({ authRepository }) {
        this.authRepository = authRepository;
    }

    async checkUserExistenceByEmail(email) {
        const user = await this.authRepository.getUserByEmail(email)
        if (!user) { throw createError.NotFound("Usuario no registrado") }
        return user
    }
    async updateRefreshToken(id, newRefreshToken) {
        await this.authRepository.updateRefreshToken(id, newRefreshToken)
    }

    validatePasswords(password, passwordEncrypted) {
        const passwordsMatch = bcrypt.compareSync(password, passwordEncrypted)
        if (!passwordsMatch) { throw createError.BadRequest("Contraseña incorrecta") }
    }
}

export default AuthService

