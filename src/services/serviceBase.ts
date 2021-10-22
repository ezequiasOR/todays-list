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
   * @param {string|number} id - ID do objeto a ser buscado.
   * @param {array}         pathParams - Parâmetros de URL para serem colocados no endpoint a ser chamado.
   * @param {string}        endpoint - Se passado, usa esse endpoint, ao invés do endpoint padrão do Service.
   */
  getById(id: string | number, pathParams: string[] = [], endpoint: string | null = null) {
    const endpointBase = this.getEndpointWithPathParams(pathParams, endpoint);
    return axios.get(encodeURI(`${this.host}/${endpointBase}/${id}`), {
      headers: {
        "Authorization": `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlemVxdWlhc29yIiwiaWF0IjoxNjM0OTM5OTE1LCJleHAiOjE2MzU1NDQ3MTV9.nbCQAEeoEZxKnY-gPFDyWXKhjknNQZQi--NkHUT_80ExtqRK0bB4PB9IpFcrgn_FtsDAJOdP9sBc0MHxme3RIw`,
      },
    });
  }

  /**
   * @param {array}         pathParams - Parâmetros de URL para serem colocados no endpoint a ser chamado.
   * @param {string}        endpoint - Se passado, usa esse endpoint, ao invés do endpoint padrão do Service.
   */
   get(pathParams: string[] = [], endpoint: string | null = null) {
    const endpointBase = this.getEndpointWithPathParams(pathParams, endpoint);
    return axios.get(encodeURI(`${this.host}/${endpointBase}`), {
      headers: {
        "Authorization": `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlemVxdWlhc29yIiwiaWF0IjoxNjM0OTM5OTE1LCJleHAiOjE2MzU1NDQ3MTV9.nbCQAEeoEZxKnY-gPFDyWXKhjknNQZQi--NkHUT_80ExtqRK0bB4PB9IpFcrgn_FtsDAJOdP9sBc0MHxme3RIw`,
      },
    });
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
    switch (actionType) {
      case CrudActionType.CREATE:
        return this._create(object, pathParams, endpoint);
      case CrudActionType.UPDATE:
        return this._update(object, pathParams, endpoint);
    }
  }

  private _create = (object: Record<string, unknown>, pathParams: string[] = [], endpoint: string | null = null) => {
    const endpointBase = this.getEndpointWithPathParams(pathParams, endpoint);
    return axios.post(`${this.host}/${endpointBase}`, object, {
      headers: {
        "Authorization": `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlemVxdWlhc29yIiwiaWF0IjoxNjM0OTI3ODg4LCJleHAiOjE2MzU1MzI2ODh9.LLvUQtPgnIh4ySyt2vBT3rkpFITLVWBbloWYHBYkZWiagzGtyOf3RPgxgAC19dYAFVaBrPzXXPRbMoUsnEJvSw`,
      },
    });
  };

  private _update = (object: { id?: string | number }, pathParams: string[] = [], endpoint: string | null = null) => {
    const endpointBase = this.getEndpointWithPathParams(pathParams, endpoint);
    return axios.put(encodeURI(`${this.host}/${endpointBase}/${object.id}`), object);
  };

  getEndpointWithPathParams(params: string[], overrideEndpoint: string | null = null) {
    const endpointToUse = overrideEndpoint ? overrideEndpoint : this.endPoint;

    if (endpointToUse && endpointToUse.includes('#PARAM')) {
      return this._getUrlSlices(endpointToUse, params).join('');
    }

    return endpointToUse;
  }

  private _getUrlSlices(url: string, params: string[]) {
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
