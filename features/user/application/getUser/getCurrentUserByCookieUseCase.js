import jwt from 'jsonwebtoken';
class GetCurrentUserByCookieUseCase {
    constructor({ userService }) {
        this.userService = userService
    }
    async execute(cookie) {
        const token = cookie?.refreshToken
        if (!token) { return { rol: "PUBLICUSER" } }

        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.KEY_TOKEN_SECRET, async (err, payload) => {
                if (err) { reject({ rol: "PUBLICUSER" }) }
                else {
                    const user = await this.userService.getUserByField({ email: payload.email })
                    //podria enviar solo el id del use a la cookie y trbaajar con el id para recuperar a info
                    resolve(user)
                }
            })
        })
    }

}

export default GetCurrentUserByCookieUseCase


/*
    * GetcurrentUser >> SE ENVIA LA COOKIE con el refreshToken
        * verifico si viene una cookie.refresToken
            * Si viene obtengo su su valor que seria el email
                * Verifico no existe el usuario creado, respondo el usuario con todos los campos en blanco excepto user == logger e email
                    * Verifico si exste el usuario, respondo con el objeto del usuario.
*/








