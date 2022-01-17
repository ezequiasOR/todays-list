import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './pages/routes'
import Header from './components/Header/header'
import './App.css'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    )
  }
}

export default App
