import RefreshTokenService from "../services/refreshTokenService.js"

const refreshTokenService = new RefreshTokenService()


export const refreshToken = async (req, res, netx) => {
    try {
        const cookie = req.cookies
        const accessToken = await refreshTokenService.refreshTokenService(cookie)
        res.status(200).json({ error: false, accessToken })
    } catch (err) {
        netx(err)

    }

}
/*
*RefrehToken >> SE ENVIA LA COOKIE
 * AL iniciar la app, se hace una llamada al servido a la ruta
 * refreshToken recibe una cookie, se verifica si hay algun usuario en auth con esa cookie 
 * si existe usuario se crear un nuevo accessToken(email del usuario) y se crear un nuevo refreshToken
 * se actualiza la db con el nuevo refheshToken
 * respondo una nueva cookie con mas tiempo y nuevo refreshToken
 * repondo con un json con el nuevo accessToken 
 *  * si no exite la cookie
 * rrespondo con un objeto accessToken = null y ni envio ninguca cookie  
 * Resumen>>> refrehToken >> repsonde con una cookie(refresjToken) y con un json con el accessToken
 *                           si no existe envia un objeto con accessToken null   */