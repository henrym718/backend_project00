import SubcategoryService from "../services/subcategoryService.js"

const subcategoryService = new SubcategoryService()

export const createNewSubcategory = async (req, res, next) => {
  try {
    const subcategory = await subcategoryService.createNewSubcategory(req.body)
    res.status(200).send({ error: false, subcategory })
  } catch (err) {
    next(err)

  }
};


