import UploadImageUseCase from '../../application/upload/uploadImageUseCase.js';

class ImageController {
    constructor() {
        this.uploadImageUseCase = new UploadImageUseCase();
        this.uploadFile = this.uploadFile.bind(this);
    }

    async uploadFile(req, res, next) {
        try {
            const url = await this.uploadImageUseCase.execute(req?.file)
            res.status(200).json(url)
        } catch (error) {
            next(error);
        }
    }
}

export default ImageController