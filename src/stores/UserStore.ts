import BaseStore from './BaseStore'
import UserDomain from '../domains/user'
import UserService from '../services/user'

class UserStore extends BaseStore {
  constructor() {
    super(UserService)
  }

  initializeData() {
    return new UserDomain()
  }
}

export default UserStore
