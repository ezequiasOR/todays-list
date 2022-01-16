import ServiceBase from './serviceBase'

class HomeService extends ServiceBase {
  constructor() {
    super('user/:userId/list')
  }
}

const instance = new HomeService()

export default instance
