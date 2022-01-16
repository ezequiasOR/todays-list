import { action, makeObservable, observable, runInAction } from 'mobx'
import BaseStore from './BaseStore'
import UserService from '../services/user'
import UserDomain from '../domains/user'
import ToDoService from '../services/todo'
import ListService from '../services/list'
import CrudActionType from '../utils/CrudActionType'

class HomeStore extends BaseStore {
  @observable lists = []
  @observable todos = {}

  constructor() {
    super(UserService)
    makeObservable(this)
    this.getLists = this.getLists.bind(this)
    this.getTodos = this.getTodos.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.toggleCheckedToDo = this.toggleCheckedToDo.bind(this)
  }

  initializeData() {
    return new UserDomain()
  }

  init(userId) {
    this.getById(
      userId,
      'user',
      () => {},
      () => {}
    )
  }

  @action
  getLists(userId) {
    this.loading = true
    UserService.get(this.pathParams, `user/${encodeURI(userId)}/list`)
      .then((response) => {
        runInAction(() => {
          this.loading = false
          if (response && response.data) {
            this.lists = response.data
          }
        })
      })
      .catch((error) => {
        runInAction(() => {
          this.loading = false
        })
      })
  }

  @action
  getTodos(listId) {
    this.loading = true
    ToDoService.get(this.pathParams, `list/${encodeURI(listId)}/todo`)
      .then((response) => {
        runInAction(() => {
          this.loading = false
          if (response && response.data) {
            this.todos[listId] = response.data
          }
        })
      })
      .catch((error) => {
        runInAction(() => {
          this.loading = false
        })
      })
  }

  @action
  deleteTodo(todoId) {
    this.loading = true
    ToDoService.delete(this.pathParams, `todo/${todoId}`)
      .then((response) => {
        runInAction(() => {
          this.loading = false
          if (response && response.data) {
            this.getTodos(response.data.listId)
          }
        })
      })
      .catch((error) => {
        runInAction(() => {
          this.loading = false
        })
      })
  }

  @action
  toggleCheckedToDo(toDo) {
    this.loading = true
    try {
      ToDoService.save(toDo, CrudActionType.UPDATE, this.pathParams, `todo`)
    } catch (error) {
      console.error(error)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  @action
  deleteList(listId) {
    this.loading = true
    ListService.delete(this.pathParams, `list/${listId}`)
      .then((response) => {
        runInAction(() => {
          this.loading = false
          if (response && response.data) {
            this.getLists(response.data.userId)
          }
        })
      })
      .catch((error) => {
        runInAction(() => {
          this.loading = false
        })
      })
  }
}

export default HomeStore
