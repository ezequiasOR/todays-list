import { makeObservable, observable } from 'mobx'
import DomainBase from './DomainBase'

class User extends DomainBase {
  @observable id
  @observable name
  @observable username
  @observable email
  @observable password
  @observable roles
  @observable lists: [{}] = [{}]

  constructor(data?: Record<string, number>) {
    super()
    makeObservable(this)
    if (data) {
      this.setData(data)
    }
  }
}

export default User
