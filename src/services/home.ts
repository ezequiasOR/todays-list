import axios from 'axios'

import DadosEstaticosService from '../constants/dadosEstaticosService'

const api = DadosEstaticosService.getURLServidorDev()

class HomeService {
  delete = (userId: number) => {
    return axios.delete(`${api}/user/${userId}`)
  }
  
}

const instance = new HomeService()

export default instance
