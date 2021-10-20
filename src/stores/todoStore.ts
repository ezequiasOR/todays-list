import { makeObservable } from "mobx";
import ToDoDomain from "../domains/toDo";
import BaseStore from "./BaseStore";
import ToDoService from '../services/todo'

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