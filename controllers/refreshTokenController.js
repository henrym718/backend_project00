import RefreshTokenService from "../services/refreshTokenService.js"

const refreshTokenService = new RefreshTokenService()


export const refreshToken = async (req, res, netx) => {
    try {
        const cookie = req.cookies
        const accessToken = await refreshTokenService.refreshTokenService(cookie)
        console.log(accessToken)
        res.status(200).json({ error: false, token: accessToken })
    } catch (err) {
        netx(err)

    }


}