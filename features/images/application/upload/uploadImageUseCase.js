import ImageService from '../../domain/service/imageService.js';
import createError from 'http-errors';

class UploadImageUseCase {
    constructor() {
        this.imageService = new ImageService()
    }

    async execute(file) {
        /** validor mimetype y size  en dos servicio y devolver true o false
         * ahora se esta validando el minetype en el multer directamente
        */
        const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedMimeTypes.includes(file?.mimetype)) throw createError(404, "Tipo de archivo invalido")
        if (file.size > 1 * 1024 * 1024) throw createError(404, "Archivo supera  1 MB ")
        const filename = this.imageService.setFileName(file)
        file = { ...file, filename }
        return await this.imageService.uploadFile(file)
    }
}


export default UploadImageUseCase