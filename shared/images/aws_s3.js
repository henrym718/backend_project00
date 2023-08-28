import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs-extra";

const S3 = new S3Client({
  region: "sa-east-1",
  credentials: {
    accessKeyId: "AKIA5NRGSCEFJU4WHD67",
    secretAccessKey: "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",
  },
});

export const cargarImageS3 = async (path, fileName) => {
  const stream = fs.createReadStream(path);
  const comand = new PutObjectCommand({
    Bucket: "apijob",
    Key: fileName,
    Body: stream,
  });
  try {
    return await S3.send(comand);
  } catch (error) {
    res.status(400).json("Error al cargar image a la nube");
  }
};

export const obtenerImageS3 = async (key) => {
  const command = new GetObjectCommand({
    Bucket: "apijob",
    Key: key,
  });

  try {
    const url = await getSignedUrl(S3, command);
    return url;
  } catch (error) {
    res.status(400).json("Error al obtener la image de la nube");
  }
};
