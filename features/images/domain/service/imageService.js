import ImageRepository from '../repository/imageRepository.js';
import path from "path";

class ImageService {
    constructor() {
        this.imageRepository = new ImageRepository();
    }

    async uploadFile(file) {
        return await this.imageRepository.uploadFile(file)
    }

    async deleteFile(src) {
        const filename = this.getPathNameUrl(src)
        return await this.imageRepository.deleteFile(filename)
    }

    getPathNameUrl(src) {
        const url = new URL(src)
        const pathArray = url.pathname.split('/')
        return pathArray[pathArray.length - 1]
    }

    setFileName(file) {
        return `${new Date().getTime()}${path.extname(file.originalname)}`
    }
}

export default ImageService 