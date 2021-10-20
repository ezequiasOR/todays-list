import { makeObservable } from "mobx";
import ListDomain from "../domains/list";
import BaseStore from "./BaseStore";
import ListService from '../services/list'

class ListStore extends BaseStore {
  constructor() {
    super(ListService)
    makeObservable(this)
  }

  initializeData() {
    return new ListDomain();
  }
}

export default ListStore