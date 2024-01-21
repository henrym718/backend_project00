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