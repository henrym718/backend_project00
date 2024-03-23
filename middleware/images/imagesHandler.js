import multer from "multer";
import path from "path";
import createError from 'http-errors';

const storage = multer.diskStorage({
  destination: "tmp",
  filename: (_, file, cb) => {
    const uniqueFixedPath =
      new Date().getTime() + path.extname(file.originalname);
    cb(null, uniqueFixedPath);
  },
});
const fileFilter = function (_, file, cb) {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  if (allowedMimeTypes.includes(file?.mimetype)) {
    cb(null, true); // Aceptar archivo
  } else {
    cb(new Error(createError(404, " Solo se permiten archivos JPEG y PNG.")), false); // Rechazar archivo
  }
};

export const upload = multer({ storage, fileFilter, fileFilter });
