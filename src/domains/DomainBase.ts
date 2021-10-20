import { makeObservable, observable } from "mobx";

abstract class DomainBase {
  @observable
  errors: Record<string, string> = {};
  constructor() {
    makeObservable(this)
  }


}

export default DomainBase