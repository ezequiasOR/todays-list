import { makeObservable, observable } from 'mobx';
import DomainBase from './DomainBase';

class ListDomain extends DomainBase {
  @observable id
  @observable name
  @observable userId
  @observable toDos
  
  constructor() {
    super()
    makeObservable(this)
  }
}

export default ListDomain;