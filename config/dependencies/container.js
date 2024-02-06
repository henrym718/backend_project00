import { createContainer, asClass, asValue } from "awilix"

import AuthModel from "../../features/auth/infraestructure/output_adapters/authMoogoseModel.js"
import AuthMoogoseRepository from "../../features/auth/infraestructure/output_adapters/authMoogoseRepository.js"
import AuthRepository from '../../features/auth/domain/repositories/authRepository.js';
import AuthService from '../../features/auth/domain/services/authService.js';
import TokenService from '../../features/auth/domain/services/tokenService.js';

import UserModel from "../../features/user/infraestructure/output_adapters/userMoogoseModel.js"
import UserMoogoseRepository from '../../features/user/infraestructure/output_adapters/userMoogoseRepository.js';
import UserRepository from '../../features/user/domain/repositories/userRespository.js';
import UserService from '../../features/user/domain/services/userService.js';

const container = createContainer()

/*authService */
container.register({
    authModel: asValue(AuthModel),

    authMoogoseRepository: asClass(AuthMoogoseRepository)
        .inject(() => ({ model: container.resolve("authModel") }))
        .singleton(),

    authRepository: asClass(AuthRepository)
        .inject(() => ({ dbRepository: container.resolve("authMoogoseRepository") }))
        .singleton(),

    authService: asClass(AuthService)
        .inject(() => ({ authRepository: container.resolve("authRepository") }))
        .singleton()


})



/*userService */
container.register({
    userModel: asValue(UserModel),

    userMoogoseRepository: asClass(UserMoogoseRepository)
        .inject(() => ({ model: container.resolve("userModel") }))
        .singleton(),

    userRepository: asClass(UserRepository)
        .inject(() => ({ dbRepository: container.resolve("userMoogoseRepository") }))
        .singleton(),

    userService: asClass(UserService)
        .inject(() => ({ userRepository: container.resolve("userRepository") }))
        .singleton()
})


/*tokenService */
container.register({
    tokenService: asClass(TokenService)
})



export { container }
