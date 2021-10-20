import { makeObservable } from "mobx";
import ToDoDomain from "../domains/toDo";
import BaseStore from "./BaseStore";
import ToDoService from '../services/todo'
// import User from "../domains/user";
// import ToDoService from '../services/todo'

// interface ToDo {
//   id: number,
//   description: string,
//   completed: boolean,
//   date: string, // TODO: trocar para data
// }

class ToDoStore extends BaseStore {
  todos = []

  constructor() {
    super(ToDoService)
    makeObservable(this)
  }

  initializeData() {
    return new ToDoDomain();
  }
}

export default ToDoStore