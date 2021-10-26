import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import BaseStore from './BaseStore';
import UserService from '../services/user'
import UserDomain from '../domains/user';
import ToDoService from '../services/todo';
class HomeStore extends BaseStore {
  @observable lists
  @observable todos = {}

  constructor() {
    super(UserService)
    makeObservable(this)
    this.getLists = this.getLists.bind(this)
    this.getTodos = this.getTodos.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
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

  @action
  getTodos(listId) {
    this.loading = true
    ToDoService.get(this.pathParams, `list/${encodeURI(listId)}/todo`)
      .then(response => {
        runInAction(() => {
          this.loading = false
          if (response && response.data) {
            this.todos[listId] = response.data
          }
        })
      })
      .catch(error => {
        runInAction(() => {
          this.loading = false
        })
      })
  }

  @action
  deleteTodo(todoId) {
    this.loading = true
    ToDoService.delete(this.pathParams, `todo/${todoId}`)
      .then(response => {
        runInAction(() => {
          this.loading = false
        })
      })
      .catch(error => {
        runInAction(() => {
          this.loading = false
        })
      })
  }

  @computed
  get todoWithKey() {
    debugger
    return Object.keys(this.todos).forEach((key) => {
      if (!this.todos[key].hasOwnProperty('key')) {
        this.todos[key].key = `todo-${key}`;
      }
      return this.todos[key];
    });
  }

}

export default HomeStore