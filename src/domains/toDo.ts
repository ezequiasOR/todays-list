import { makeObservable, observable } from 'mobx';
import DomainBase from './DomainBase';

class ToDoDomain extends DomainBase {
  @observable id
  @observable description
  @observable listId
  @observable dtToDo
  @observable completed = false
  
  constructor() {
    super()
    makeObservable(this)
  }
}

export default ToDoDomain;