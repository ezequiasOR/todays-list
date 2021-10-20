import ServiceBase from './serviceBase'

class ToDoService extends ServiceBase {

  constructor() {
    super('list/:listId/todo')
  }
  
}

export default new ToDoService()
