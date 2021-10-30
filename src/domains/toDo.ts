import { makeObservable, observable } from 'mobx';
import DomainBase from './DomainBase';

class ToDoDomain extends DomainBase {
  @observable id
  @observable description
  @observable listId
  @observable dtToDo
  @observable completed = false
  
  constructor(data?: Record<string, number>) {
    super()
    makeObservable(this)
    if (data) {
      this.setData(data)
    }
  }
}

export default ToDoDomain;