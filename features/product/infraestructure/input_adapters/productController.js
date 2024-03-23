import CreateProductUseCase from "../../application/create/createProductUseCase.js"
import SearchProductUseCase from "../../application/search/searchProductsUseCase.js"

class ProductController {
    constructor() {
        this.createProductUseCase = new CreateProductUseCase();
        this.searchProductUseCase = new SearchProductUseCase();

        this.createProduct = this.createProduct.bind(this);
        this.searchProduct = this.searchProduct.bind(this);
    }

    async createProduct(req, res, next) {
        try {
            const data = { ...req.body, user: req.user }
            const response = await this.createProductUseCase.execute(data)
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    }

    async searchProduct(req, res, next) {
        try {
            const { input } = req.query
            const response = await this.searchProductUseCase.execute(input)
            console.log(response)
            res.status(200).json(response)
        } catch (err) {
            next(err);
        }

    }


}

export default ProductController 