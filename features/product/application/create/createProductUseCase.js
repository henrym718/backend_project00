import ProductService from "../../domain/services/productService.js"

class CreateProductUseCase {
    constructor() {
        this.productService = new ProductService()
    }
    async execute(product) {
        const response = await this.productService.createProduct(product)
        return response
    }
}

export default CreateProductUseCase