import createError from "http-errors";
import Gig from "../models/gig.model.js";
import SubCategory from "../models/subcategoryModel.js";
import User from "../models/sellerModel.js";

class GigService {
  async getGigsByCategory(query) {
    try {
      console.log(query);
      //obtener el id de la subcategoria
      const subCategory = await SubCategory.findOne({
        name: { $regex: `^${query}$`, $options: "i" },
      });

      if (!subCategory)
        throw createError.BadRequest("No data in subcategory: " + `${query}`);

      //obtener todos los gigs de esa categoría
      const gigsByCategory = await Gig.find({ subcategory: subCategory._id });

      //Devolver dataset
      return gigsByCategory;
    } catch (err) {
      throw err;
    }
  }

  async getGigsBySubCategoryOrFilters(source, queryParams) {
    try {

      // filtro ordernar
      const sortOrder = queryParams.order === "desc" ? -1 : 1
      const sortField = queryParams.field || "service"
      const optionOrder = { [sortField]: sortOrder }

      // filtro paginación
      const perPage = process.env.TOTAL_GIGS_SHOW
      const currentPage = parseInt(queryParams.page) || 1
      const skipCount = (currentPage - 1) * perPage

      // filtro subcategoria
      const decodedSubcategory = source.subcategory?.replace(/-/g, " ")
      const subcategoriaQuery = decodedSubcategory && { name: { $regex: `^${decodedSubcategory}$`, $options: "i" } }
      const subcategoryId = subcategoriaQuery && await SubCategory.findOne(subcategoriaQuery).select("_id")
      const searchbySubcategory = subcategoryId && { subcategory: subcategoryId }

      // filtro de querys
      const textSearchQuery = queryParams.search && {
        $or: [
          { service: { $regex: queryParams.search, $options: "i" } },
          { features: { $regex: queryParams.search, $options: "i" } }]
      }

      // filtro por rango de precios
      const priceFilter = (qMin, qMax) => ({
        ...(qMin && { $gte: parseFloat(qMin) }),
        ...(qMax && { $lte: parseFloat(qMax) }),
      })
      const priceQuery = (queryParams.min || queryParams.max) && { price: priceFilter(queryParams.min, queryParams.max) }

      // join de todos los filtras
      const filter = { ...searchbySubcategory, ...textSearchQuery, ...priceQuery }

      // hacer la consulta para determinar si existen resultados      
      const hasSubcategory = 'subcategory' in filter;
      const hasSearch = '$or' in filter;
      const totalDocument = (Object.keys(filter).length > 0 && (hasSubcategory || hasSearch) ? await Gig.countDocuments(filter) : 0);

      //Si existen resultados los devolvemos sino enviamos un error
      if (totalDocument > 0) {
        const totalPages = Math.ceil(totalDocument / perPage)
        const gigs = await Gig.find(filter).sort(optionOrder).skip(skipCount).limit(perPage)
        return { gigs, totalDocument, totalPages, currentPage }
      } else {
        throw createError.NotFound("Not found data")
      }
    } catch (err) {
      throw err
    }
  }

  async getGigByUserOrNameService(queryParams) {
    try {
      //validar que el params siempre debe venir en esta consulta
      const user = queryParams.email && await User.findOne({ email: queryParams.email }).select("id")
      const queryEmail = user && { userId: user._id }
      console.log(queryEmail)

      const service = queryParams.service?.replace(/-/g, " ")
      const filter = { ...queryEmail, ... (service && { service }) }

      const totalDocuments = await Gig.countDocuments(filter)

      if (totalDocuments > 0) {
        const gigs = await Gig.find(filter)
        return gigs
      } else {
        throw createError.NotFound("Not found data")
      }

    } catch (err) {
      throw err
    }
  }

}


export default GigService;
