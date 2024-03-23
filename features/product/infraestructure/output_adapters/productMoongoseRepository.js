import ProductModel from "./productMongooseModel.js"

class ProductMoongoseRepository {
    constructor() {
        this.productModel = ProductModel;
    }

    // create a new product
    async createProduct(product) {
        return await this.productModel.create(product)
    }
    async countDocuments(search) {
        return await this.productModel.countDocuments(search)
    }

    async getProductsByTags(field) {
        return await this.productModel.find(field).select("tags")

    }
}

export default ProductMoongoseRepository