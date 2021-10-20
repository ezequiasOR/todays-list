import { action, makeObservable, observable, runInAction } from "mobx";
import DomainBase from "../domains/DomainBase";
import ServiceBase from '../services/serviceBase'
// import User from "../domains/user";
// import ToDoService from '../services/todo'

// interface ToDo {
//   id: number,
//   description: string,
//   completed: boolean,
//   date: string, // TODO: trocar para data
// }

abstract class BaseStore<D extends DomainBase = DomainBase> {
  @observable
  loading = false;

  @observable
  object = this.initializeData()

  @observable
  pathParams: string[] = [];

  protected service;
  constructor(service: ServiceBase) {
    this.service = service
    makeObservable(this)
  }

  abstract initializeData(): D;

  @action
  reset() {
    this.object = this.initializeData();
  }

  @action
  updateAttributeDecoratorKeyValue(key, value) {
    this.object[key] = value;
  }

  @action
  updateAttributeDecoratorKeyEventValue(key, event) {
    this.object[key] = event.target.value
  }

  /**
   * Salva um dominio
   * @param {*} crudAction Ação a ser realizada(Create, update or delete)
   * @param {*} sucessCallback função a ser executada em caso de sucesso
   * @param {*} errorCallback  função a ser executada em caso de erro
   * @param {string} endpoint - Se passado, usa esse endpoint, ao invés do endpoint padrão do Service.
   */
   @action
   async save(
     crudAction: string,
     sucessCallback?: () => void,
     errorCallback?: (msg?: string) => void,
     endpoint?: string | null
   ) {
     debugger
     this.loading = true;
     try {
      //  this.validateObject();
      //  if (Object.keys(this.object.errors).length === 0) {
        await this.service.save(this.object, crudAction, this.pathParams, endpoint);
        if (sucessCallback) {
          sucessCallback();
        }
        // } else {
        //    Utils.showMessageError('Campos obrigatórios não preenchidos!', 'Erro de Validação');
        // }
     } catch (error) {
       console.error(error);
       if (errorCallback) {
        //  errorCallback(Utils.getErrorMessage(error, 'Ocorreu um erro ao Salvar.'));
       }
     } finally {
       runInAction(() => {
         this.loading = false;
       });
     }
   }
}

export default BaseStore