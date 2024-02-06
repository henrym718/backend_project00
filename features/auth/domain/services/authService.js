import createError from "http-errors"
import bcrypt from 'bcrypt';

class AuthService {
    constructor({ authRepository }) {
        this.authRepository = authRepository;
    }

    async checkUserExistenceByfield(field) {
        const user = await this.authRepository.getUserByField(field)
        if (!user) { throw createError.NotFound("Usuario no encontrado") }
        return user
    }

    async checkUserNoExistenceByField(field) {
        const user = await this.authRepository.getUserByField(field)
        if (user) { throw createError.NotFound("Usuario encontrado") }
        return user
    }

    async updateRefreshToken(identifier, refreshToken) {
        const result = await this.authRepository.updateData(identifier, refreshToken)
        if (!result) { throw createError.NotFound("Error de base de datos al actualizar el refreshToken") }
        return result
    }

    async createNewRegisterAuth(data) {
        const result = await this.authRepository.createNewRegisterAuth(data)
        if (!result) { throw createError.BadGateway("Error de base de datos al crear el registro") }
        return result
    }

    encryptPasswords(password) {
        return bcrypt.hashSync(password, 10)
    }

    validatePasswords(password, passwordEncrypted) {
        const passwordsMatch = bcrypt.compareSync(password, passwordEncrypted)
        if (!passwordsMatch) { throw createError.BadRequest("Contraseña incorrecta") }
    }

    checkRefreshTokenExists(cookie) {
        const token = cookie?.refreshToken
        if (!token) throw createError.Unauthorized("Accion no permitida")
        return token
    }
}

export default AuthService

