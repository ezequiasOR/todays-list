import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routes from './pages/routes'
import Header from './components/Header/header'
import './App.css';
import { observer } from 'mobx-react';
import { getToken, getUser } from './utils/Utils';

@observer
class App extends React.Component {
  state = {
    user: undefined,
    token: undefined,
  }

  componentDidMount() {
    const user = getUser();
    const token = getToken();
    this.setState({ user, token });
  }
  
  setUser = (user) => {
    this.setState({ user })
  }
  
  render() {
    const value = {
      user: this.state.user,
      token: this.state.token,
      setUser: this.setUser,
    }
    return (
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    );

  }

}

export default App;
