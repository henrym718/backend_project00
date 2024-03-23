import UserModel from "../../infraestructure/output_adapters/userMoogoseModel.js"

class CreateUserUseCase {
    constructor({ userService }) {
        this.userService = userService
    }
    async execute(dataUser, email) {
        //si cambio el email por id en la cookie debere modificar esto a findbyid
        const dataUpdate = { ...dataUser, rol: "COMPLETEUSER" }
        const user = await UserModel.findOneAndUpdate({ email }, { $set: dataUpdate }, { new: true })
        return user
    }
}

export default CreateUserUseCase