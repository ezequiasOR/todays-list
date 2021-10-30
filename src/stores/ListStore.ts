import { action, makeObservable } from "mobx";
import ListDomain from "../domains/list";
import BaseStore from "./BaseStore";
import ListService from '../services/list'

class ListStore extends BaseStore {
  constructor() {
    super(ListService)
    makeObservable(this)
    this.init = this.init.bind(this)
  }

  initializeData() {
    return new ListDomain();
  }

  @action
  init(list) {
    this.object = new ListDomain(list)

  }
}

export default ListStore