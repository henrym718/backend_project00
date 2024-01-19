import jwt from "jsonwebtoken"

class TokenService {
    createAccesToken(payload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
    }

    createRfereshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })
    }

}

export default TokenService