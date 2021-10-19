import axios from 'axios'

import DadosEstaticosService from '../constants/dadosEstaticosService'

const api = DadosEstaticosService.getURLServidorDev()

interface ToDo {
  id: number,
  description: string,
  completed: boolean,
  date: string, // TODO: trocar para data
}

class ToDoService {
  getAllTodos = (listId: number, token: string) => {
    return axios.delete(`${api}/list/${listId}/todo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  
  save = (listId: number, todo: ToDo, token: string) => {
    return axios.post(`${api}/list/${listId}/todo`, todo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}

const instance = new ToDoService()

export default instance
