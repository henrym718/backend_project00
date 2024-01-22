import { createContainer, asClass, asValue } from "awilix"

import AuthModel from "../../auth/infraestructure/output_adapters/authMoogoseModel.js"
import TokenService from './../../auth/domain/services/tokenService.js';
import AuthMoogoseRepository from "../../auth/infraestructure/output_adapters/authMoogoseRepository.js"
import AuthRepository from '../../auth/domain/repositories/authRepository.js';
import AuthService from '../../auth/domain/services/authService.js';

import LoginCredentialsUseCase from './../../auth/application/login/loginCredentialsUseCase.js';
import RegisterCredentialsUseCase from './../../auth/application/register/registerCredentialsUseCase.js';
import LogoutUseCase from './../../auth/application/logout/logoutUseCase.js';
import AuthController from './../../auth/infraestructure/input_adapters/authController.js';

const container = createContainer()
const authContainer = container.createScope()


authContainer.register({
    authModel: asValue(AuthModel),

    tokenService: asClass(TokenService)
        .singleton(),

    authMoogoseRepository: asClass(AuthMoogoseRepository)
        .inject(() => ({ model: authContainer.resolve('authModel') }))
        .singleton(),

    authRepository: asClass(AuthRepository)
        .inject(() => ({ dbRepository: authContainer.resolve('authMoogoseRepository') }))
        .singleton(),

    authService: asClass(AuthService)
        .inject(() => ({ authRepository: authContainer.resolve('authRepository') }))
        .singleton(),


    /*Casos de usos */
    loginCredentialsUseCase: asClass(LoginCredentialsUseCase)
        .inject(() => ({
            authService: authContainer.resolve('authService'),
            tokenService: authContainer.resolve('tokenService')
        }))
        .singleton(),

    registerCredentialsUseCase: asClass(RegisterCredentialsUseCase)
        .inject(() => ({
            authService: authContainer.resolve('authService'),
            tokenService: authContainer.resolve('tokenService')
        }))
        .singleton(),
    logoutUseCase: asClass(LogoutUseCase)
        .inject(() => ({ authService: authContainer.resolve('authService') }))
        .singleton(),

    /* Controlador que une todos los casos de uso */
    authController: asClass(AuthController)
        .inject(() => ({
            loginCredentialsUseCase: authContainer.resolve('loginCredentialsUseCase'),
            registerCredentialsUseCase: authContainer.resolve('registerCredentialsUseCase'),
            logoutUseCase: authContainer.resolve('logoutUseCase')
        }))
        .singleton(),

})

export { authContainer }