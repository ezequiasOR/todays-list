import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routes from './pages/routes'
import Header from './components/Header/header'
import './App.css';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );

}

export default App;
