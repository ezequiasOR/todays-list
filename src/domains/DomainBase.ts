import { makeObservable, observable } from "mobx";

abstract class DomainBase {
  @observable
  errors: Record<string, string> = {};
  constructor() {
    makeObservable(this)
  }

  /**
   * Seta as propriedades do Domain que posuam o mesmo nome de propriedade que vem do back-end, caso não precise de
   * nenhum tratamento especial como Dominio, Empresa...
   * Após utilizar o método é possível sobreescrever a propriedade que necessite ser setada de forma específica.
   * @param data
   */
  setData(data: Record<string, unknown> = {}) {
    // debugger
    if (Object.keys(data).length !== 0) {
      Reflect.ownKeys(data).forEach(property => {
        if (Reflect.has(this, property)) {
          (this as Record<string, unknown>)[property as string] = data[property as string];
        }
      });
    }
  }


}

export default DomainBase