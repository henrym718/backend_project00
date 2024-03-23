import jwt from "jsonwebtoken"
import createError from "http-errors"

const checkRole = (accessRol) => {
    return (req, _, next) => {
        try {
            const header = req.headers.authorization || req.headers.Authorization;
            const token = header?.split(" ")[1]

            if (!token) throw createError(401, "Usuario no autorizado Falta de token");
            jwt.verify(token, process.env.KEY_TOKEN_SECRET, (error, payload) => {
                if (error) throw createError(401, "Usuario no autorizado error de Token")
                if (!accessRol.includes(payload.rol)) throw createError(401, "Usuario no autorizado error de permiso roll")
                req.email = payload.email
                req.user = payload.user
                next()
            })
        } catch (err) {
            next(err)
        }
    }
}

export { checkRole }

