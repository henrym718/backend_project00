import User from "../models/userModel.js";
import { cargarImageS3, obtenerImageS3 } from "../shared/images/aws_s3.js";
import path from "path";
import fs from "fs-extra";
class User {
    async register1(data) {
        try {
            //obtener la data
            const { email, password, avatar: pathAvatar, ...others } = data;

            //verificar si el usuario existe
            const userExists = await User.findOne({ email });
            if (userExists) throw createError.Conflict("User already exists");

            //subir imagen a S3 de AWS
            const fileNameAvatar = path.basename(pathAvatar);
            await cargarImageS3(pathAvatar, fileNameAvatar);
            await fs.unlink(pathAvatar);
            const urlAvatar = await obtenerImageS3(fileNameAvatar);

            //encryptar contraseña
            const hash = bcrypt.hashSync(password, 5);

            //Crear usuario en la base de datos
            const user = await User.create({
                password: hash, email, avatar: { uri: urlAvatar, tag: fileNameAvatar }, ...others
            });

            //crear Token para el usuario
            const token = createToken({ id: user._id, isSeller: user.isSeller });

            //retornar valores
            return { token, user };
        } catch (err) {
            throw err;
        }
    }
}

export default User