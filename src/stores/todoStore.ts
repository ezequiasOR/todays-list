import { action, makeObservable } from "mobx";
import ToDoDomain from "../domains/toDo";
import BaseStore from "./BaseStore";
import ToDoService from '../services/todo'

class ToDoStore extends BaseStore {
  constructor() {
    super(ToDoService)
    makeObservable(this)
    this.init = this.init.bind(this)
  }

  initializeData() {
    return new ToDoDomain();
  }

  @action
  init(toDo) {
    this.object = new ToDoDomain(toDo)
  }
}

export default ToDoStore