import { makeObservable, observable } from 'mobx'
import DomainBase from './DomainBase'

class ListDomain extends DomainBase {
  @observable id
  @observable name
  @observable userId

  constructor(data?: Record<string, number>) {
    super()
    makeObservable(this)
    if (data) {
      this.setData(data)
    }
  }
}

export default ListDomain
