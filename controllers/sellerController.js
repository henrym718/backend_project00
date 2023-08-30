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
        const profile = await sellerService.createSellerProfile(data)
        res.status(200).json({ error: false, profile })
    } catch (err) {
        next(err)

    }
}




