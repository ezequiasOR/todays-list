import { observable } from 'mobx'

interface List {
  id: number,
  name: string
}

class User {
  @observable id!: number
  @observable name!: string
  @observable username!: string
  @observable email!: string
  @observable password!: string
  @observable roles!: string
  @observable lists!: List

  // constructor(response) {
  //   if (response) {
  //     for (let key in this) {
  //       this[key] = response[key]
  //     }
  //   }
  // }
}

export default User
