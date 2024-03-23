import ProductService from '../../domain/services/productService.js'

class SearchProductsUseCase {
    constructor() {
        this.productService = new ProductService()
    }

    async execute(search) {
        const decodeSearch = search?.replace(/%20/g, " ")
        const textSearchQuery = decodeSearch && { tags: { $regex: decodeSearch, $options: "i" } }
        const isSearch = textSearchQuery && "tags" in textSearchQuery
        const totalResult = isSearch ? await this.productService.countDocuments(textSearchQuery) : null
        if (totalResult) {
            const tags = await this.productService.getProductsByTags(textSearchQuery)
            const allTags = tags.flatMap(value => value.tags)
            const arrayTags = [... new Set(allTags)].map(value => { return { value } })
            return arrayTags
        } else {
            return []
        }
    }
}

export default SearchProductsUseCase