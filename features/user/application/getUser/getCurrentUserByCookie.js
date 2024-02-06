import jwt from 'jsonwebtoken';
import UserService from './../../domain/services/userService.js';


class GetCurrentUserByCookie {
    constructor() {
        this.userService = new UserService();
    }

    async execute(cookie) {
        const token = cookie?.refreshToken
        if (!token) { return { rol: "PUBLIC" } }

        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.KEY_TOKEN_SECRET, async (err, payload) => {
                if (err) { reject({ rol: "PUBLIC" }) }
                else {
                    const user = await this.userService.getUserByField({ email: payload.email })
                    resolve(user)
                }
            })
        })
    }

}

export default GetCurrentUserByCookie


/*
    * GetcurrentUser >> SE ENVIA LA COOKIE con el refreshToken
        * verifico si viene una cookie.refresToken
            * Si viene obtengo su su valor que seria el email
                * Verifico no existe el usuario creado, respondo el usuario con todos los campos en blanco excepto user == logger e email
                    * Verifico si exste el usuario, respondo con el objeto del usuario.
*/








