import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "tmp",
  filename: (_, file, cb) => {
    const uniqueFileName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});
const fileFilter = function (_, file, cb) {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  cb(null, allowedMimeTypes.includes(file.mimetype));
};

export const upload = multer({ storage, fileFilter });
