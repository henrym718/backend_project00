import SellerModel from "../models/sellerModel.js";
import createError from "http-errors"
import { cargarImageS3, obtenerImageS3 } from "../shared/images/aws_s3.js";
import fs from "fs-extra";

class Seller {
    async getSellerByToken(userIdByToken) {
        try {
            /* busqueda del vendedor y si en caso aun no existe informar */
            const seller = await SellerModel.findOne({ userId: userIdByToken })
            if (!seller) throw createError.NotFound("Not a seller yet")
            return seller
        } catch (err) {
            throw err
        }
    }

    async createSellerProfile(data) {
        try {
            /* obteniendo data  */
            const { avatar, ...otherFields } = data

            /* validar si ya ha sido creado */
            const sellerExists = await SellerModel.findOne({ userId: data.userId })
            if (sellerExists) throw createError.Conflict("Seller already exists")

            /* validar la imagen del avatar  */
            if (!avatar) throw createError.BadRequest("Avatar is not found")

            /* subir el avatar a la nube de aws/s3 */
            const path = avatar.path
            const filename = avatar.filename
            await cargarImageS3(path, filename)
            await fs.unlink(path)
            const uri = await obtenerImageS3(filename)

            /*crear nuevo usuario */
            const sellerProfile = await SellerModel.create({ avatar: { uri, filename }, ...otherFields })

            //retornar valores
            return sellerProfile;
        } catch (err) {
            throw err;
        }
    }
}

export default Seller