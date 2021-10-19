import { makeObservable, observable } from 'mobx';

class ToDo {
  id;
  description;
  
  constructor(response) {
    makeObservable(this, {
      id: observable,
      description: observable,
     
    })
    if (response) {
      for (let key in this) {
        this[key] = response[key]
      }
    }
  }
}

export default ToDo;