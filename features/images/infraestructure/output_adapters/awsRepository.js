import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


class AwsRepository {
    constructor() {
        this.s3Client = new S3Client({
            region: "sa-east-1",
            credentials: {
                accessKeyId: "AKIA5NRGSCEFJU4WHD67",
                secretAccessKey: "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",
            }
        })
    }

    async uploadFile(file) {
        const putObjectParams = {
            Bucket: "apijob",
            Key: file.filename,
            Body: file.buffer
        }
        /**subida del file a aws en S3 */
        await this.s3Client.send(new PutObjectCommand(putObjectParams));

        /**obtener la url del file */
        const getObjectParams = {
            Bucket: "apijob",
            Key: file.filename,
        };
        return await getSignedUrl(this.s3Client, new GetObjectCommand(getObjectParams));
    }

    async deleteFile(filename) {
        const deleteObjectParams = {
            Bucket: "apijob",
            key: filename
        }
        await this.s3Client.send(new DeleteObjectCommand(deleteObjectParams))
    }
}


export default AwsRepository

