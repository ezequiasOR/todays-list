import axios from 'axios'

import DadosEstaticosService from '../constants/dadosEstaticosService'
import CrudActionType from '../utils/CrudActionType'

class ServiceBase {
  endPoint: string;
  host: string

  constructor(endPoint: string, host: string = DadosEstaticosService.getURLServidorDev()) {
    this.endPoint = endPoint
    this.host = host
  }
  
  /**
   * Efetua a chamada de importação de dados a partir de uma planilha Excel.
   * @param {object} object - Objeto a ser passado para a API de persistência de dados.
   * @param {string} actionType - Tipo de ação com o objeto passado (valores possíveis: CrudActionType.CREATE, CrudActionType.UPDATE).
   * @param {array}  pathParams - Parâmetros de URL para serem colocados no endpoint a ser chamado.
   * @param {string} endpoint - Se passado, usa esse endpoint, ao invés do endpoint padrão do Service.
   */
  save(
    object: { id?: string | number },
    actionType: string,
    pathParams: string[] = [],
    endpoint: string | null = null
  ) {
    debugger
    switch (actionType) {
      case CrudActionType.CREATE:
        return this._create(object, pathParams, endpoint);
      case CrudActionType.UPDATE:
        return this._update(object, pathParams, endpoint);
    }
  }

  private _create = (object: Record<string, unknown>, pathParams: string[] = [], endpoint: string | null = null) => {
    debugger
    const endpointBase = this.getEndpointWithPathParams(pathParams, endpoint);
    return axios.post(`${this.host}/${endpointBase}`, object);
  };

  private _update = (object: { id?: string | number }, pathParams: string[] = [], endpoint: string | null = null) => {
    debugger
    const endpointBase = this.getEndpointWithPathParams(pathParams, endpoint);
    return axios.put(encodeURI(`${this.host}/${endpointBase}/${object.id}`), object);
  };

  getEndpointWithPathParams(params: string[], overrideEndpoint: string | null = null) {
    debugger
    const endpointToUse = overrideEndpoint ? overrideEndpoint : this.endPoint;

    if (endpointToUse && endpointToUse.includes('#PARAM')) {
      return this._getUrlSlices(endpointToUse, params).join('');
    }

    return endpointToUse;
  }

  private _getUrlSlices(url: string, params: string[]) {
    debugger
    const urlSplitted = url.split('#PARAM');

    return urlSplitted.map((val, index) => {
      let value = '';
      if (index < params.length && index < urlSplitted.length - 1) {
        value = params[index];
      }
      return `${val}${value}`;
    });
  }
  
}

export default ServiceBase
