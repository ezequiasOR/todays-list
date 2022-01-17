import { action, makeObservable, observable, runInAction } from 'mobx'
import DomainBase from '../domains/DomainBase'
import ServiceBase from '../services/serviceBase'

abstract class BaseStore<D extends DomainBase = DomainBase> {
  @observable
  loading = false

  @observable
  object = this.initializeData()

  @observable
  pathParams: string[] = []

  protected service
  constructor(service: ServiceBase) {
    this.service = service
    makeObservable(this)
  }

  abstract initializeData(): D

  @action
  reset() {
    this.object = this.initializeData()
  }

  @action
  updateAttributeDecoratorKeyValue(key, value) {
    this.object[key] = value
  }

  @action
  updateAttributeDecoratorKeyEventValue(key, event) {
    this.object[key] = event.target.value
  }

  /**
   * Login
   * @param {*} sucessCallback função a ser executada em caso de sucesso
   * @param {*} errorCallback  função a ser executada em caso de erro
   * @param {string} endpoint - Se passado, usa esse endpoint, ao invés do endpoint padrão do Service.
   */
  @action
  async login(
    sucessCallback?: (token, user) => void,
    errorCallback?: (msg?: string) => void,
    endpoint?: string | null
  ) {
    this.loading = true
    try {
      //  this.validateObject();
      //  if (Object.keys(this.object.errors).length === 0) {
      const response = await this.service.login(this.object, this.pathParams, endpoint)
      if (
        sucessCallback &&
        response &&
        response.data &&
        response.data.token &&
        response.data.token.accessToken &&
        response.data.user
      ) {
        sucessCallback(response.data.token.accessToken, response.data.user)
      }
      // } else {
      //    Utils.showMessageError('Campos obrigatórios não preenchidos!', 'Erro de Validação');
      // }
    } catch (error) {
      console.error(error)
      if (errorCallback) {
        //  errorCallback(Utils.getErrorMessage(error, 'Ocorreu um erro ao Salvar.'));
      }
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
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
    this.loading = true
    try {
      //  this.validateObject();
      //  if (Object.keys(this.object.errors).length === 0) {
      await this.service.save(this.object, crudAction, this.pathParams, endpoint)
      if (sucessCallback) {
        sucessCallback()
      }
      // } else {
      //    Utils.showMessageError('Campos obrigatórios não preenchidos!', 'Erro de Validação');
      // }
    } catch (error) {
      console.error(error)
      if (errorCallback) {
        //  errorCallback(Utils.getErrorMessage(error, 'Ocorreu um erro ao Salvar.'));
      }
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  /**
   *
   * @param {string} id Id do registro a ser buscado
   * @param {string} endpoint - Se passado, usa esse endpoint, ao invés do endpoint padrão do Service.
   * @param {function} onSuccess - Função callback a ser executada em caso de sucesso.
   * @param {function} onError - Função callback a ser executada em caso de error.
   * @returns {Promise<void>}
   */
  @action
  async getById(
    id: string | number,
    endpoint?: string | null,
    onSuccess?: () => void,
    onError = (error: Record<string, unknown>) => {}
    // Utils.showMessageError(`Ao recuperar o registro ocorreu o erro: ${Utils.trataMensagemDeErro(error)}`)
  ) {
    this.loading = true
    try {
      const response = await this.service.getById(id, this.pathParams, endpoint)
      runInAction(() => {
        this.object = Reflect.construct(this.object.constructor, [response.data])
        onSuccess && onSuccess()
      })
    } catch (error) {
      console.error(error)
      onError && onError(error as Record<string, unknown>)
    } finally {
      runInAction(() => (this.loading = false))
    }
  }

  /**
   * @param {string} endpoint - Se passado, usa esse endpoint, ao invés do endpoint padrão do Service.
   * @param {function} onSuccess - Função callback a ser executada em caso de sucesso.
   * @param {function} onError - Função callback a ser executada em caso de error.
   * @returns {Promise<void>}
   */
  @action
  async get(
    endpoint?: string | null,
    onSuccess?: () => void,
    onError = (error: Record<string, unknown>) => {}
    // Utils.showMessageError(`Ao recuperar o registro ocorreu o erro: ${Utils.trataMensagemDeErro(error)}`)
  ) {
    this.loading = true
    try {
      const response = await this.service.get(this.pathParams, endpoint)
      runInAction(() => {
        this.object = Reflect.construct(this.object.constructor, [response.data])
        onSuccess && onSuccess()
      })
    } catch (error) {
      console.error(error)
      onError && onError(error as Record<string, unknown>)
    } finally {
      runInAction(() => (this.loading = false))
    }
  }
}

export default BaseStore
