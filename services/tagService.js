import GigModel from "../models/gig.model.js"


class TagService {

    async allTags(query) {
        try {

            const decodeQuery = query?.replace(/%20/g, " ")

            const textSearchQuery = decodeQuery && { tags: { $regex: decodeQuery, $options: "i" } }

            let filter = { ...textSearchQuery }

            const isSearch = "tags" in filter
            const totalResult = isSearch ? await GigModel.countDocuments(filter) : 0

            if (totalResult > 0) {
                const tags = await GigModel.find(filter).select("tags")
                const allTags = tags.map(value => value.tags).reduce((acc, tag) => acc.concat(tag), [])

                const dataArr = new Set(allTags)
                const totalResult = [...dataArr]
                const decodeFilter = new RegExp(decodeQuery, "i")

                const response = totalResult.map(result => {
                    return { value: result }
                })

                return response
                /*return totalResult.filter(tag => decodeFilter.test(tag))*/
                //const coincidencias = filteredTags.filter(tag => tag.includes(subcadena));}
            } else {
                return []
            }

        } catch (err) {
            throw err
        }
    }
}



export default TagService;