import { asClass } from "awilix"
import { container } from "./container.js"

import GetCurrentUserByCookieUseCase from '../../features/user/application/getUser/getCurrentUserByCookieUseCase.js';
import UserController from '../../features/user/infraestructure/input_adapters/UserController.js';



const userContainer = container.createScope()
const userService = container.resolve("userService")

userContainer.register({
    /**casos de usos del USER*/
    getCurrentUserByCookieUseCase: asClass(GetCurrentUserByCookieUseCase)
        .inject(() => ({ userService }))
        .singleton(),

    /**controlador del USER*/
    userController: asClass(UserController)
        .inject(() => ({ getCurrentUserByCookieUseCase: userContainer.resolve("getCurrentUserByCookieUseCase") }))
        .singleton()
})


export { userContainer }



