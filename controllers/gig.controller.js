import Gig from "../models/gig.model.js";
import Subcategory from "../models/subcategoryModel.js";
import User from "../models/sellerModel.js";
import GigService from "../services/gigService.js";
import createError from "http-errors"

const gigService = new GigService();

export const createNewGig = async (req, res, next) => {
  try {

    const { tags, faq } = req.body

    const userId = { userId: req.userId }
    const images = req.files && { images: req.files }
    const data = { ...req.body, ...images, ...userId }
    const response = await gigService.createNewGig(data)
    res.status(200).json({ error: false, message: response })
  } catch (err) {
    next(err)
  }

};

const isValidJSON = (str) => {
  try {
    return JSON.parse(str)
  } catch (err) {
    return false

  }

}

/* aun no verificado */

export const getGigsBySubCategoryOrFilters = async (req, res, next) => {

  try {
    const params = req.params || {}; // Si req.params es undefined, asigna un objeto vacío
    const filters = req.query || {}; // Si req.query es undefined, asigna un objeto vacío
    const { gigs, totalDocument, totalPages, currentPage } = await gigService.getGigsBySubCategoryOrFilters(params, filters);

    res.status(200).json({ totalDocument, totalPages, currentPage, gigs });
  } catch (err) {
    next(err);
  }
};

export const getGigByUserOrNameService = async (req, res, next) => {
  try {
    const gigs = await gigService.getGigByUserOrNameService(req.params)
    res.status(200).json(gigs);
  } catch (err) {
    next(err);

  }
}