import Gig from "../models/gig.model.js";
import Subcategory from "../models/subcategoryModel.js";
import User from "../models/sellerModel.js";
import GigService from "../services/gigService.js";

const gigService = new GigService();

export const createNewGig = async (req, res) => {
  //El middleware valida la data y que este logueado//

  //Obtengo la data que envia el usuario
  try {
    const {
      service,
      aboutService,
      aboutMe,
      features,
      price,
      subcategory,
      phone,
      address,
      active,
    } = req.body;

    //Busco el id de la subtcategoria para registrar el gig
    const idSubcategory = await Subcategory.findOne(
      {
        name: { $regex: subcategory, $options: "i" },
      },
      { _id: 1 }
    );

    //Creo un nuevo gig y lo guardo en la base de datos

    await Gig.create({
      userId: req.userId,
      active,
      subcategory: idSubcategory,
      service,
      aboutService,
      aboutMe,
      features,
      price,
      phone,
      address,
    });

    //Actualizo al usuario a seller true
    await User.updateOne({ _id: req.userId }, { $set: { isSeller: true } });

    //Responder al cliente
    res.status(200).json("Gig creado exitosamente");
  } catch (error) {
    res.status(400).json({ succes: false, msg: error });
  }
};

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