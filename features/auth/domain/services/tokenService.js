import jwt from "jsonwebtoken"
import createError from "http-errors"

class TokenService {
    createAccesToken(payload) {
        return jwt.sign(payload, process.env.KEY_TOKEN_SECRET, { expiresIn: "1h" })
    }

    createRfereshToken(payload) {
        return jwt.sign(payload, process.env.KEY_TOKEN_SECRET, { expiresIn: "1d" })
    }

    verifyToken(token) {
        return jwt.verify(token, process.env.KEY_TOKEN_SECRET)
    }

}

export default TokenService