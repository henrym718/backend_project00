export const cargarAvatar = async (req, res) => {
  try {
    res.status(201).json(req.file.path);
  } catch (error) {
    res.status(400).send("error");
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
