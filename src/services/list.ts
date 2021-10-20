import ServiceBase from './serviceBase'

class ListService extends ServiceBase {

  constructor() {
    super('user/:userId/list')
  }
  
}

export default new ListService()
