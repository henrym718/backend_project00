import AuthModel from "../../models/authModel.js";
import createError from "http-errors";


class Logout {
    async execute(req, res) {
        try {
            const refreshToken = req.cookies?.refreshToken
            if (!refreshToken) { throw createError.NotFound("token not found") }
            const user = await AuthModel.findOne({ refreshToken }).exec()
            if (!user) {
                res.clearCookie("refreshToken")
                throw createError.Unauthorized("Not authorized")
            }
            user.refreshToken = ""
            await user.save()
            res.clearCookie("refreshToken")
            res.status(200).send("User has been logged out")
        } catch (err) {
            throw err
        }
    }
}
export default Logout;
