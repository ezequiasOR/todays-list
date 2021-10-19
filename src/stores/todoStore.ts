import { action, makeObservable, observable } from "mobx";
import ToDo from "../domains/toDo";
// import User from "../domains/user";
// import ToDoService from '../services/todo'

// interface ToDo {
//   id: number,
//   description: string,
//   completed: boolean,
//   date: string, // TODO: trocar para data
// }

class ToDoStore {
  object: ToDo = new ToDo(null)
  loading: Boolean = false
  todos: ToDo[] = [
    { id: 1, description: 'Item 1' }, //, completed: true, date: 'asdfadf' },
    { id: 2, description: 'Item 2' }, //, completed: false, date: 'asdfadf' },
    { id: 3, description: 'Item 3' }, //, completed: false, date: 'asdfadf' },
    { id: 4, description: 'Item 4' }, //, completed: false, date: 'asdfadf' },
    { id: 5, description: 'Item 5' }, //, completed: true, date: 'asdfadf' },
    { id: 6, description: 'Item 6' }, //, completed: false, date: 'asdfadf' },
    { id: 7, description: 'Item 7' }, //, completed: false, date: 'asdfadf' },
  ]

  protected entity;
  protected service;
  protected entityName;
  constructor(entity, service, entityName) {
    this.entity = entity
    this.service = service
    this.entityName = entityName
    makeObservable(this, {
      object: observable,
      loading: observable,
      todos: observable,
      getAllTodos: action,
      addToDo: action,
      // togglerToDo: action,
      removeToDo: action,
      updateToDo: action,
      init: action
    })
  }
  init() {
    this.object = new ToDo(null)
  }

  getAllTodos = (listId: number, token: string) => {
    // this.loading = true
    // ToDoService.getAllTodos(listId, token)
    //   .then((response) => {
    //     runInAction(() => {
    //       const content = response && response.data ? response.data : []
    //       if (content.length > 0) {
    //         this.todos = content
    //       }
    //     })
    //   })
  }

  addToDo = (toDo: ToDo) => {
    this.todos.push(toDo)
  }

  // togglerToDo = (id: number) => {
  //   this.todos = this.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
  // }

  removeToDo = (id: number) => {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  updateToDo = (toDo: ToDo) => {
    this.todos = this.todos.map(t => t.id === toDo.id ? { ...toDo } : t)
  }
}

export default ToDoStore