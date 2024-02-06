import GetCurrentUserByCookie from "../../application/getUser/getCurrentUserByCookie.js"

const getCurrentUserByCookie = new GetCurrentUserByCookie()

class userController {
    constructor() { }

    async getCurrentUserByCookie(req, res, next) {
        try {
            const result = await getCurrentUserByCookie.execute(req.cookies)
            res.status(200).json(result)
        } catch (error) {
            res.clearCookie("refreshToken")
            res.status(200).json(error)
        }
    }
}



export default userController