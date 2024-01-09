import TagService from "../services/tagService.js"


const tagService = new TagService()

export const allTags = async (req, res, next) => {
    try {
        const { search } = req.query
        const response = await tagService.allTags(search)
        console.log(response)
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}