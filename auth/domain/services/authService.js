import createError from "http-errors"
import bcrypt from 'bcrypt';

class AuthService {
    constructor({ authRepository }) {
        this.authRepository = authRepository;
    }

    async getUserByField(field) {
        return await this.authRepository.getUserByField(field)
    }

    async updateData(identifier, dataToUpdate) {
        return await this.authRepository.updateData(identifier, dataToUpdate)
    }

    async checkUserExistenceByEmail(email) {
        const user = await this.getUserByField(email)
        if (!user) { throw createError.NotFound("Usuario no registrado") }
        return user
    }

    async checkUserNoExistenceByEmail(email) {
        const user = await this.getUserByField(email)
        if (user) { throw createError.NotFound("Usuario registrado") }
        return user
    }

    async getUserbyToken(token) {
        const user = await this.getUserByField(token)
        if (user) { throw createError.NotFound("Usuario no encontrado") }
        return user

    }

    async updateRefreshToken(identifier, refreshToken) {
        const result = await this.updateData(identifier, refreshToken)
        if (!result) { throw createError.NotFound("Error de base de datos al intentar actualizar") }
        return result
    }

    async createNewRegisterAuth(data) {
        const result = await this.authRepository.createNewRegisterAuth(data)
        console.log(result)
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

    checkRefreshTokenExists(req) {
        const token = req.cookies?.refreshToken
        if (!token) throw createError.Unauthorized("Accion no permitida")
        return token
    }
}

export default AuthService

