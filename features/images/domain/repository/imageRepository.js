import AwsRepository from './../../infraestructure/output_adapters/awsRepository.js';

class ImageRepository {
    constructor() {
        this.cloudRepository = new AwsRepository
    }

    async uploadFile(file) {
        return await this.cloudRepository.uploadFile(file)
    }

    async deleteFile(filename) {
        return await this.cloudRepository.deleteFile(filename)
    }
}

export default ImageRepository
