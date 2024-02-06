import { asClass } from "awilix"
import { container } from "./container.js"

import LoginCredentialsUseCase from './../../features/auth/application/login/loginCredentialsUseCase.js';
import RegisterCredentialsUseCase from './../../features/auth/application/register/registerCredentialsUseCase.js';
import LogoutUseCase from './../../features/auth/application/logout/logoutUseCase.js';
import RefreshTokenUseCase from './../../features/auth/application/refreshToken/refreshTokenUseCase.js';
import AuthController from './../../features/auth/infraestructure/input_adapters/authController.js';


const authContainer = container.createScope()
const authService = container.resolve("authService")
const userService = container.resolve("userService")
const tokenService = container.resolve("tokenService")

authContainer.register({
    /**casos de usos del AUTH */
    registerCredentialsUseCase: asClass(RegisterCredentialsUseCase)
        .inject(() => ({ authService, tokenService, userService }))
        .singleton(),

    loginCredentialsUseCase: asClass(LoginCredentialsUseCase)
        .inject(() => ({ authService, tokenService, userService }))
        .singleton(),

    logoutUseCase: asClass(LogoutUseCase)
        .inject(() => ({ authService }))
        .singleton(),

    refreshTokenUseCase: asClass(RefreshTokenUseCase)
        .inject(() => ({ authService, tokenService, userService }))
        .singleton(),

    /**controlador del AUTH */
    authController: asClass(AuthController)
        .inject(() => ({
            registerCredentialsUseCase: authContainer.resolve("registerCredentialsUseCase"),
            loginCredentialsUseCase: authContainer.resolve("loginCredentialsUseCase"),
            refreshTokenUseCase: authContainer.resolve("refreshTokenUseCase"),
            logoutUseCase: authContainer.resolve("logoutUseCase")
        }))
        .singleton()
})

export { authContainer }









