// User-land modules.
import { Container, decorate, inject, injectable } from 'inversify'
import 'reflect-metadata'
import IDENTIFIERS from './identifiers.js'

// Services
import { TokenStore } from '../services/tokenStore.js'
import { GroupService } from '../services/groupServices.js'
import { ProfileService } from '../services/profileService.js'
import { AuthService } from '../services/authService.js'

// Controllers
import { AuthController } from '../controllers/authController.js'
import { ProfileController } from '../controllers/profileController.js'
import { GroupController } from '../controllers/groupController.js'
import { HomeController } from '../controllers/homeController.js'

export const TYPES = {
  GroupService: Symbol.for('GroupService'),
  TokenStore: Symbol.for('TokenStore'),
  ProfileService: Symbol.for('ProfileService'),
  AuthService: Symbol.for('AuthService'),
  // Add other components as needed
  AuthController: Symbol.for('AuthController'),
  ProfileController: Symbol.for('ProfileController'),
  GroupController: Symbol.for('GroupController'),
  HomeController: Symbol.for('HomeController')

}

// Services
decorate(injectable(), TokenStore)
decorate(injectable(), GroupService)
decorate(injectable(), ProfileService)
decorate(injectable(), AuthService)

// Controllers
decorate(injectable(), AuthController)
decorate(injectable(), ProfileController)
decorate(injectable(), GroupController)
decorate(injectable(), HomeController)

// Inject token dependencies
decorate(inject(TYPES.TokenStore), GroupService, 0)
decorate(inject(TYPES.TokenStore), ProfileService, 0)
decorate(inject(TYPES.TokenStore), AuthService, 0)

// Inject services into controllers
decorate(inject(IDENTIFIERS.AuthService), AuthController, 0)
decorate(inject(IDENTIFIERS.ProfileService), ProfileController, 0)
decorate(inject(IDENTIFIERS.GroupService), GroupController, 0)

const container = new Container()
console.log('Bind 1')
container.bind(IDENTIFIERS.TokenStore).to(TokenStore).inSingletonScope()
console.log('Bind 2')
container.bind(IDENTIFIERS.GroupService).to(GroupService).inSingletonScope()
console.log('Bind 3')
container.bind(IDENTIFIERS.ProfileService).to(ProfileService).inSingletonScope()
console.log('Bind 4')
container.bind(IDENTIFIERS.AuthService).to(AuthService).inSingletonScope()
console.log('Bind 5')
// Controllers
container.bind(IDENTIFIERS.AuthController).to(AuthController).inSingletonScope()
console.log('Bind 6')
container.bind(IDENTIFIERS.ProfileController).to(ProfileController).inSingletonScope()
console.log('Bind 7')
container.bind(IDENTIFIERS.GroupController).to(GroupController).inSingletonScope()
console.log('Bind 8')
container.bind(IDENTIFIERS.HomeController).to(HomeController).inSingletonScope()

export default container
