const DadosEstaticosService = {
  getURLServidorDev(): string {
    return 'http://localhost:8080'
  },

  getURLServidorProd(): string {
    return 'https://todo-ezequiasr.herokuapp.com'
  },
}

export default DadosEstaticosService
