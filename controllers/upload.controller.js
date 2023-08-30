import createError from "http-errors"
export const cargarAvatar = async (req, res, next) => {
  try {
    if (!req.file) throw createError.BadRequest("No file specified")
    res.status(201).json("req.file.path");
  } catch (err) {
    next(err);
  }
};

export const cargarImages = async (req, res) => {
  try {
    const paths = req.files.map((file) => file.path);
    res.status(200).json({ images: paths });
  } catch (error) {
    res.status(400).send("error");
  }
};
