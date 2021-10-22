import { action, makeObservable, observable, runInAction } from 'mobx';
import BaseStore from './BaseStore';
import UserService from '../services/user'
import UserDomain from '../domains/user';

class HomeStore extends BaseStore {
  @observable lists

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

  @action
  getLists(userId) {
    this.loading = true
    UserService.get(this.pathParams, `user/${encodeURI(userId)}/list`)
      .then(response => {
        runInAction(() => {
          this.loading = false
          if (response && response.data) {
            this.lists = response.data            
          }
        })
      })
      .catch(error => {
        runInAction(() => {
          this.loading = false
        })
      })
  }
  
}

export default HomeStore