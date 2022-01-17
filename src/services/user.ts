import ServiceBase from './serviceBase'

class UserService extends ServiceBase {
  constructor() {
    super('user/:userId')
  }
}

export default new UserService()
