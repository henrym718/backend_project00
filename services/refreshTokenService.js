import AuthModel from "../models/authModel.js"
import createError from "http-errors"
import { createAccesToken } from './../shared/token/create.js';
import jwt from "jsonwebtoken";


class RefreshTokenService {
    async refreshTokenService(cookie) {
        try {
            if (!cookie?.refreshToken) throw createError.Unauthorized("Refresh token not found")

            const refreshToken = cookie.refreshToken
            const foundUser = await AuthModel.findOne({ refreshToken }).exec()
            if (!foundUser) throw createError.Forbidden("User token not found")

            /* evaluaa el refreshtoken si esta vigente y si prtenece al usuario que envia la peticion refresh  */
            return new Promise((resolve, reject) => {
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                    if (err || foundUser.id !== payload.id) reject(createError.Unauthorized("Refresh token not valid"))
                    const accessToken = createAccesToken({ id: payload.id })
                    resolve(accessToken)
                })
            })
        } catch (err) {
            throw err
        }
    }
}

export default RefreshTokenService