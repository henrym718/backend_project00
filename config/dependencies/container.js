import { createContainer, asClass, asValue } from "awilix"

import AuthModel from "../../auth/infraestructure/output_adapters/authMoogoseModel.js"
import AuthMoogoseRepository from "../../auth/infraestructure/output_adapters/authMoogoseRepository.js"
import AuthRepository from '../../auth/domain/repositories/authRepository.js';
import AuthService from '../../auth/domain/services/authService.js';
import TokenService from './../../auth/domain/services/tokenService.js';
import LoginCredentialsUseCase from './../../auth/application/login/loginCredentialsUseCase.js';
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

    loginCredentialsUseCase: asClass(LoginCredentialsUseCase)
        .inject(() => ({
            authService: authContainer.resolve('authService'),
            tokenService: authContainer.resolve('tokenService')
        }))
        .singleton(),

    authController: asClass(AuthController)
        .inject(() => ({ loginCredentialsUseCase: authContainer.resolve('loginCredentialsUseCase') }))
        .singleton()
})


export { authContainer }









// // Importamos Awilix
// import { createContainer, asClass, asValue } from "awilix"

// import AuthRepository from "../../auth/domain/repositories/auth-repository.js"
// import LoginWithCredentials from "../../auth/domain/services/login/login-with-credentials.js"
// import AuthController from "../../auth/application/auth-controller.js"
// import AuthMongooseRepository from "../../auth/domain/infraestructure/output_adapters/auth-moogose-repository.js"





// // Creamos el contenedor de Awilix
// const main_container = createContainer()
// const auth_container = main_container.createScope()


// // Registramos las dependencias en el contenedor
// auth_container.register({
//     // Registramos el repositorio de Mongoose como una clase
//     db_repository: asClass(AuthMongooseRepository).singleton(),

//     // Registramos el repositorio de autenticación como una clase
//     // y le inyectamos el repositorio de Mongoose
//     auth_repository: asClass(AuthRepository).inject(() => ({
//         db_repository: auth_container.resolve('db_repository')
//     })).singleton(),

//     // Registramos el servicio de inicio de sesión como una clase
//     // y le inyectamos el repositorio de autenticación
//     loginWithCredentials: asClass(LoginWithCredentials).inject(() => ({
//         auth_repository: auth_container.resolve('auth_repository')
//     })).singleton(),

//     // Registramos el controlador de autenticación como una clase
//     // y le inyectamos el servicio de inicio de sesión
//     authController: asClass(AuthController).inject(() => ({
//         loginWithCredentials: auth_container.resolve('loginWithCredentials')
//     })).singleton()
// });

// // Exportamos el contenedor
// export { auth_container };



