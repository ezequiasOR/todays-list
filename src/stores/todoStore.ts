import { action, makeObservable, observable, runInAction } from "mobx";
import ToDoService from '../services/todo'

interface ToDo {
  id: number,
  description: string,
  completed: boolean,
  date: string, // TODO: trocar para data
}

class ToDoStore {
  loading: Boolean = false
  todos: ToDo[] = [
    { id: 1, description: 'Item 1', completed: true, date: 'asdfadf' },
    { id: 2, description: 'Item 2', completed: false, date: 'asdfadf' },
    { id: 3, description: 'Item 3', completed: false, date: 'asdfadf' },
    { id: 4, description: 'Item 4', completed: false, date: 'asdfadf' },
    { id: 5, description: 'Item 5', completed: true, date: 'asdfadf' },
    { id: 6, description: 'Item 6', completed: false, date: 'asdfadf' },
    { id: 7, description: 'Item 7', completed: false, date: 'asdfadf' },
  ]

  constructor() {
    makeObservable(this, {
      loading: observable,
      todos: observable,
      getAllTodos: action,
      addToDo: action,
      togglerToDo: action,
      removeToDo: action,
      updateToDo: action,
    })
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

  togglerToDo = (id: number) => {
    this.todos = this.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
  }

  removeToDo = (id: number) => {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  updateToDo = (toDo: ToDo) => {
    this.todos = this.todos.map(t => t.id === toDo.id ? { ...toDo } : t)
  }
}

const instance = new ToDoStore()

export default instance