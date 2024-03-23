import { asClass } from "awilix"
import { container } from "./container.js"

import GetCurrentUserByCookieUseCase from '../../features/user/application/getUser/getCurrentUserByCookieUseCase.js';
import CreateUserUseCase from './../../features/user/application/createUser/createUserUseCase.js';

import UserController from '../../features/user/infraestructure/input_adapters/userController.js';



const userContainer = container.createScope()
const userService = container.resolve("userService")

userContainer.register({
    /**casos de usos del USER*/
    getCurrentUserByCookieUseCase: asClass(GetCurrentUserByCookieUseCase)
        .inject(() => ({ userService }))
        .singleton(),

    createUserUseCase: asClass(CreateUserUseCase)
        .inject(() => ({ userService }))
        .singleton(),


    /**controlador del USER*/
    userController: asClass(UserController)
        .inject(() => ({
            getCurrentUserByCookieUseCase: userContainer.resolve("getCurrentUserByCookieUseCase"),
            createUserUseCase: userContainer.resolve("createUserUseCase")
        }))
        .singleton()
})


export { userContainer }



