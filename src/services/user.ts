import axios from 'axios'

import DadosEstaticosService from '../constants/dadosEstaticosService'

const api = DadosEstaticosService.getURLServidorDev()

interface User {
  id?: string | number,
  name: string,
  email: string,
  username: string,
  password: string,
}

class UserService {
  save = (user: User) => {
    return axios.post(`${api}/signup`, user)
  }

  update = (user: User, token: string) => {
    return axios.put(`${api}/user/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  delete = (userId: number) => {
    return axios.delete(`${api}/user/${userId}`)
  }
}

const instance = new UserService()

export default instance
