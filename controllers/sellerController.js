import SellerService from "../services/sellerService.js"
const sellerService = new SellerService()

export const getSellerByToken = async (req, res, next) => {
    try {
        const profile = await sellerService.getSellerByToken(req.userId)
        res.status(200).json({ error: false, profile })
    } catch (err) {
        next(err)
    }
}

export const createSellerProfile = async (req, res, next) => {
    try {
        const userId = req.userId && { userId: req.userId }
        const file = req.file && { avatar: req.file }
        const data = { ...req.body, ...file, ...userId }
        console.log(data)
        const profile = await sellerService.createSellerProfile(data)
        res.status(200).json({ error: false, profile })
    } catch (err) {
        next(err)

    }
}

/**
 * cookie va con el refreshToken y dentro el email del usuario
 * el accessToken va en un json y dentro el email del usuario 
 * 
 * Register
 * guardo los campos email, password y refreshToken
 * Resumen>>> register >> repsonde con una cookie(refresjToken(email)) y con un json con el accessToken(email)
 * 
 * Login
 * compruebo que exite el usuario y coincidna las password
 * Resumen>>> login >> repsonde con una cookie(refresjToken(email)) y con un json con el accessToken(email)
 * 
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
 *                           si no existe envia un objeto con accessToken null   
 * 
 * GetcurrentUser >> SE ENVIA LA COOKIE con el refreshToken
 * verifico si viene una cookie.refresToken 
 * Si viene obtengo su su valor que seria el email 
 * Verifico no existe el usuario creado, respondo el usuario con todos los campos en blanco excepto user == logger e email
 * Verifico si exste el usuario, respondo con el objeto del usuario.
 * 
 */


