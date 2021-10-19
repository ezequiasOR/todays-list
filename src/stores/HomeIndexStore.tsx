import { observable } from 'mobx';
import User from '../domains/user'

class HomeIndexStore {
  @observable object = null
  
  protected entity;
  protected service;
  protected entityName;

  constructor(entity: User, service, entityName: string) {
    this.entity = entity
    this.service = service
    this.entityName = entityName
  }
}

export default HomeIndexStore