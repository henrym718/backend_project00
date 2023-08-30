import SubcategoryModel from "../models/subcategoryModel.js"
import createError from "http-errors"


class Subcategory {
    async createNewSubcategory(data) {
        try {
            const subcategoryExists = await SubcategoryModel.findOne({ name: { $regex: data.name, $options: "i" } })
            if (subcategoryExists) throw createError.Conflict("Subcategory already exists")
            const subcategorycreated = await SubcategoryModel.create(data)
            return subcategorycreated
        } catch (err) {
            throw err
        }
    }
}



export default Subcategory