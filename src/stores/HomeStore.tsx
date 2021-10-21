import { makeObservable } from 'mobx';
import BaseStore from './BaseStore';
import UserService from '../services/user'
import UserDomain from '../domains/user';

class HomeStore extends BaseStore {

  constructor() {
    super(UserService)
    makeObservable(this)
  }

  initializeData() {
    return new UserDomain();
  }
  
  init() {
    this.getById(1, 'user', () => {}, () => {})
  }
  
}

export default HomeStore